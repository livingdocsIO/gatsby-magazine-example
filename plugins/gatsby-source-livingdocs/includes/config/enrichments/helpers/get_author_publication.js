const _ = require('lodash')

module.exports = function getAuthorPublication ({publication, liClient} = {}) {
  const firstAuthor = _.get(publication, 'metadata.authors.references[0]')
  if (!firstAuthor) return {}
  return liClient.getPublication({documentId: firstAuthor.id})
}
