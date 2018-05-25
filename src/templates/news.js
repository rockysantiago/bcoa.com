import React from "react";
import Image from "../components/Image";

export default ({ data }) => {
  const news = data.news.frontmatter;

  return (
    <div className="container">
      <h1 className="f-page-title
                     marginTop-11 marginBottom-8">{ news.title }</h1>
      <ul>
        { data.articles.edges.map(({ node }, i) => (
          <li key={i}>
            <img
              src={ node.frontmatter.image.url }
              alt={ node.frontmatter.image.alt }
              className="marginBottom-11"
            />
            {/* News numbers counter in bottomRight of img space => ex: (1/2) */}
            <h2 className="f-headline-a">{ node.frontmatter.title }</h2>
            <time className="c-gray
                             f-headline-a
                             marginBottom-8">
              { node.frontmatter.date }
            </time>
            <div
              className="f-copy-book
                         marginBottom-13"
              dangerouslySetInnerHTML={{ __html: node.html }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export const query = graphql`
  query NewsPageQuery($slug: String!) {
    articles: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { regex: "/article-page/" } } }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            templateKey
            title
            image {
              url
              alt
            }
            date
          }
          fields {
            slug
          }
        }
      }
    }

    news: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      frontmatter {
        title
      }
    }
  }
`;
