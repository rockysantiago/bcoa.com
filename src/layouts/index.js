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
      menuOpen: false,
    };

    this.fixedLogo = React.createRef();
  }

  handleIntersect = (e) => {
    // if (e[0].isIntersecting) {
    //   this.setState({ fixedNavPast: false })
    // } else {
    //   this.setState({ fixedNavPast: true })
    // }
  }

  createObserver = () => {
    this.observer = null;

    const options = {
      root: null,
      rootMargin: "-50%",
    };

    this.observer = new IntersectionObserver(this.handleIntersect, options);
    this.observer.observe(this.main.querySelector('.hero'));
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  toggleMenu = () => {
    this.state.menuOpen ? this.setState({ menuOpen: false }) : this.setState({ menuOpen: true });
  }

  updateDimensions = () => {
    document.body.clientWidth >= 768 ? this.setState({ isWindowLarge: true }) : this.setState({ isWindowLarge: false });
  }

  render() {
    const homeClasses = classnames(this.props.className, {
      'bg-lightRed c-red': (this.props.location.pathname.replace(/\//g, '') === 'about' || this.props.location.pathname.replace(/\//g, '') === 'contact'),
      'menuVisible': this.state.menuOpen,
    })

    const menuBackground = this.props.data.settingsJson.menuBackground;

    const {
      children,
      data
    } = this.props;

    return (
      <div className={homeClasses}>
        <Helmet title="Home | BC–OA"
          bodyAttributes={{
            class: this.state.menuOpen && 'scrollingIsDisabled'
          }}
        />
        <Headroom>
          <HeaderNav visible={this.state.menuOpen} toggleMenu={this.toggleMenu} isWindowLarge={this.state.isWindowLarge} menuBackground={menuBackground} />
        </Headroom>
        <FixedLogo fixedNavPast={this.state.fixedNavPast} />
        <main ref={(el) => { if (el) { this.main = el } }}>{children()}</main>
        <footer>
          <div className="container">
            <hr className="marginBottom-5" />
            <div className="bp-1_grid-12col marginBottom-9 bp-1_marginBottom-11 bp-2_marginBottom-41">
              <div className="f-footer-b colSpan-6 marginBottom-7">
                <h2>
                  Breitner<br />Ciaccia–<br />Office of<br />Architecture
                </h2>
              </div>
              <div className="f-footer-b colSpan-3 marginBottom-5 bp-1_marginBottom-0">
                <b>Contact</b>
                <a href="https://goo.gl/maps/cxWiP9aLg6v">
                  <address className="f-footer-b">
                    {data.contactJson.address.street},
                    {" "}
                    {data.contactJson.address.street2}
                    <br />
                    {data.contactJson.address.city}, {data.contactJson.address.state}{" "}
                    {data.contactJson.address.zip}
                    <br />
                  </address>
                </a>
                –
                <div>
                  <a href={`mailto:${data.contactJson.email} `}>
                    {data.contactJson.email}
                  </a>
                </div>
                <div>
                  <a href={`tel:${data.contactJson.phone} `}>
                    {data.contactJson.phone}
                  </a>
                </div>
              </div>
              <div className="f-footer-b colSpan-3" style={{ display: "flex", flexDirection: "column" }}
              >
                <b>Social</b>
                <div>
                  <a href={`http://instagram.com/${data.contactJson.instagram}`} target="_blank">
                    Instagram
                  </a>
                </div>
                <div style={{ flex: 1 }}>
                  <a href={`http://facebook.com/${data.contactJson.facebook} `} target="_blank">
                    Facebook
                  </a>
                </div>
                <p className="marginTop-4 bp-1_marginTop-0">@ BC–OA {new Date().getFullYear()}</p>
              </div>
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
    settingsJson {
      menuBackground
    }
  }
`;

TemplateWrapper.propTypes = {
  children: PropTypes.func
};