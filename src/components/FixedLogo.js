import React, { Component } from 'react';
import { icons } from "./Icons";

export default ({ fixedLogoPast }) => {
  return (
    <div className={`fixedLogo container ${fixedLogoPast ? 'c-black' : 'c-white'}`}>
      {icons.fixedLogo}
    </div>
  )
}
