import React from 'react'
import {navigate} from 'gatsby'
import Helmet from 'react-helmet'
import Header from '../header'
import Footer from '../footer'
import favicon from '../../resources/favicon.png'
import '../../resources/source/stylesheets/living-times.scss'
import {metadata} from '../../../config.js'

import {initiateVideoTeasers} from '../helpers/initVideoTeasers'
import {initiateGalleryTeasers} from '../helpers/initGalleryTeasers'
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'

// Set a basic set of SEO data
// articles and author-pages will over overwrite some of them
class Layout extends React.Component {
  componentDidMount () {
    // initiate the Gallery/Video-Teasers
    initiateVideoTeasers()
    initiateGalleryTeasers()

    // @TODO This is a hacky approach.
    // Livingdocs will send a bunch of <a/> tags, we will addEventListeners for those.
    // We don't want to reload the page, because we lose a big chunk of performance.
    // that's why we swap out the <a/> behaviour with the gatsby "navigate", for internal links.
    for (const anchorTag of document.body.getElementsByTagName('a')) {
      this.internalLink(anchorTag) && anchorTag.addEventListener('click', this.handleClick)
    }
  }
  // remove event listerns for all <a> tags
  componentWillUnmount () {
    for (const anchorTag of document.body.getElementsByTagName('a')) {
      this.internalLink(anchorTag) && anchorTag.removeEventListener('click', this.handleClick)
    }
  }

  internalLink = link => link.host === window.location.host

  handleClick = event => {
    event.preventDefault()
    const path = new URL(event.currentTarget.href).pathname
    navigate(path)
  }
  render () {
    return (
      <React.Fragment>
        <Helmet defaultTitle={metadata.defaultTitle} titleTemplate={metadata.titleTemplate}>
          <meta name="author" content={metadata.author} />
          <meta name="description" content={metadata.description} />
          <meta name="keywords" content={metadata.keywords} />
          <meta name="viewport" content="width=device-width" />
          <html lang="en" />
          <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta httpEquiv="Content-Language" content="en" />
          <meta property={metadata.facebookId} content="id" />
          <meta property={metadata.twitterId} content="id" />

          <link title="timeline-styles" rel="shortcut icon" type="image/png" href={favicon} />
          {/* <link title="timeline-styles" type="text/css" href={css.toString()} /> */}
          <noscript>Please enable Javascript</noscript>
        </Helmet>
        <Header />
        <div>{this.props.children}</div>
        <Footer />
      </React.Fragment>
    )
  }
}
export default Layout
