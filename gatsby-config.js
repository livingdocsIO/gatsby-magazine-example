module.exports = {
  // siteMetadata is used for sitemap.xml
  siteMetadata: {
    siteUrl: `https://magazine-example.livingdocs.io/sitemap.xml` // @TODO swap out for your host
  },
  plugins: [
    {
      resolve: 'gatsby-source-livingdocs',
      options: {
        // The accessToken is accessed at buildtime and set in netlify in this case
        accessToken: process.env.accessToken,
        design: {
          name: 'living-times',
          version: '1.0.0'
        },
        recursion: true
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://magazine-example.livingdocs.io/', // @TODO swap out for your host
        sitemap: 'https://magazine-example.livingdocs.io/sitemap.xml', // @TODO swap out for your host
        env: {
          development: {
            policy: [{userAgent: '*', disallow: ['/']}]
          }
        }
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'living-times', // @TODO swap out for your name / icon
        short_name: 'living-times',
        start_url: '/',
        background_color: '#6b37bf',
        theme_color: '#6b37bf',
        display: 'minimal-ui',
        icon: 'src/resources/favicon.png'
      }
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        includePaths: ['src/resources/stylesheets/living-times.scss'] // @TODO swap out for your stylesheets
      }
    }
  ]
}
