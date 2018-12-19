const contentExtractor = require('./content_extractor')

module.exports = {
  'teaser': {
    layouts: {
      'author-embed': {
        template: 'teaser-author-template',
        contentSpec: {
          title: contentExtractor.authorName,
          link: contentExtractor.link,
          authorLink: contentExtractor.link,
          text: contentExtractor.profile,
          image: contentExtractor.image({crop: '1:1', target: 'authorImage'})
        }
      },
      'sidebar-embed': {
        template: 'teaser-sidebar-template',
        contentSpec: {
          title: contentExtractor.title,
          link: contentExtractor.link,
          flag: contentExtractor.flag,
          date: contentExtractor.publishDate
        },
        contentEnrichments: [
          require('./enrichments/author_ref')
        ]
      },
      hero: {
        template: 'teaser-hero-template',
        contentSpec: {
          title: contentExtractor.title,
          link: contentExtractor.link,
          flag: contentExtractor.flag,
          text: contentExtractor.description,
          date: contentExtractor.publishDate,
          image: contentExtractor.image({crop: '16:9'})
        },
        contentEnrichments: [
          require('./enrichments/author_ref')
        ]
      },
      card: {
        template: 'teaser-card-template',
        contentSpec: {
          title: contentExtractor.title,
          link: contentExtractor.link,
          link2: contentExtractor.link,
          flag: contentExtractor.flag,
          text: contentExtractor.description,
          date: contentExtractor.publishDate,
          image: contentExtractor.image({crop: '16:9'})
        },
        contentEnrichments: [
          require('./enrichments/author_ref')
        ]
      },
      'card-no-image': {
        template: 'teaser-card-no-image-template',
        contentSpec: {
          title: contentExtractor.title,
          link: contentExtractor.link,
          flag: contentExtractor.flag,
          text: contentExtractor.description,
          date: contentExtractor.publishDate
        },
        contentEnrichments: [
          require('./enrichments/author_ref')
        ]
      },
      'card-numbered': {
        template: 'teaser-card-numbered-template',
        contentSpec: {
          title: contentExtractor.title,
          link: contentExtractor.link,
          flag: contentExtractor.flag,
          date: contentExtractor.publishDate
        },
        contentEnrichments: [
          require('./enrichments/author_ref')
        ]
      },
      'card-author': {
        template: 'teaser-card-author-template',
        contentSpec: {
          link: contentExtractor.link,
          text: contentExtractor.title,
          image: contentExtractor.image({crop: '16:9'})
        },
        contentEnrichments: [
          require('./enrichments/author_teaser')
        ]
      },
      gallery: {
        template: 'teaser-gallery-template',
        contentSpec: {
          title: contentExtractor.title,
          image: contentExtractor.image({crop: '16:9'})
        },
        contentEnrichments: [
          require('./enrichments/gallery_teaser')
        ]
      },
      'gallery-hero': {
        template: 'teaser-gallery-hero-template',
        contentSpec: {
          title: contentExtractor.title,
          text: contentExtractor.description,
          image: contentExtractor.image({crop: '16:9'})
        },
        contentEnrichments: [
          require('./enrichments/gallery_teaser')
        ]
      },
      video: {
        template: 'teaser-video-template',
        contentSpec: {
          title: contentExtractor.title,
          image: contentExtractor.image({crop: '16:9'})
        },
        contentEnrichments: [
          require('./enrichments/video_teaser')
        ]
      },
      'video-hero': {
        template: 'teaser-video-hero-template',
        contentSpec: {
          title: contentExtractor.title,
          text: contentExtractor.description,
          image: contentExtractor.image({crop: '16:9'})
        },
        contentEnrichments: [
          require('./enrichments/video_teaser')
        ]
      }
    }
  }
}
