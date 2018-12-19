import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/layout'
import AdSecret from '../components/header/adSecret'

const pages = props => (
  <Layout>
    <AdSecret />
    <div
      dangerouslySetInnerHTML={{
        __html: props.data.publications.extra.html
      }}
    />
  </Layout>
)

// the page components are very simple.
// they consume the html and add the layout
export const query = graphql`
  query($slug: String!) {
    publications(extra: {slug: {eq: $slug}}) {
      extra {
        html
      }
    }
  }
`
export default pages
