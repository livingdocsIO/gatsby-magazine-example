/* eslint-disable max-len */
/* eslint-disable no-console */
const liSDK = require('@livingdocs/node-sdk')
const crypto = require('crypto')
const slugify = require('./slugify')
const _ = require('lodash')
const {documentTypes, defaultDocumentType} = require('./includes/config/documentTypes')
const includesConfig = require('./includes/config')
const renderLayout = require('./includes/render')
const resolveIncludes = require('./includes')

exports.sourceNodes = async ({actions}, configOptions) => {
  if (!configOptions.design) return console.warn('config.options.design missing')
  if (!configOptions.design.name) { return console.warn("config.options.design.name missing example: 'living-times'") }
  if (!configOptions.design.version) { return console.warn("config.options.design.version missing example: '0.0.1'") }

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

  // As the livingdocs metadata can change, we set some defaults for the graphQL schema.
  const defaultMetadata = {
    metadata: {
      authors: {
        references: [{id: ''}]
      },
      authorImage: {
        originalUrl: '',
        url: ''
      },
      flag: '',
      teaserImage: {
        originalUrl: ''
      },
      title: '',
      profile: '',
      biography: '',
      description: '',
      publishDate: '',
      dependencies: {
        js: [{
          code: ''
        }]
      }
    }
  }

  // get all publications (articles, authors, etc.)
  // @param offset {Number} incrementally increasing to gather documents beyond the limit
  const getAllPublicationsRecursively = async (offset = 0) => {
    const publications = await liClient.getPublications({offset, limit})
    allPublications.push(...publications)
    publications.length === limit && await getAllPublicationsRecursively(offset + limit)
  }

  // get all publications (articles, authors, etc.)
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
      // publication: the graphQL content, schema automatically created by gatsby
      // TODO, we may want to look into generating it first, this approach is error prone
      // incase there is no twitter script or certain metadata and the delivery requires it
      publication,
      extra: {
        slug: slugify(publication.metadata.title, publication.systemdata.documentId),
        html
      }
    }
    return nodeData
  }

  async function createNodes () {
    recursion ? await getAllPublicationsRecursively() : await getAllPublications()
    if (!allPublications.length) {
      console.warn(`
      ALERT! Livingdocs-gatsby-plugin has not found any publications.
      Are you sure you've added published documents to livingdocs?
      `)
    }
    const design = await liClient.getDesign({
      name: configOptions.design.name,
      version: configOptions.design.version
    })
    if (!design) console.warn('ALERT! livingdocs-gatsby-plugin: design could not be loaded')

    // eslint-disable-next-line prefer-const
    for (let [index, publication] of allPublications.entries()) {
      if (index === 0) publication = _.merge(defaultMetadata, publication) // applies graphql defaults.
      const nodeData = await processPublication(publication, design)
      createNode(nodeData)
    }
  }

  return await createNodes()
}
