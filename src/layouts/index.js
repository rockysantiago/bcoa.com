import React, { Component } from "react";
import "../styles/app.scss";

export default class TemplateWrapper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
  }

  componentDidMount = () => {
    window.location.replace('http://590bc.com');
  }

  toggleMenu = () => {
    this.state.menuOpen ? this.setState({ menuOpen: false }) : this.setState({ menuOpen: true });
  }

  render() {

    const {
      children,
      data
    } = this.props;

    return (
      <div>
        <h1>Site is under construction</h1>
      </div>
    );
  }
};

export const query = graphql`
  query DefaultLayout {
    contactJson {
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

TemplateWrapper.propTypes = {
  children: PropTypes.func
};