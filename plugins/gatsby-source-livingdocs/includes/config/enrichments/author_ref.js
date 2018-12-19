const _get = require('lodash/get')
const slugify = require('../../../slugify')
const getAuthorPublication = require('./helpers/get_author_publication')

module.exports = async function enrichTeaserContentWithAuthor ({liClient, publication} = {}) {
  const authorPublication = await getAuthorPublication({liClient, publication})

  const {metadata, systemdata} = authorPublication
  return {
    author: `${_get(metadata, 'prename')} ${_get(metadata, 'surname')}`,
    authorLink: slugify(_get(metadata, 'title', ''), _get(systemdata, 'documentId', ''))
  }
}
