import React from 'react'

export default ({ image, alt }) => {
  return (
    <div className="hero">
      <img src={image} alt={alt} />
    </div>
  )
}
