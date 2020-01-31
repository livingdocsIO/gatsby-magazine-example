import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/layout'
import AdSecret from '../components/header/adSecret'

const Homepage = props => {
  const home = props.data.allPublications.edges.find(
    publication => publication.node.publication.metadata.title === 'Home'
  )
  const html = home && home.node.extra.html
  return (
    <Layout>
      <AdSecret />
      <div dangerouslySetInnerHTML={{__html: html}} />
    </Layout>
  )
}

// get all publications that equal(eq) the "regular" content-type
export const query = graphql`
  query {
    allPublications(filter: {publication: {systemdata: {contentType: {eq: "page"}}}}) {
      edges {
        node {
          extra {
            html
          }
          publication {
            metadata {
              title
            }
          }
        }
      }
    }
  }
`
export default Homepage
