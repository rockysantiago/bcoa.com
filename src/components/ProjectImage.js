import React, { Fragment } from 'react'
import classnames from "classnames";

import Image from "./Image";

const ProjectImage = (props) => (
  <figure key={props.i} className={props.classes}>
    <Image image={props.image} />
    {props.image.caption &&
      <div className="marginTop-1">
        –
        <figcaption className='f-caption'>{props.image.caption}</figcaption>
      </div>
    }
  </figure>
)

export default (props) => {
  const classes = classnames(props.className, {
    'colSpan-1': (props.image.colWidth === '1'),
    'colSpan-2': (props.image.colWidth === '2'),
    'colSpan-3': (props.image.colWidth === '3'),
    'colSpan-4': (props.image.colWidth === '4'),
    'colSpan-5': (props.image.colWidth === '5'),
    'colSpan-6': (props.image.colWidth === '6'),
    'colSpan-7': (props.image.colWidth === '7'),
    'colSpan-8': (props.image.colWidth === '8'),
    'colSpan-9': (props.image.colWidth === '9'),
    'colSpan-10': (props.image.colWidth === '10'),
    'colSpan-11': (props.image.colWidth === '11'),
    'colSpan-12': (props.image.colWidth === '12'),
    'colOffset-1': (props.image.offsetWidth === '1'),
    'colOffset-2': (props.image.offsetWidth === '2'),
    'colOffset-3': (props.image.offsetWidth === '3'),
    'colOffset-4': (props.image.offsetWidth === '5'),
    'colOffset-6': (props.image.offsetWidth === '6'),
    'colOffset-7': (props.image.offsetWidth === '7'),
    'colOffset-8': (props.image.offsetWidth === '8'),
    'colOffset-9': (props.image.offsetWidth === '9'),
    'colOffset-10': (props.image.offsetWidth === '10'),
    'colOffset-11': (props.image.offsetWidth === '11'),
    'marginBottom-6 bp-1_marginBottom-7 bp-2_marginBottom-16 project-image-wrapper': true,
  // 'project-image-wrapper': true
  })

  console.log(props);

  return (
    props.image.offsetWidth > 0 ?
      <div className={`colSpan-12 grid-12col`}>
        <div className={`colSpan-${props.image.offsetWidth}`}></div>
        <ProjectImage {...props} classes={classes} />
      </div>
      :
      <ProjectImage {...props} classes={classes} />
  )
}

