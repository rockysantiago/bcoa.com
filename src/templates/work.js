import React from "react";
import Link from "gatsby-link";

export default ({ data }) => {
  const page = data.page.frontmatter;
  const projects = data.projects.edges;
  return (
    <div className="container">
      <h1 className=" f-page-title
                      marginTop-7 marginBottom-7
                      bp-1_marginTop-10
                      bp-2_marginTop-17 bp-2_marginBottom-12"
      >
        { page.title }
      </h1>
      <ul className="bp-1_grid-3col bp-2_grid-4col">
        { projects &&
          projects.map(({ node: project }, i) => (
            <li key={i}>
              <article>
                <Link to={ project.fields.slug }>
                  { project.frontmatter.previewImage &&
                    <img
                      className=" marginBottom-3"
                      src={ project.frontmatter.previewImage.url }
                      alt={ project.frontmatter.previewImage.alt }
                    />
                  }
                  <h1 className="f-subhead">{ project.frontmatter.title }</h1>
                  <h1 className=" f-subhead
                                  marginBottom-9
                                  bp-2_marginBottom-21"
                  >
                    Project Description
                  </h1>
                </Link>
              </article>
            </li>
          ))}
      </ul>
      <hr className="marginBottom-2" />
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
