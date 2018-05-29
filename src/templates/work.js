import React, {Component} from "react";
import Link from "gatsby-link";

import ProjectFilter from '../components/ProjectFilter';

export default class Work extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterValue: 'all'
    }
  }

  filterProjects(project) {
    if(this.state.filterValue === 'all') {return true;}
    return project.frontmatter.type === this.state.filterValue;
  }

  render() {
    const page = this.props.data.page.frontmatter;
    const projects = this.props.data.projects.edges;
    return (
      <div className="container">
        <div className="  flex
                          justifySpaceBetween
                          marginTop-7 marginBottom-7
                          bp-1_marginTop-10
                          bp-2_marginTop-17 bp-2_marginBottom-12">
          <h1 className="f-page-title">
            { page.title }
          </h1>
          <ProjectFilter onChange={(val) => this.setState({filterValue: val})}/>
        </div>
        <ul className="bp-1_grid-3col bp-2_grid-4col">
          { projects &&
            projects.filter(({ node: project }) => this.filterProjects(project)).map(({ node: project }, i) => {
              return (
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
                        {/* Project Description */}
                      </h1>
                    </Link>
                  </article>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
    
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
            type
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
