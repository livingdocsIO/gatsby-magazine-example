const liSDK = require('@livingdocs/node-sdk')

module.exports = function createLivingdoc (publication, design) {
  const {content} = publication
  return liSDK.document.create({content, design})
}
