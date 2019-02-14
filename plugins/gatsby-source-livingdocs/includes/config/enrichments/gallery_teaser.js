const createLivingdoc = require('./helpers/create_livingdoc')

module.exports = function enrichGalleryTeaserContent ({component, publication, design} = {}) {
  const galleryLivingdoc = createLivingdoc(publication, design)
  const tree = galleryLivingdoc.componentTree

  const sourceImages = tree.find('image')
  sourceImages.each((imageComponent) => {
    component.append('images', imageComponent)
  })
}
