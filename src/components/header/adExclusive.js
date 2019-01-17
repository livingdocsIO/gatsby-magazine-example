import React from 'react'
import ad from '../../resources/ad-exclusive.gif'

const adExclusive = () => (
  <div className="ad ad--head">
    <a href="https://www.livingdocs.io" target="_blank" rel=" noopener noreferrer">
      <img alt="test" src={ad} style={{maxHeight: '90px'}} />
    </a>
  </div>
)

export default adExclusive
