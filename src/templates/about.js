import React from "react";
import Link from "gatsby-link";
import Image from "../components/Image";

const Member = ({ member }) => (
  <div className={ `${ member.principal ? "principal bp-2_marginBottom-33" : "bp-2_marginBottom-13" } ` }>
    { !member.principal && <hr className=" marginBottom-2" /> }
    { member.principal && <img
      className="marginBottom-3 bp-1_marginBottom-2"
      src={ member.image.url}
      alt={ member.image.alt } /> }
    <h3 className=" f-copy-bold">{ member.name }</h3>
    <p className={ `${ member.principal ? "f-copy-bold" : "" }` }>{ member.jobTitle }</p>
    <p className={ `${ member.principal ? "f-copy-bold" : "" }  marginBottom-5 bp-1_marginBottom-5` }>{ member.principalInfo }</p>
    { member.principal && <p className=" marginBottom-13">{ member.description }</p> }
  </div>
);

const Publication = ({ publication }) => (
  <div>
    <hr className=" marginBottom-2" />
    <h4 className=" f-copy-bold">{ publication.title } -- { publication.publisher }</h4>
    <p className="  f-copy 
                    marginBottom-7
                    bp-2_marginBottom-7">
      { publication.date }
    </p>
  </div>
);

const Award = ({ award }) => (
  <div>
    <hr className=" marginBottom-2" />
    <h3 className=" f-copy-bold">{ award.title } -- { award.orgName }</h3>
    <p className="  marginBottom-7
                    bp-2_marginBottom-7">
      { award.date }
    </p>
    {/* <a href={ award.url } target="_blank">
      -->View Award
    </a> */}
  </div>
);

const Collaborator = ({ collaborator }) => (
  <div>
  <hr className="marginBottom-2" />  
    {collaborator.url ? (
      <a href={ collaborator.url }>
        <h3 className="f-copy-bold">
          { collaborator.name } - { collaborator.jobTitle }
        </h3>
        { collaborator.description && <p className="marginBottom-7">{ collaborator.description }</p> }
      </a>
    ) : (
      <div>
      <hr className="marginBottom-2" />
        <h3 className="f-copy-bold">
        { collaborator.name } - { collaborator.jobTitle }
      </h3>
        { collaborator.description && <p>{ collaborator.description }</p> }
      </div>
    )}
  </div>
);

export default ({ data }) => {
  const post = data.markdownRemark;
  const fields = post.frontmatter;
  const principals = fields.studioMembers.filter(member => member.principal);
  const studioMembers = fields.studioMembers.filter(
    member => !member.principal
  );
  return (
    <div className="  container">
      <h1 className=" f-page-title 
                      marginTop-7 marginBottom-5
                      bp-1_marginTop-10 bp-1_marginBottom-9
                      bp-2_marginTop-17 bp-2_marginBottom-21">
        { fields.title }
      </h1>
      <div className="bp-2_grid-12col bp-1_grid-12col">
        <div
          className=" f-display-copy
                      marginBottom-15
                      bp-1_marginBottom-15 bp-1_colSpan-10
                      bp-2_marginBottom-26 bp-2_colSpan-9"
          dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
        />
      </div>

      <div className="bp-2_grid-12col">
        { principals && (
          <div className="  marginBottom-2
                            bp-2_colSpan-8">
            <hr className=" marginBottom-2
                            bp-1_marginBottom-3" />
            <h2 className=" f-headline-c 
                            marginBottom-7
                            bp-1_marginBottom-15              
                            bp-2_marginBottom-15">
              Principals
            </h2>
            <ul className="nestedGrid-8-2">
              { principals.map((member, i) => (
                <li className="f-copy" key={`principalMember-${i}`}>
                  <Member member={ member } />
                </li>
              ))}
            </ul>
          </div>
        )}

        { !!studioMembers.length && (
          <div className="  colSpan-4
                            bp-1_marginBottom-24">
            <hr className=" marginBottom-2
                            bp-1_marginBottom-3" />
            <h2 className=" f-headline-c 
                            marginBottom-7
                            bp-2_marginBottom-16">
              Studio Members
            </h2>
            <ul className="marginBottom-15 bp-1_marginBottom-7">
              { studioMembers.map((member, i) => (
                <li key={`member-${i}`}>
                  <Member member={ member } />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="bp-2_grid-12col">
        { fields.publications && (
          <div className="  bp-2_colSpan-6
                            bp-2_marginBottom-20">
            <hr className=" marginBottom-2" />
            <h2 className=" f-headline-c 
                            marginBottom-7
                            bp-1_marginBottom-14
                            bp-2_marginBottom-15">
              Publications
            </h2>
            <ul className="marginBottom-15 bp-1_marginBottom-24">
              { fields.publications.map((publication, i) => (
                <li key={`publication-${i}`}>
                <Publication publication={ publication } />
              </li>
            ))}
            </ul>
          </div>
        )}
        { fields.awards && (
          <div className="colSpan-6
                          bp-2_marginBottom-20">
          <hr className=" marginBottom-2" />
          <h2 className=" f-headline-c
                          marginBottom-7
                          bp-1_marginBottom-14
                          bp-2_marginBottom-15">
            Awards
          </h2>
            <ul className="marginBottom-15 bp-1_marginBottom-24">
              { fields.awards.map((award, i) => (
                <li key={`award-${i}`}>
                  <Award award={ award } />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      { fields.collaborators && (
        <div>
          <hr className=" marginBottom-2" />
          <h2 className=" f-headline-c
                          marginBottom-7
                          bp-1_marginBottom-14
                          bp-2_marginBottom-15">
            Collaborators
          </h2>
          <ul className=" marginBottom-15
                          bp-1_marginBottom-24
                          bp-2_grid-2col">
            { fields.collaborators.map((collaborator, i) => (
              <li key={`award-${i}`}>
                <Collaborator collaborator={ collaborator } />
              </li>
            ))}
          </ul>
        </div>
      )}
      <hr className="marginBottom-2" />
    </div>
  );
};

export const query = graphql`
  query AboutPageQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        studioMembers {
          name
          image {
            url
            alt
          }
          jobTitle
          description
          principal
          principalInfo
        }
        publications {
          title
          date
          url
          publisher
        }
        awards {
          title
          orgName
          date
          url
        }
        collaborators {
          name
          jobTitle
          description
          url
        }
      }
    }
  }
`;
