import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import "../styles/app.scss";
import HeaderNav from "../components/HeaderNav";
import FixedLogo from "../components/FixedLogo";
import classnames from "classnames";
import Headroom from 'react-headroom'

export default class TemplateWrapper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
  }

  toggleMenu = () => {
    this.state.menuOpen ? this.setState({ menuOpen: false }) : this.setState({ menuOpen: true });
  }

  render() {
    console.log(this.props);
    const homeClasses = classnames(this.props.className, {
      'bg-lightRed c-red': (this.props.location.pathname === '/about' || this.props.location.pathname === '/contact')
    })


    const {
      children,
      data
    } = this.props;

    return (
      <div className={ homeClasses }>
        <Helmet title="Home | BC–OA" />
        <Headroom>
          <HeaderNav visible={ this.state.menuOpen } toggleMenu={ this.toggleMenu } />
        </Headroom>
        <FixedLogo />
        <main>{children()}</main>
        <footer>
          <div className="container grid-12col" style={{ outline: "1px solid red" }}>
            <div className="f-footer-b colSpan-6" style={{ flex: 4 }}>
              <h2>
                Breitner<br />Ciaccia–<br />Office of<br />Architecture
              </h2>
            </div>
            <div className="f-footer-b colSpan-3" style={{ flex: 1, padding: "0 1rem", outline: "1px solid red" }}>
              <b>Contact</b>
              <a href="https://goo.gl/maps/cxWiP9aLg6v">
                <address className="f-footer-b">
                  { data.contactJson.address.street },
                  {" "}
                  { data.contactJson.address.street2 }
                  <br />
                  { data.contactJson.address.city }, { data.contactJson.address.state }{" "}
                  { data.contactJson.address.zip }
                  <br />
                </address>
              </a>
              –
              <div>
                <a href={ `mailto:${ data.contactJson.email } ` }>
                  { data.contactJson.email }
                </a>
              </div>
              <div>
                <a href={ `tel:${ data.contactJson.phone } ` }>
                  { data.contactJson.phone }
                </a>
              </div>
            </div>
            <div className="f-footer-b colSpan-3" style={{ flex: 1, padding: "0 1rem", outline: "1px solid red" }}>
              <b>Social</b>
              <div>
                <a href={`http://instagram.com/${ data.contactJson.instagram }`}>
                  Instagram
                </a>
              </div>
              <div>
                <a href={ `http://facebook.com/${ data.contactJson.facebook } ` }>
                  Facebook
                </a>
              </div>
              <p>@ BC–OA {new Date().getFullYear()}</p>
            </div>
          </div>
        </footer>
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