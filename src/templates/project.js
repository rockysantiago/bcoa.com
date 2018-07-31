import React, { Fragment } from "react";
import Img from 'gatsby-image';
import ProjectImage from "../components/ProjectImage";
import Hero from "../components/Hero";
import SEO from "../components/SEO";

export default ({ data }) => {
  const post = data.markdownRemark;
  const fields = post.frontmatter;
  return (
    <div className="bp-2_marginBottom-15">
      <SEO
        postImage={fields.seo.image ? fields.seo.image.childImageSharp.sizes.src : null}
        postData={fields}
      />
      <div className="container
                      bp-1_paddingTop-2 bp-2_paddingTop-5
                      bp-1_marginBottom-3 bp-2_marginBottom-6">
        <div className="project-name">
          <h2 className='f-page-title'>{fields.title}</h2>
        </div>
      </div>

      {fields.heroImage && fields.heroImage.image &&
        <Img className="projectHero" sizes={ fields.heroImage.image.childImageSharp.sizes } />
      }
      <div className="container marginTop-5 bp-1_marginTop-10 bp-2_marginTop-30">
        <div className="bp-1_grid-12col">
          <div className="colSpan-5">
            <h1 className='f-headline-b marginBottom-4 bp-1_marginBottom-13 bp-2_marginBottom-9'>
              {fields.headline} &#8212;
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
            <div className={`project-primaryImage colSpan-6 bp-1_marginTop-1 bp-2_marginTop-3`}>
              <ProjectImage className={fields.projectGallery[0] && fields.projectGallery[0].colWidth > 6 ? '' : 'absolute'} key='primary-image' imageData={fields.primaryImage} />
            </div>
          }
        </div>
        <div>
          {fields.projectGallery && fields.projectGallery.length &&
            <div className="project-images bp-1_grid-12col">
              {fields.projectGallery.map((imageData, i) => {
                return (
                  imageData.type === 'image'
                  ?
                      <ProjectImage key={i} index={i} imageData={ imageData } />
                    :
                      <blockquote key={i} className=" project-blockquote colSpan-12 bp-1_colSpan-11 t-center f-headline-b 
                                                      marginTop-12 marginBottom-12
                                                      bp-1_marginTop-7 bp-1_marginBottom-14
                                                      bp-2_marginTop-14 bp-2_marginBottom-30"
                      >
                    {imageData.pullQuote}
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
        seo {
          title
          description
          image {
            childImageSharp {
              sizes(maxWidth: 1200) {
                ...GatsbyImageSharpSizes_withWebp
              }
            }
          }
        }
        headline
        infoObject {
          title
          description
        }
        heroImage {
          image {
            childImageSharp {
              sizes(maxWidth: 3848) {
                ...GatsbyImageSharpSizes_withWebp
              }
            }
          }
          alt
        }
        primaryImage {
          image {
            childImageSharp {
              sizes(maxWidth: 1820) {
                ...GatsbyImageSharpSizes_withWebp
              }
            }
          }
          alt
          caption
        }
        projectGallery {
          type
          image {
            childImageSharp {
              sizes(maxWidth: 3800) {
                ...GatsbyImageSharpSizes_withWebp
              }
            }
          }
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
