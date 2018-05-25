import React from 'react'

import Hero from "../components/Hero";
import ProjectImage from "../components/ProjectImage";

export default (props) => {
  console.log(props);
  const entry = props.entry;
  const title = entry.getIn(['data', 'title']);
  const headline = entry.getIn(['data', 'headline']);
  const body = entry.getIn(['data', 'body']);
  const heroImg = props.getAsset(props.widgetsFor('heroImage').getIn(['data', 'url']));
  const primaryImg = {
    image: props.getAsset(props.widgetsFor('primaryImage').getIn(['data', 'image'])).toString(),
    caption: props.widgetsFor('primaryImage').getIn(['data', 'caption']),
    alt: props.widgetsFor('primaryImage').getIn(['data', 'alt']),
  };
  const secondaryImg = {
    image: props.getAsset(props.widgetsFor('secondaryImage').getIn(['data', 'image'])).toString(),
    caption: props.widgetsFor('secondaryImage').getIn(['data', 'caption']),
    alt: props.widgetsFor('secondaryImage').getIn(['data', 'alt']),
  }
  const infoObject = props.widgetsFor('infoObject');
  const projectGallery = props.widgetsFor('projectGallery');

  return (
    <div>
      <div className="container
                      bp-1_paddingTop-2 bp-2_paddingTop-5
                      bp-1_marginBottom-3 bp-2_marginBottom-6">
        <div className="project-name">
          <h2 className='f-page-title'>{title}</h2>
        </div>
      </div>

      <Hero image={heroImg.toString()} alt={'hero image'} />

      <div className="container marginTop-5 bp-1_marginTop-9 bp-2_marginTop-31">
        <div className="grid-12col">
          <div className="colSpan-5">
            <h1 className='f-headline-b marginBottom-4 bp-1_marginBottom-13 bp-2_marginBottom-11'>
              {headline}-
            </h1>
            <div className="md marginBottom-5 bp-1_marginBottom-5 bp-2_marginBottom-10"
              dangerouslySetInnerHTML={{ __html: body }}
            />

            {infoObject && (
              <div className="infoObjects">
                <dl className='grid-2col marginBottom-12 bp-1_marginBottom-16 bp-2_marginBottom-24'>
                  {infoObject.map((item, i) => (
                    <div key={`infoObject-${i}`} className='marginBottom-4 bp-2_marginBottom-6'>
                      <dt className="f-credit">{item.getIn(['data', 'title'])}</dt>
                      <dd className="f-caption">{item.getIn(['data', 'description'])}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
          <div className="colSpan-1"></div>
          <div className="project-primaryImage colSpan-6">
            <ProjectImage key='primary-image' image={primaryImg} />
          </div>
        </div>
      </div>
      <div>
      <div className="grid-12col">
          <ProjectImage className="colSpan-6" key='secondary-image' image={secondaryImg} />
        </div>
        {projectGallery &&
          <div className="project-images grid-12col">
            {projectGallery.map((item, i) => {
              if (item.getIn(['data', 'type']) === 'image') {
                const image = {
                  image: props.getAsset(item.getIn(['data', 'image'])).toString(),
                  caption: item.getIn(['data', 'caption']),
                  alt: item.getIn(['data', 'alt']),
                  offsetWidth: item.getIn(['data', 'offsetWidth']),
                  colWidth: item.getIn(['data', 'colWidth']),
                }
                return <ProjectImage key={i} image={image} />
              } else {
                return (
                  <blockquote key={i} className="colSpan-12 t-center f-headline-b 
                                        marginBottom-11 bp-1_marginBottom-13 bp-2_marginBottom-28
                                        marginTop-5 bp-1_marginTop-8 bp-2_marginTop-14">
                    {item.getIn(['data', 'pullQuote'])}
                  </blockquote>
                )
              }
            })}
          </div>
        }
      </div>
    </div>
  )
};
