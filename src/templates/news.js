import React from "react";
import Link from "gatsby-link";
import Masonry from 'react-masonry-component';
import Image from "../components/Image";

const renderArticles = (articles) => {
  return (
    articles.map(({ node: article }, i) => (
      <li className="bp-1_masonry-child-2col
                     bp-2_masonry-child-3col"
          key={i}
      >
        <article>
          <Link to={ article.fields.slug }>
            <img
              src={ article.frontmatter.image.url }
              alt={ article.frontmatter.image.alt }
              className=" marginBottom-5
                          bp-2_marginBottom-6"
            />
            <h2 className="f-headline-a">{ article.frontmatter.title }</h2>
            <time className="c-gray f-headline-a">{ article.frontmatter.date }</time>
            <div className="f-copy-book
                            marginTop-2 marginBottom-12
                            bp-1_marginTop-4 bp-1_marginBottom-14
                            bp-2_marginTop-5 bp-2_marginBottom-21"
                dangerouslySetInnerHTML={{ __html: article.html }}
            />
          </Link>
        </article>
      </li>
    ))
  )
}

export default ({ data }) => {
  const news = data.news.frontmatter;
  const articles = data.articles.edges;
  console.log(articles);

  return (
    <div className="container">
      <h1 className="f-page-title
                     marginTop-8 marginBottom-7
                     bp-1_marginTop-10
                     bp-2_marginTop-17 bp-2_marginBottom-12"
      >
        { news.title }
      </h1>
      { articles &&
        <Masonry
          className={'masonry'}
          elementType={'ul'}
          options={{ transitionDuration: 0 }}
        >
          { renderArticles(articles) }
        </Masonry>
      }
      <hr className="marginBottom-4" />
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
