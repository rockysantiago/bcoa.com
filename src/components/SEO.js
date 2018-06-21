import path from 'path';
import React from 'react';
import Helmet from 'react-helmet';
import * as settings from '../_data/settings/settings.json'
import * as contact from '../_data/contact/contact.json'

const getSchemaOrgJSONLD = ({
  isBlogPost,
  url,
  title,
  image,
  description,
  datePublished,
}) => {
  const schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url,
      name: title,
      alternateName: settings.title,
    },
  ];

  return isBlogPost
    ? [
      ...schemaOrgJSONLD,
      {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@id': url,
              name: title,
              image,
            },
          },
        ],
      },
      {
        '@context': 'http://schema.org',
        '@type': 'BlogPosting',
        url,
        name: title,
        alternateName: settings.siteTitle,
        headline: title,
        image: {
          '@type': 'ImageObject',
          url: image,
        },
        description,
        author: {
          '@type': 'Person',
          name: 'Bronwyn Breitner',
        },
        publisher: {
          '@type': 'Organization',
          url: 'https://bc-oa.com',
          logo: settings.logo,
          name: 'Bronwyn Breitner',
        },
        mainEntityOfPage: {
          '@type': 'WebSite',
          '@id': settings.url,
        },
        datePublished,
      },
    ]
    : schemaOrgJSONLD;
};

const SEO = ({ postData, postImage, isBlogPost, bodyAttributes }) => {
  const postMeta = postData.frontmatter || {};

  const title = postMeta.title || settings.title;
  const description =
    postMeta.description || postData.excerpt || settings.siteDescription;
  const image = `${settings.url}${postImage}` || settings.ogImage;
  const url = postMeta.slug
    ? `${settings.url}${path.sep}${postMeta.slug}`
    : settings.url;
  const datePublished = isBlogPost ? postMeta.datePublished : false;

  const schemaOrgJSONLD = getSchemaOrgJSONLD({
    isBlogPost,
    url,
    title,
    image,
    description,
    datePublished,
  });

  return (
    <Helmet bodyAttributes={bodyAttributes}>
      {/* General tags */}
      <meta name="description" content={description} />
      <meta name="image" content={image} />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      {isBlogPost ? <meta property="og:type" content="article" /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="fb:app_id" content={contact.facebook} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={contact.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

SEO.defaultProps = {
  isBlogPost: false,
  postImage: null,
};

export default SEO;