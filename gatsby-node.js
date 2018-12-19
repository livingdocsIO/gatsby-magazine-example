const path = require('path')

// create the pages programatically from the data that is sourced from the plugin
exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions

  // This query will get all publications, that are in our graphQL server now
  // (Just the slug and contentType though)
  const query = await graphql(`
    {
      allPublications {
        edges {
          node {
            extra {
              slug
            }
            publication {
              systemdata {
                contentType
              }
            }
          }
        }
      }
    }
  `)

  // In the following snippet we sort data by:
  // regular (articles), which will result in article pages here
  // authors, which will result in the authorPages
  query.data.allPublications.edges.forEach(({node}) => {
    // article
    if (node.publication.systemdata.contentType === 'regular') {
      // create a page if the content is of type "regular" (article)
      createPage({
        // use the path that was created by the gatsby-plugin / livingdocs
        path: node.extra.slug,
        // uses the article component for the given content type
        component: path.resolve('./src/templates/article.js'),
        // the page-context is used to find this publication again within article.js
        context: {
          slug: node.extra.slug
        }
      })
    }

    // AuthorPages
    if (node.publication.systemdata.contentType === 'author') {
      createPage({
        path: node.extra.slug,
        component: path.resolve('./src/templates/authorPage.js'),
        context: {
          slug: node.extra.slug
        }
      })
    }
    // Pages
    if (node.publication.systemdata.contentType === 'page') {
      createPage({
        path: node.extra.slug,
        component: path.resolve('./src/templates/pages.js'),
        context: {
          slug: node.extra.slug
        }
      })
    }
  })
}
