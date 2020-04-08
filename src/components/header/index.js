import React from 'react'
import {Link, StaticQuery, graphql} from 'gatsby'
import logo from '../../resources/li-logo.svg'

// query the available Pages, and create he navigation bar in the header (exclude "Home")
const renderNavItems = () => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        allPublications(
          filter: {
            publication: { systemdata: { contentType: { eq: "page" } } }
          }
        ) {
          edges {
            node {
              extra {
                slug
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
    `}
    render={(data) => {
      if (!data.allPublications) {
        // eslint-disable-next-line no-console
        console.warn(
          'No pages created in Livingdocs found.' +
            'If you create some pages, we have some basic logic creating a menu for you!'
        )
        return (
          <div className="main-nav__item">
            <Link to="/" activeStyle={{fontWeight: 'bold'}}>
              Create your own menu, back to home !
            </Link>
          </div>
        )
      }
      return data.allPublications.edges.map(
        (page) =>
          page.node.publication.metadata.title !== 'Home' && (
            <div className="main-nav__item" key={page.node.extra.slug}>
              <Link
                to={page.node.extra.slug}
                activeStyle={{fontWeight: 'bold'}}
              >
                {page.node.publication.metadata.title}
              </Link>
            </div>
          )
      )
    }}
  />
)

const Header = (props) => (
  <header className="page-head" role="banner" style={{marginBottom: '0px'}}>
    <div>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <nav className="meta-nav">
        <div className="meta-nav__item">
          <a
            href="https://github.com/livingdocsIO/gatsby-magazine-example"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source Code
          </a>
        </div>
        <div className="meta-nav__item meta-nav__item--highlight">
          <a
            href="https://www.livingdocs.io/pssst"
            target="blank_"
            rel="noopener noreferrer"
          >
            Subscribe
          </a>
        </div>
      </nav>
      <div className="nav-container">
        <nav className="main-nav" role="navigation">
          {renderNavItems()}
        </nav>
      </div>
    </div>
  </header>
)

export default Header
