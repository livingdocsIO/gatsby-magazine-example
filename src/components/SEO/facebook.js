import React from 'react'
import Helmet from 'react-helmet'

const Facebook = props => (
  <Helmet>
    {/* Open Graph / Facebook */}
    <meta property="og:type" content="website" />
    <meta property="og:url" content={props.url} />
    <meta property="og:title" content={props.title} />
    <meta property="og:description" content={props.description} />
    <meta
      property="og:image"
      content="http://livingdocs-assets.s3.amazonaws.com/ld_logo_final@2x.png"
    />
  </Helmet>
)

export default Facebook
