module.exports = {
  // siteMetadata is used for sitemap.xml
  siteMetadata: {
    siteUrl: `https://www.living-times.com/`
  },
  plugins: [
    {
      resolve: 'gatsby-source-livingdocs',
      options: {
        limit: 50, // defaults to 10, if there is none
        // The accessToken is accessed at buildtime and set in netlify in this case
        accessToken:
          // eslint-disable-next-line max-len
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6InB1YmxpYy1hcGk6cmVhZCIsIm5hbWUiOiJMaXZpbmdkb2NzLW9uYm9hcmRpbmciLCJwcm9qZWN0SWQiOjExMSwiY2hhbm5lbElkIjoxMDgsInR5cGUiOiJjbGllbnQiLCJqdGkiOiJlMzAzYWM2OS1hOTQwLTQ4NjYtOTViYS01ZDdkNDk3NDgwMTkiLCJjb2RlIjoiZTMwM2FjNjktYTk0MC00ODY2LTk1YmEtNWQ3ZDQ5NzQ4MDE5IiwiaWF0IjoxNTQxMDg0OTQxfQ.jB0ipjwA0hgxD1bxxZSzHIKbyw1W-swOKe8hbrScBmo'
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.living-times.com/', // @TODO add Link
        sitemap: 'https://www.living-times.com/sitemap.xml', // @TODO add Link
        env: {
          development: {
            policy: [{userAgent: '*', disallow: ['/']}]
          },
          production: {
            policy: [{userAgent: '*', disallow: '/'}] // @TODO change to allow
          }
        }
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'living-times',
        short_name: 'living-times',
        start_url: '/',
        background_color: '#6b37bf',
        theme_color: '#6b37bf',
        display: 'minimal-ui',
        icon: 'src/components/resources/favicon.png'
      }
    }
  ]
}
