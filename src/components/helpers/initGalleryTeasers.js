const Photoswipe = require('photoswipe')
const PhotoSwipeUiDefault = require('photoswipe/dist/photoswipe-ui-default.js')

export const initiateGalleryTeasers = () => {
  const galleryTeasers = document.querySelectorAll('.teaser-gallery')
  // ignore resrc for gallery images
  // we need fullsize images for gallery
  for (const galleryTeaserEl of galleryTeasers) {
    const images = galleryTeaserEl.querySelectorAll('.teaser-gallery__images > figure > img')
    for (const imageEl of images) {
      if (imageEl.classList) imageEl.classList.remove('resrc')
      else imageEl.className = imageEl.className.replace('resrc', '')
      const dataSrc = imageEl.getAttribute('data-src')
      if (dataSrc) imageEl.setAttribute('src', dataSrc)
    }
  }
  registerClickListeners(galleryTeasers)
}

const registerClickListeners = galleryTeasers => {
  for (const galleryTeaserEl of galleryTeasers) {
    const teaserHeroEl = galleryTeaserEl.querySelector('.teaser-hero')
    const teaserHeroImageEl = galleryTeaserEl.querySelector('.teaser-hero__header')
    const teaserCardEl = galleryTeaserEl.querySelector('.teaser-card')
    const teaserImageEl = galleryTeaserEl.querySelector('.teaser-card__image')

    const target = teaserHeroEl || teaserCardEl
    const imageEl = teaserHeroImageEl || teaserImageEl
    target &&
      target.addEventListener('click', function (e) {
        e = e || window.event
        e.preventDefault ? e.preventDefault() : (e.returnValue = false)
        openGallery(galleryTeaserEl, imageEl)
      })
  }
}
const openGallery = (galleryTeaserEl, teaserImageEl) => {
  const imageContainerEl = galleryTeaserEl.querySelector('.teaser-gallery__images')
  const pswpEl = galleryTeaserEl.querySelector('.pswp')

  const items = extractImageItems(imageContainerEl)
  if (!items.length) return

  const options = getGalleryOptions(galleryTeaserEl, teaserImageEl)
  const gallery = new Photoswipe(pswpEl, PhotoSwipeUiDefault, items, options)
  gallery.listen('close', function () {
    if (gallery.getCurrentIndex() !== 0) {
      gallery.goTo(0)
    }
  })
  gallery.init()
}

const extractImageItems = imageContainerEl => {
  const items = []
  if (!imageContainerEl) return items

  const children = imageContainerEl.childNodes
  for (const figureEl of children) {
    const imageEl = figureEl.children[0]
    const captionEl = figureEl.children.length > 1 && figureEl.children[1]
    const item = {
      src: imageEl.getAttribute('src'),
      w: imageEl.naturalWidth,
      h: imageEl.naturalHeight,
      title: captionEl ? captionEl.innerHTML : ''
    }
    items.push(item)
  }

  return items
}

const getGalleryOptions = (galleryTeaserEl, teaserImageEl) => {
  const options = {
    index: 0,
    history: false,
    focus: false,
    // galleryUID: galleryTeaserEl.getAttribute('data-uuid'),
    getThumbBoundsFn: function (index) {
      if (!teaserImageEl) return {}
      const pageYScroll = window.pageYOffset || document.documentElement.scrollTop
      const rect = teaserImageEl.getBoundingClientRect()
      return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
    }
  }
  return options
}
