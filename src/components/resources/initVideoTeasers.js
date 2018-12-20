const Photoswipe = require('photoswipe')

const PhotoSwipeUiDefault = require('photoswipe/dist/photoswipe-ui-default.js')

export const initiateVideoTeasers = () => {
  const videoTeasers = document.querySelectorAll('.teaser-video')
  for (const videoTeaserEl of videoTeasers) {
    const teaserHeroEl = videoTeaserEl.querySelector('.teaser-hero')
    const teaserHeroTitleEl = videoTeaserEl.querySelector('.teaser-hero__title')
    const teaserHeroImageEl = videoTeaserEl.querySelector('.teaser-hero__header')

    const teaserCardEl = videoTeaserEl.querySelector('.teaser-card')
    const teaserTitleEl = videoTeaserEl.querySelector('.teaser-card__title')
    const teaserImageEl = videoTeaserEl.querySelector('.teaser-card__image')

    const target = teaserHeroEl || teaserCardEl
    const imageEl = teaserHeroImageEl || teaserImageEl
    const titleEl = teaserHeroTitleEl || teaserTitleEl
    target &&
      target.addEventListener('click', function (e) {
        e = e || window.event
        e.preventDefault ? e.preventDefault() : (e.returnValue = false)
        openGallery(videoTeaserEl, imageEl, titleEl)
      })
  }
}

const openGallery = (videoTeaserEl, teaserImageEl, teaserTitleEl) => {
  const pswpEl = videoTeaserEl.querySelector('.pswp')
  const options = getGalleryOptions(videoTeaserEl, teaserImageEl)
  const imageItem = getImageItem(teaserImageEl, teaserTitleEl)

  const gallery = new Photoswipe(pswpEl, PhotoSwipeUiDefault, [imageItem], options)
  gallery.listen('initialZoomInEnd', function () {
    gallery.items.splice(0, 1, {
      html: getVideoHtml(videoTeaserEl),
      title: imageItem.title
    })
    gallery.invalidateCurrItems()
    gallery.updateSize(true)
    adjustVideoStyles(gallery, imageItem)
  })
  gallery.listen('close', function () {
    gallery.items.splice(0, 1, imageItem)
    gallery.invalidateCurrItems()
    gallery.updateSize(true)
  })
  gallery.init()
}

const getGalleryOptions = teaserImageEl => {
  const options = {
    index: 0,
    history: false,
    focus: false,
    zoomEl: false,
    loop: false,
    closeOnScroll: false,
    showAnimationDuration: 333,
    getThumbBoundsFn: () => {
      if (!teaserImageEl) return {}
      const pageYScroll = window.pageYOffset || document.documentElement.scrollTop
      const rect = teaserImageEl.getBoundingClientRect()
      return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
    }
  }
  return options
}

const getImageItem = (teaserImageEl, teaserTitleEl) => {
  const isImgEl = teaserImageEl.tagName === 'IMG'
  const imageSrc = isImgEl
    ? teaserImageEl.getAttribute('src')
    : teaserImageEl.style.backgroundImage.replace(/(url\(|\)|")/g, '')
  const rect = !isImgEl && teaserImageEl.getBoundingClientRect()
  const imageWidth = isImgEl ? teaserImageEl.naturalWidth : rect.width
  const imageHeight = isImgEl ? teaserImageEl.naturalHeight : rect.height
  const item = {
    src: imageSrc,
    w: imageWidth,
    h: imageHeight,
    title: teaserTitleEl ? teaserTitleEl.innerHTML : ''
  }
  return item
}
const getVideoHtml = videoTeaserEl => {
  if (!videoTeaserEl) return ''
  const videoMarkupContainer = videoTeaserEl.querySelector('.teaser-video__markup > div')
  const videoHtml = (videoMarkupContainer && videoMarkupContainer.innerHTML) || ''
  return unescape(videoHtml)
}

const adjustVideoStyles = (gallery, initialItem) => {
  const currentItem = gallery.items[0]
  if (currentItem) {
    const containerEl = currentItem.container
    if (containerEl) {
      const videoEl = containerEl.children[0]
      if (videoEl) {
        if (videoEl.tagName === 'VIDEO') {
          centerVideo(containerEl)
          videoEl.style.objectFit = 'cover'
          videoEl.poster = initialItem.src
        } else if (videoEl.tagName === 'IFRAME') {
          centerVideo(containerEl)
        } else {
          videoEl.style.marginTop = '56px'
        }
      }
    }
  }
}

const centerVideo = containerEl => {
  const flex = 'display:flex;flex-direction:column;'
  const center = 'align-items:center;justify-content:center;'
  containerEl.style = `${flex}${center}`
}
