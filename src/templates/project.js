import React, { Fragment } from "react";

import ProjectImage from "../components/ProjectImage";
import Hero from "../components/Hero";

export default ({ data }) => {
  const post = data.markdownRemark;
  const fields = post.frontmatter;
  return (
    <div className="bp-2_marginBottom-15">
      <div className="container
                      bp-1_paddingTop-2 bp-2_paddingTop-5
                      bp-1_marginBottom-3 bp-2_marginBottom-6">
        <div className="project-name">
          <h2 className='f-page-title'>{fields.title}</h2>
        </div>
      </div>

      {fields.heroImage && 
        <Hero image={fields.heroImage.url} alt={fields.heroImage.alt} />
      }
      <div className="container marginTop-5 bp-1_marginTop-10 bp-2_marginTop-31">
      {/* Always will be 2 lines of text, even on large resolution as the first image of the proj img array will float over on the right side */}
        <div className="bp-1_grid-12col">
          <div className="colSpan-5">
            <h1 className='f-headline-b marginBottom-4 bp-1_marginBottom-13 bp-2_marginBottom-9'>
              {fields.headline}-
            </h1>
            <div className="marginBottom-5 bp-2_marginBottom-10"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />

            {fields.infoObject && fields.infoObject.length && (
              <div className="infoObjects">
                <dl className='bp-1_grid-2col marginBottom-8 bp-1_marginBottom-13 bp-2_marginBottom-24'>
                  {fields.infoObject.map((item, i) => (
                    <div key={`infoObject-${i}`} className='marginBottom-4 bp-2_marginBottom-6'>
                      <dt className="f-credit">{item.title}</dt>
                      <dd className="f-caption">{item.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
          <div className="colSpan-1"></div>
          {fields.primaryImage && 
            <div className={`project-primaryImage bp-1_marginTop-1 colSpan-6`}>
              <ProjectImage className={fields.projectGallery[0].colWidth > 6 ? '' : 'absolute'} key='primary-image' image={fields.primaryImage} />
            </div>
          }
        </div>
        <div>
          {fields.projectGallery && fields.projectGallery.length &&
            <div className="project-images bp-1_grid-12col">
              {fields.projectGallery.map((item, i) => {
                return (
                  item.type === 'image' ? 
                    <ProjectImage key={i} index={i} image={item} />
                  :
                  <blockquote key={i} className=" project-blockquote colSpan-12 bp-1_colSpan-11 t-center f-headline-b 
                                                  marginTop-12 marginBottom-12
                                                  bp-1_marginTop-7 bp-1_marginBottom-14
                                                  bp-2_marginTop-14 bp-2_marginBottom-30"
                  >
                    {item.pullQuote}
                  </blockquote>
                )
              })}
            </div>
          }
        </div>
        
      </div>
    </div>
  );
};

export const query = graphql`
  query ProjectPageQuery($slug: String!) {
    markdownRemark(fields: {slug: {eq: $slug } }) {
      id
      html
      frontmatter {
        title
        headline
        infoObject {
          title
          description
        }
        heroImage {
          url
          alt
        }
        primaryImage {
          image
          alt
          caption
        }
        projectGallery {
          type
          image
          colWidth
          offsetWidth
          alt
          caption
          pullQuote
        }
      }
    }
  }
`;
