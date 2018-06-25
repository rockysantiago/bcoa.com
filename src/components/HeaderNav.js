import React, { Fragment } from 'react';
import Link from "gatsby-link";
import { icons } from "./Icons";

const Menu = ({ visible, menuBG, toggleMenu }) => (
  <nav  className={`menu f-navigation ${visible ? 'visible' : ''}`}
        style={{ backgroundImage: `url("${menuBG}")` }}
  >
    <ul className="c-white">
      <li>
        <Link to="/#featured" onClick={toggleMenu}>Featured</Link>
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
);

const headerLogoClick = (visible, toggleMenu) => {
  if (visible) { toggleMenu() };
}

export default ({ visible, toggleMenu, isWindowLarge, menuBackground }) => {
  return (
    <div>
      <header className={visible ? 'c-white bg-transparent' : ''}>
        <div className="container">
          <div className="flex-1">
            <Link className="headerLogo" onClick={ () => headerLogoClick(visible, toggleMenu) } to="/">{isWindowLarge ? icons.menuLogoLarge : icons.menuLogoSmall}</Link>
          </div>
          <div className={`header-menuButton ${visible ? 'isActive' : ''}`} onClick={toggleMenu}>
            <div className="line lineExterior"></div>
            <div className="line lineInterior lineInterior-1"></div>
            <div className="line lineInterior lineInterior-2"></div>
            <div className="line lineExterior"></div>
          </div>
        </div>
      </header>
      <Menu visible={visible} menuBG={menuBackground} toggleMenu={toggleMenu} />
    </div>
  )
}