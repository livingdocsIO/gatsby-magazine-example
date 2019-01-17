import React from 'react'
import ad from '../../resources/ad-secret.gif'

const adSecret = () => (
  <div className="ad ad--head">
    <a href="https://www.livingdocs.io" target="_blank" rel=" noopener noreferrer">
      <img alt="test" src={ad} style={{maxHeight: '250px'}} />
    </a>
  </div>
)

export default adSecret
