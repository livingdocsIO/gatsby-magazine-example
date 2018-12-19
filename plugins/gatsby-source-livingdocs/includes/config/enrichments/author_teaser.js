const _get = require('lodash/get')
const slugify = require('../../../slugify')
const getAuthorPublication = require('./helpers/get_author_publication')

module.exports = async function enrichAuthorTeaserContent ({liClient, publication} = {}) {
  const authorPublication = await getAuthorPublication({liClient, publication})
  if (!authorPublication) return

  const {metadata, systemdata} = authorPublication
  return {
    title: `${_get(metadata, 'prename', '')} ${_get(metadata, 'surname', '')}`,
    image: _get(metadata, 'authorImage', ''),
    authorLink: slugify(_get(metadata, 'title', ''), _get(systemdata, 'documentId', ''))
  }
}
