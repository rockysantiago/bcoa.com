import React from "react";
import Link from "gatsby-link";
import Masonry from 'react-masonry-component';
import Slider from '../components/Slider';

const renderFeaturedProjects = (projects) => {
  return (
    projects.map(({ node: project }, i) => (
      <li className='bp-1_masonry-child-2col' key={i}>
        <article className="featuredProject">
          <Link to={ project.fields.slug }>
            <img
              src={ project.frontmatter.featured.featuredImage.url }
              alt={ project.frontmatter.featured.featuredImage.alt }
              className=" marginBottom-5
                          bp-1_marginBottom-6
                          bp-2_marginBottom-9"
            />
            <div className="featured-info">
              <h1 className=" f-headline-d
                              marginBottom-5
                              bp-2_marginBottom-10">
                { project.frontmatter.title }
              </h1>
              <div className="f-subhead
                              marginBottom-12
                              bp-1_marginBottom-14
                              bp-2_marginBottom-30">
                <p>{project.frontmatter.featured.featuredDescription}</p>
                <p className="underline">Read More</p>
              </div>
            </div>
          </Link>
        </article>
      </li>
    ))
  )
}

export default ({ data }) => {
  const edges = data.projects.edges;
  const projects = edges.filter(
    edge =>
      edge.node.frontmatter.templateKey === "project-page" &&
      edge.node.frontmatter.featured
  );

  return (
    <div>
      <Slider className="hero" slides={ data.page.frontmatter.carouselImages } />
      <div className="container">
        <h2 className=" f-page-title
                        marginTop-8 marginBottom-7
                        bp-1_marginTop-10
                        bp-2_marginTop-17 bp-2_marginBottom-13">
          { data.page.frontmatter.title }
        </h2>
        {projects &&                        
          <Masonry
            className={'masonry'}
            elementType={'ul'}
            options={{ transitionDuration: 0 }}
          >
            { renderFeaturedProjects(projects) }
          </Masonry>
        }
      </div>
    </div>
  );
};

export const query = graphql`
  query IndexQuery($slug: String!) {
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      frontmatter {
        title
        carouselImages {
          url
          alt
          description
          project
        }
      }
    }
    projects: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            templateKey
            featured {
              isFeatured
              featuredImage {
                url
                alt
              }
              featuredDescription
            }
            title
            date
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;
