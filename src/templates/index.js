import React, {Component} from "react";
import Link from "gatsby-link";
import Img from 'gatsby-image';
import Masonry from 'react-masonry-component';
import Slider from '../components/Slider';

const FeaturedProjectImage = ({ image }) => {
  return (
    <img
      src={ image.url }
      alt={ image.alt }
      className=" colSpan-4
                  marginBottom-5
                  bp-1_marginBottom-6
                  bp-2_marginBottom-9"
    />
  )
}

const renderFeaturedProjects = (projects) => {
  return (
    projects.map(({ node: project }, i) => (
      <li className='bp-1_masonry-child-2col' key={i}>
        <article className="featuredProject">
          <Link to={ project.fields.slug }>
            <Img
              sizes={ project.frontmatter.featured.featuredImage.image.childImageSharp.sizes }
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
                              bp-2_marginBottom-30"
              >
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

export default class Index extends Component {

  componentWillUpdate(nextProps) {
    if ((this.props.location.hash !== nextProps.location.hash) && nextProps.location.hash === "#featured") {
      setTimeout(() => {
        this.content.scrollIntoView({ behavior: "smooth", block: "start", inline: 'nearest'});
      }, 100);
    }
  }

  render() {
    const edges = this.props.data.projects.edges;
    const projects = edges.filter(
      edge =>
        edge.node.frontmatter.templateKey === "project-page" &&
        edge.node.frontmatter.featured
    );
  
    return (
      <div>
        <Slider className="hero" slides={ this.props.data.page.frontmatter.carouselImages } />
        <div ref={(el) => { if (el) { this.content = el } }} className="container overflow--hidden">
          <h2 className=" f-page-title
                          marginTop-8 marginBottom-7
                          bp-1_marginTop-10
                          bp-2_marginTop-17 bp-2_marginBottom-13">
            { this.props.data.page.frontmatter.title }
          </h2>
          {(this.props.isWindowLarge
            ?
              <Masonry
                className={'masonry'}
                elementType={'ul'}
                options={{ transitionDuration: 0 }}
              >
                { renderFeaturedProjects(projects) }
              </Masonry>
            :
              renderFeaturedProjects(projects)
          )}
        </div>
      </div>
    );
  }
};

export const query = graphql`
  query IndexQuery($slug: String!) {
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      frontmatter {
        title
        carouselImages {
          image
          alt
          description
          project
        }
      }
    }
    projects: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: ASC }
    ) {
      edges {
        node {
          id
          frontmatter {
            templateKey
            featured {
              isFeatured
              featuredImage {
                image {
                  childImageSharp {
                    sizes(maxWidth: 1820) {
                      ...GatsbyImageSharpSizes_withWebp
                    }
                  }
                }
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
