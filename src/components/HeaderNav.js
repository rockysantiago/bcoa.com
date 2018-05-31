import React, { Fragment } from 'react';
import Link from "gatsby-link";
import { icons } from "./Icons";
import Transition from 'react-transition-group/Transition';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 },
};

const Menu = ({ in: inProp, menuBG,toggleMenu }) => (
  <Transition in={ inProp } timeout={ duration }>
    {(state) => (
      <nav  className="menu f-navigation"
            style={{ backgroundImage: `url("${menuBG}")`,
                  ...defaultStyle,
                  ...transitionStyles[state] }}
      >
        <ul className="c-white">
          <li>
            <Link to="/" onClick={toggleMenu}>Featured</Link>
          </li>
          <li>
            <Link to="/work" onClick={toggleMenu}>Index</Link>
          </li>
          <li>
            <Link to="/news" onClick={toggleMenu}>News</Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleMenu}>About</Link>
          </li>
          <li>
            <Link to="/contact" onClick={toggleMenu}>Contact</Link>
          </li>
        </ul>
      </nav>
    )}
  </Transition>
);

export default ({ visible, toggleMenu, isWindowLarge, menuBackground }) => {
  return (
    <div>
      <header className={visible ? 'c-white bg-transparent' : ''}>
        <div className="container">
          <div className="flex-1">
            <Link className="headerLogo" to="/">{ isWindowLarge ? icons.menuLogoLarge : icons.menuLogoSmall }</Link>
          </div>
          <button className="header-menuButton" onClick={toggleMenu}>
            <span className="hide">{visible ? "Close Menu" : "Open Menu"}</span>
            {visible ? icons["x-mark"] : icons.hamburger}
          </button>
        </div>
      </header>
      {visible &&
        <Menu in={ visible } menuBG={ menuBackground } toggleMenu={ toggleMenu } />
      }
    </div>
  )
}