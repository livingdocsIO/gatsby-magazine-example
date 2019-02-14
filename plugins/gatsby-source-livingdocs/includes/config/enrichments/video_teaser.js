const createLivingdoc = require('./helpers/create_livingdoc')

module.exports = function enrichVideoTeaserContent ({component, publication, design} = {}) {
  const videoLivingdoc = createLivingdoc(publication, design)
  const tree = videoLivingdoc.componentTree

  const freeHtmlComponents = tree.find('free-html')
  const iframeComponents = tree.find('iframe')
  component.append(
    'video',
    getFirstEscaped(freeHtmlComponents, 'free-html') || getFirstEscaped(iframeComponents, 'iframe')
  )
}

function getFirstEscaped (componentModels, directiveName) {
  if (!componentModels.length) return

  const componentModel = componentModels[0]
  const htmlDirective = componentModel.directives.get(directiveName)
  const htmlContent = htmlDirective.getContent()
  htmlDirective.setContent(escape(htmlContent))

  return componentModel
}
