import React from 'react'
import Helmet from 'react-helmet'

const Twitter = props => (
  <Helmet>
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={props.url} />
    <meta property="twitter:title" content={props.title} />
    <meta property="twitter:description" content={props.description} />
    <meta
      property="twitter:image"
      content="http://livingdocs-assets.s3.amazonaws.com/ld_logo_final@2x.png"
    />
  </Helmet>
)

export default Twitter
