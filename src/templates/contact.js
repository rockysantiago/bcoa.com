import React from "react";
import Image from "../components/Image";

export default ({ data }) => {
  const page       = data.page;
  const pageFields = page.frontmatter;
  const contact    = data.contact;
  return (
    <div className="container">
      <div className="marginBottom-40
                      bp-1_marginBottom-17">
        <h1 className=" f-page-title
                        paddingTop-7 marginBottom-7
                        bp-1_paddingTop-11
                        bp-2_paddingTop-17 bp-2_marginBottom-12">
          { pageFields.title }
        </h1>
        <img
          src={ pageFields.heroImage.url }
          alt={ pageFields.heroImage.alt }
        />
        <div className="marginBottom-6
                        bp-1_marginBottom-8
                        bp-2_marginBottom-15"
            dangerouslySetInnerHTML={{ __html: page.html }} />
        {/* more column space --> offsetting strategy needed(padding on the right) */}
        <div className="bp-2_grid-12col
                        bp-2_marginBottom-50">
          <p className="f-display-copy
                        marginBottom-7
                        bp-2_colSpan-6">
            { pageFields.message }
          </p>
        <div className="bp-2_colSpan-6">
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
        </div>
      </div>
      <hr className="marginBottom-2"/>
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
