const createLivingdoc = require('./helpers/create_livingdoc')

module.exports = function enrichGalleryTeaserContent ({component, publication} = {}) {
  const galleryLivingdoc = createLivingdoc(publication)
  const tree = galleryLivingdoc.componentTree

  const sourceImages = tree.find('image')
  sourceImages.each((imageComponent) => {
    component.append('images', imageComponent)
  })
}
