import React from "react";
import Link from "gatsby-link";

import Slider from '../components/Slider';

export default ({ data }) => {
  const edges = data.projects.edges;
  const projects = edges.filter(
    edge =>
      edge.node.frontmatter.templateKey === "project-page" &&
      edge.node.frontmatter.featured
  );

  return (
    <div>
      <Slider slides={data.page.frontmatter.carouselImages} />
      <div className="container">
        <h2 className="f-page-title">{data.page.frontmatter.title}</h2>
        <ul>
          {projects &&
            projects.map(({ node: project }, i) => (
              <li key={i}>
                <article>
                  <Link to={project.fields.slug}>
                    <img
                      src={project.frontmatter.previewImage.url}
                      alt={project.frontmatter.previewImage.alt}
                    />
                    <h1 className="f-headline-d">{project.frontmatter.title}</h1>
                    {/* we need descriptor text below and "Read More" filler */}
                  </Link>
                </article>
              </li>
            ))}
        </ul>
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
            featured
            previewImage {
              url
              alt
            }
            title
            date
            featured
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
