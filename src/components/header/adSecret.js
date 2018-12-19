import React from 'react'
import {Link} from 'gatsby'
import ad from '../resources/ad-secret.gif'

const adSecret = () => (
  <div className="ad ad--head">
    <Link to="https://www.livingdocs.io" target="_blank" rel=" noopener noreferrer">
      <img alt="test" src={ad} style={{maxHeight: '250px'}} />
    </Link>
  </div>
)

export default adSecret
