import path from 'path';
import React from 'react';
import Helmet from 'react-helmet';
import * as settings from '../_data/settings/settings.json'
import * as contact from '../_data/contact/contact.json'

const getSchemaOrgJSONLD = ({
  url,
  title
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

  return schemaOrgJSONLD;
};

const SEO = ({ postData, postImage }) => {
  const postMeta = postData || {};
  const title = postMeta.seo.title || settings.siteTitle;
  const description =
    postMeta.seo.description || settings.siteDescription;
  const image = `${settings.url}${postImage}` || settings.siteImage;
  const url = postMeta.slug
    ? `${settings.url}${path.sep}${postMeta.slug}`
    : settings.url;

  const schemaOrgJSONLD = getSchemaOrgJSONLD({
    url,
    title
  });

  return (
    <Helmet>
      {/* General tags */}
      <meta name="description" content={description} />
      <meta name="image" content={image} />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
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
  postImage: null,
};

export default SEO;