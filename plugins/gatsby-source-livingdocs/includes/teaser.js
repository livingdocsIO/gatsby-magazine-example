const renderInclude = require('./render_include')

module.exports = async function resolveEmbedTeaserIncludes ({
  livingdoc,
  liClient,
  includes,
  includeConfig,
  design
}) {
  const dataFetchTasks = startDataFetchTasks(includes, liClient)
  for (const task of dataFetchTasks) {
    const {include, request} = task
    const {params} = include.getContent()

    const layout = params.layout
    validateConfig(layout, includeConfig.layouts)

    const publication = await request
    if (!publication) throw new Error(`Article embed with id "${params.mediaId}" not found`)

    const renderArgs = [liClient, livingdoc, layout, includeConfig, publication, design]

    const html = await renderInclude(...renderArgs)

    // exclude includes that werent found, and include the html of resolved includes
    !publication.error && include.resolve(html)
  }
}

function startDataFetchTasks (includes, liClient) {
  return includes
    .filter(include => {
      const {params} = include.getContent()
      return !!params.mediaId
    })
    .map(include => {
      const {params} = include.getContent()

      const request = liClient.getPublication({documentId: params.mediaId})
      return {include, request}
    })
}

function validateConfig (layout, layoutsConfig) {
  const layoutConfig = layoutsConfig[layout]
  if (!layoutConfig.template) {
    throw new Error(
      `Template component ("template") for layout "${layout}" not specified in layout configuration`
    )
  }
  if (!layoutConfig.contentSpec) {
    throw new Error(
      `Content spec ("contentSpec") for layout "${layout}" not specified in layout configuration`
    )
  }
}
