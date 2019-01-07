import React from 'react'
import Helmet from 'react-helmet'

const Basic = props => (
  <Helmet title={props.title}>
    <meta name="description" content={props.description} />
    <meta name="keywords" content={props.title} />
  </Helmet>
)

export default Basic
