import React from "react";
import Link from "gatsby-link";

export default ({ data }) => {
  const page = data.page.frontmatter;
  const projects = data.projects.edges;
  return (
    <div className="container">
      <h1 className="f-page-title">{page.title}</h1>
      <ul className="grid-4col">
        {projects &&
          projects.map(({ node: project }, i) => (
            <li key={i}>
              <article>
                <Link to={project.fields.slug}>
                  <img
                    src={project.frontmatter.previewImage.url}
                    alt={project.frontmatter.previewImage.alt}
                  />
                  {/* project location name should go here with same style as "title" below */}
                  <h1 className="f-subhead">{project.frontmatter.title}</h1>
                </Link>
              </article>
            </li>
          ))}
      </ul>
    </div>
  );
};

export const query = graphql`
  query WorkQuery($slug: String!) {
    projects: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { regex: "/project-page/" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            previewImage {
              url
              alt
            }
          }
          fields {
            slug
          }
        }
      }
    }
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      frontmatter {
        title
      }
    }
  }
`;
