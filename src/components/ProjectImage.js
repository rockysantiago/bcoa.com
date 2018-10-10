import React, {Fragment} from 'react';
import Img from 'gatsby-image';
import classnames from "classnames";

const ProjectImage = (props) => {
  // console.log(props.imageData)
  // debugger;
  return (
    <figure key={props.i} className={props.classes}>
      <Img sizes={props.imageData.image.childImageSharp.sizes} alt={props.imageData.alt} />
      {props.imageData.caption &&
        <div className="marginTop-1">
          –
          <figcaption className='f-caption'>{props.imageData.caption}</figcaption>
        </div>
      }
    </figure>
  )
}

export default (props) => {
  const classes = classnames(props.className, {
    'colSpan-1': (props.imageData.colWidth === '1'),
    'colSpan-2': (props.imageData.colWidth === '2'),
    'colSpan-3': (props.imageData.colWidth === '3'),
    'colSpan-4': (props.imageData.colWidth === '4'),
    'colSpan-5': (props.imageData.colWidth === '5'),
    'colSpan-6': (props.imageData.colWidth === '6'),
    'colSpan-7': (props.imageData.colWidth === '7'),
    'colSpan-8': (props.imageData.colWidth === '8'),
    'colSpan-9': (props.imageData.colWidth === '9'),
    'colSpan-10': (props.imageData.colWidth === '10'),
    'colSpan-11': (props.imageData.colWidth === '11'),
    'colSpan-12': (props.imageData.colWidth === '12'),
    'colOffset-1': (props.imageData.offsetWidth === '1'),
    'colOffset-2': (props.imageData.offsetWidth === '2'),
    'colOffset-3': (props.imageData.offsetWidth === '3'),
    'colOffset-4': (props.imageData.offsetWidth === '5'),
    'colOffset-6': (props.imageData.offsetWidth === '6'),
    'colOffset-7': (props.imageData.offsetWidth === '7'),
    'colOffset-8': (props.imageData.offsetWidth === '8'),
    'colOffset-9': (props.imageData.offsetWidth === '9'),
    'colOffset-10': (props.imageData.offsetWidth === '10'),
    'colOffset-11': (props.imageData.offsetWidth === '11'),
    'marginBottom-6 bp-1_marginBottom-7 bp-2_marginBottom-16 project-image-wrapper': true,
    // 'project-image-wrapper': true
  })

  return (
    props.imageData.offsetWidth > 0
      ?
      <div className={`colSpan-12 grid-12col mobile-grid-none`}>
        <div className={`colSpan-${props.imageData.offsetWidth}`}></div>
        <ProjectImage {...props} classes={classes} alt={props.imageData.alt}/>
      </div>
      :
      props.index == 0
        ?
        <div className={`colSpan-12 grid-12col mobile-grid-none`}>
          <ProjectImage {...props} classes={classes} alt={props.imageData.alt}/>
        </div>
        :
        <ProjectImage {...props} classes={classes} alt={props.imageData.alt}/>
  )
}
