import React from 'react'
import {Link} from 'gatsby'
import ad from '../resources/ad-exclusive.gif'

const adExclusive = () => (
  <div className="ad ad--head">
    <Link to="https://www.livingdocs.io" target="_blank" rel=" noopener noreferrer">
      <img alt="test" src={ad} style={{maxHeight: '90px'}} />
    </Link>
  </div>
)

export default adExclusive
