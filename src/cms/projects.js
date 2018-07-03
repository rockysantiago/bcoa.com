import React from 'react';
import Hero from "../components/Hero";
import ProjectImage from "../components/ProjectImage";

export default (props) => {
  const entry = props.entry;
  const title = entry.getIn(['data', 'title']);
  const headline = entry.getIn(['data', 'headline']);
  const body = entry.getIn(['data', 'body']);
  const heroImg = props.widgetsFor('heroImage').getIn(['data', 'url']) && props.getAsset(props.widgetsFor('heroImage').getIn(['data', 'url'])).toString();
  const primaryImg = {
    image: props.widgetsFor('primaryImage').getIn(['data', 'image']) && props.getAsset(props.widgetsFor('primaryImage').getIn(['data', 'image'])).toString(),
    caption: props.widgetsFor('primaryImage').getIn(['data', 'caption']),
    alt: props.widgetsFor('primaryImage').getIn(['data', 'alt']),
  };
  const infoObject = props.widgetsFor('infoObject');
  const projectGallery = props.widgetsFor('projectGallery');
  let firstGalleryImage;
  projectGallery.map((item, i) => {
    if (item) {
      if (item.getIn(['data', 'type']) === 'image' && i == 0) {
        firstGalleryImage = {
          image: item.getIn(['data', 'image']) && props.getAsset(item.getIn(['data', 'image'])).toString(),
          caption: item.getIn(['data', 'caption']),
          alt: item.getIn(['data', 'alt']),
          offsetWidth: item.getIn(['data', 'offsetWidth']),
          colWidth: item.getIn(['data', 'colWidth']),
        }
      }
    }
  })
  // console.log(projectGallery);
  // console.log(projectGallery[0]);
  // let firstGalleryImage;
  // if (projectGallery[0].getIn(['data', 'type']) === 'image') {
  //   firstGalleryImage = {
  //     colWidth: projectGallery[0].getIn(['data', 'colWidth']),
  //   };
  // }
  console.log(firstGalleryImage);
  console.log(firstGalleryImage.colWidth);

  return (
    <div>
      <div className="container
                      bp-1_paddingTop-2 bp-2_paddingTop-5
                      bp-1_marginBottom-3 bp-2_marginBottom-6">
        <div className="project-name">
          <h2 className='f-page-title'>{title}</h2>
        </div>
      </div>

      {heroImg && 
        <Hero image={heroImg} alt={'hero image'} />
      }

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
                  {infoObject.map((item, i) => {
                    if (item) {
                      return (
                        <div key={`infoObject-${i}`} className='marginBottom-4 bp-2_marginBottom-6'>
                          <dt className="f-credit">{item.getIn(['data', 'title'])}</dt>
                          <dd className="f-caption">{item.getIn(['data', 'description'])}</dd>
                        </div>
                      )
                    } 
                    return null;
                  })}
                </dl>
              </div>
            )}
          </div>
          <div className="colSpan-1"></div>

          {primaryImg &&
            <div className={`project-primaryImage colSpan-6 bp-1_marginTop-1 bp-2_marginTop-3`}>
              <ProjectImage className={firstGalleryImage.colWidth > 6 ? '' : 'absolute'} key='primary-image' imageData={primaryImg} />
            </div>
          }
        </div>
        <div>
          {projectGallery &&
            <div className="project-images grid-12col">
              {projectGallery.map((item, i) => {
                if(item) {
                  if (item.getIn(['data', 'type']) === 'image') {
                    const image = {
                      image: item.getIn(['data', 'image']) && props.getAsset(item.getIn(['data', 'image'])).toString(),
                      caption: item.getIn(['data', 'caption']),
                      alt: item.getIn(['data', 'alt']),
                      offsetWidth: item.getIn(['data', 'offsetWidth']),
                      colWidth: item.getIn(['data', 'colWidth']),
                    }
                    return <ProjectImage key={i} index={i} image={image} />
                  } else {
                    return (
                      <blockquote key={i} className="colSpan-12 t-center f-headline-b 
                                            marginBottom-11 bp-1_marginBottom-13 bp-2_marginBottom-28
                                            marginTop-5 bp-1_marginTop-8 bp-2_marginTop-14">
                        {item.getIn(['data', 'pullQuote'])}
                      </blockquote>
                    )
                  }
                }
                return null;
              })}
            </div>
          }   
        </div>
      </div>
    </div>
  )
};
