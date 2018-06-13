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

  renderFilterTransition = (filterValue) => {
    this.setState({inTransition: true});
    setTimeout(() => this.setState({filterValue: filterValue}), 250);
    setTimeout(() => this.setState({ inTransition: false }), 500);
  }

  render() {
    const page = this.props.data.page.frontmatter;
    const projects = this.props.data.projects.edges;
    return (
      <div className="container
                      marginBottom-11
                      bp-1_marginBottom-3
                      bp-2_marginBottom-9"
      >
        <div className="flex
                        justifySpaceBetween
                        marginTop-7 marginBottom-6
                        bp-1_marginTop-10
                        bp-2_marginTop-17 bp-2_marginBottom-12"
        >
          <h1 className="f-page-title">
            { page.title }
          </h1>
          <ProjectFilter onChange={(val) => this.renderFilterTransition(val)}/>
        </div>
        <ul className={`${this.state.inTransition ? 'inTransition' : '' } bp-1_grid-3col bp-2_grid-4col`}>
          { projects &&
            projects.filter(({ node: project }) => this.filterProjects(project)).map(({ node: project }, i) => {
              return (
                <li key={i}>
                  <article className="workProject">
                    <Link to={ project.fields.slug }>
                      { project.frontmatter.previewImage &&
                        <img
                          className=" marginBottom-3"
                          src={ project.frontmatter.previewImage.url }
                          alt={ project.frontmatter.previewImage.alt }
                        />
                      }
                      <h1 className="f-subhead">{ project.frontmatter.title }</h1>
                      <h2 className=" f-subhead
                                      marginBottom-9
                                      bp-2_marginBottom-21"
                      >
                      { project.frontmatter.workDescription }
                      </h2>
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
            workDescription
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
