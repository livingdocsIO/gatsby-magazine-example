const liSDK = require('@livingdocs/node-sdk')
const crypto = require('crypto')
const resolveIncludes = require('./includes')
const includesConfig = require('./includes/config')
const renderLayout = require('./includes/render')
const slugify = require('./slugify')
const {documentTypes, defaultDocumentType} = require('./includes/config/documentTypes')

exports.sourceNodes = ({actions}, configOptions) => {
  const {createNode} = actions

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins

  // create a new livingdocs-client instance
  const liClient = new liSDK.Client({
    url: 'https://server.livingdocs.io',
    accessToken: configOptions.accessToken
  })

  const limit = configOptions.limit ? configOptions.limit : 10
  const recursion = configOptions.recursion ? configOptions.limit : true
  const allPublications = []

  // get all publications (articles, authors, etc.)
  // @param offset {Number} incrementally increasing to gather documents beyond the limit
  const getAllPublicationsRecursively = async (offset = 0) => {
    const publications = await liClient.getPublications({offset, limit})
    allPublications.push(...publications)
    if (publications.length === limit) {
      await getAllPublicationsRecursively(offset + limit)
    } else {
      return
    }
  }

  const getAllPublications = async () => {
    const publications = await liClient.getPublications({limit})
    allPublications.push(...publications)
  }

  const getPublication = async (publication, design) => {
    const livingdoc = liSDK.document.create({
      content: publication.content,
      design
    })

    if (
      publication.systemdata.documentType === 'article' ||
      publication.systemdata.documentType === 'page'
    ) {
      await resolveIncludes(livingdoc, liClient, includesConfig)

      const documentType = publication.systemdata.documentType
      const currentDocumentType = documentTypes && documentTypes[documentType]
      const targetDocumentType = currentDocumentType || defaultDocumentType

      const layoutComponents = targetDocumentType.layoutComponents
      const html = await renderLayout(livingdoc, design, layoutComponents)
      return html
    } else {
      const article = liSDK.document.render(livingdoc)
      return article
    }
  }

  // Create your node object
  const processPublication = async (publication, design) => {
    const html = await getPublication(publication, design)
    const nodeData = {
      id: `${publication.systemdata.documentId}`,
      parent: `__SOURCE__`,
      internal: {
        type: `Publications`, // name of the graphQL query --> allPublications {}
        contentDigest: crypto.createHash(`md5`).digest(`hex`)
      },
      children: [],
      publication, // the graphQL content, schema automatically created by gatsby
      extra: {
        slug: slugify(publication.metadata.title, publication.systemdata.documentId),
        html
      }
    }
    return nodeData
  }
  async function createNodes () {
    if (recursion) {
      await getAllPublicationsRecursively()
    } else {
      await getAllPublications()
    }
    const design = await liClient.getDesign({
      name: 'living-times',
      version: '0.0.19'
    })
    for (const publication of allPublications) {
      const nodeData = await processPublication(publication, design)
      createNode(nodeData)
    }
  }

  return createNodes()
}
