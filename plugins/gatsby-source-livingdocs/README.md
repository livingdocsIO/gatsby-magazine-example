### Install

`npm install --save gatsby-source-wordpress`

### How to use

Add to your this plugin to your gatsby-config.js file and insert your accessToken
`plugins: [ { resolve: 'gatsby-source-livingdocs', options: { accessToken: 'my_token', }, }, ]`

### How to query

Using GraphQL, you can query the nodes created from Livingdocs with the following schema at http://localhost:8000/___graphiql (unless you've set up custom configurations from within Livingdocs)

````{
  allPublications {
    edges {
      node {
        id
        extra {
          slug
          html
        }
        publication {
          systemdata {
            projectId
            channelId
            documentId
            contentType
            documentType
            layout
            design {
              name
              version
            }
          }
          metadata {
            title
            description
            flag
            teaserImage {
              originalUrl
            }
            publishDate
          }
          content {
            id
          }
        }
      }
    }
  }
}```
````
