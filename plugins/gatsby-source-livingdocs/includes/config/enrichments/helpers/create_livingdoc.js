const liSDK = require('@livingdocs/node-sdk')
const design = require('./design.json')

module.exports = function createLivingdoc (publication) {
  const {content} = publication
  return liSDK.document.create({content, design})
}
