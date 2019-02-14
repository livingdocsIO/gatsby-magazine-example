import React from 'react'

const footer = () => (
  <footer className="page-foot" role="footer">
    <nav className="page-foot__wrapper">
      <ul className="footer-links footer-links--left-aligned">
        <li>© 2018 Livingdocs Times</li>
        <li>
          <a href="mailto:contact@livingdocs.io">Contact us</a>
        </li>
        <li>
          <a href="https://www.livingdocs.io/product-5919">Work With us</a>
        </li>
        <li>
          <a href="https://github.com/livingdocsIO/gatsby-magazine-example">Github</a>
        </li>
      </ul>
      <ul className="footer-links footer-links--right-aligned">
        <li>
          This is an open-source Demo Magazine built with Livingdocs. Check out the code and make it
          yours!
        </li>
      </ul>
    </nav>
  </footer>
)

export default footer
