import React from "react";
import Image from "../components/Image";

export default ({ data }) => {
  const page       = data.page;
  const pageFields = page.frontmatter;
  const contact    = data.contact;
  return (
    <div className="container">
        <h1 className=" f-page-title
                        paddingTop-7 marginBottom-7">
          { pageFields.title }
        </h1>
        <img
          src={ pageFields.heroImage.url }
          alt={ pageFields.heroImage.alt }
        />
        <div className="marginBottom-7"
            dangerouslySetInnerHTML={{ __html: page.html }} />
          <p className="f-display-copy
                        marginBottom-7">{ pageFields.message }</p>
          <p className="f-display-copy">{ contact.address.street }</p>
          <p className="f-display-copy">{ contact.address.street2 }</p>
          <p className="f-display-copy">
            { contact.address.city },{ contact.address.state } { contact.address.zip }
          </p>
          <p className="f-display-copy">--</p>
          <p>
            <a className="f-display-copy c-red" href={`mailto:${ contact.email }`}>email</a>
          </p>
          <a className="f-display-copy c-red" href={`tel:${ contact.phone }`}>phone</a>
          <p className="f-display-copy">--</p>
          <p className="f-display-copy paddingBottom-16">Instagram</p>
    </div>
  );
};

export const query = graphql`
  query ContactPageQuery($slug: String!) {
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        message
        heroImage {
          url
          alt
        }
      }
    }
    contact: contactJson {
      address {
        street
        street2
        city
        state
        zip
      }
      phone
      email
      instagram
      facebook
    }
  }
`;
