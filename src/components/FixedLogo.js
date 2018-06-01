import React from 'react'
import { icons } from "./Icons"

export default ({ fixedNavPast }) => {
  return (
    <div className={`fixedLogo container ${fixedNavPast ? 'c-black' : 'c-white'}`}>
      {icons.fixedLogo}
    </div>
  )
}
