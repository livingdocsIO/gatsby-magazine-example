import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/layout'
import AdExclusive from '../components/header/adExclusive'
import {Twitter, Facebook, Basic} from '../components/SEO'
import {metadata} from '../../config'

// The pages created in gatsby-node.js will use this component("template" by gatsby convention)
// The data is recieved by the graphQL query from the bottom of this component
const article = props => {
  // SEO - description (Page, twitter, facebook)
  const description = props.data.publications.publication.metadata.description

  // SEO - title (Page, twitter, facebook)
  const title = props.data.publications.publication.metadata.title

  // HTML - rendering the html-body
  const html = props.data.publications.extra.html

  // SEO - url (Page, twitter, facebook)
  const url = metadata.url
  return (
    <Layout>
      {/* SEO start, information for the html <head></head> */}
      <Basic title={title} description={description} />
      <Twitter title={title} description={description} url={url} />
      <Facebook title={title} description={description} url={url} />
      {/* SEO end, information for the html <head></head> */}
      <AdExclusive />
      <div dangerouslySetInnerHTML={{__html: html}} />
    </Layout>
  )
}

// in gatsby-node.js we gave a context "slug"
// we can use that to filter the matching publication and slug now
export const query = graphql`
  query($slug: String!) {
    publications(extra: {slug: {eq: $slug}}) {
      publication {
        metadata {
          authors {
            references {
              id
            }
          }
          title
          description
        }
      }
      extra {
        html
        slug
      }
    }
  }
`
export default article
