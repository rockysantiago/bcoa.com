import React, { Fragment } from 'react';
import Link from "gatsby-link";
import { icons } from "./Icons";
import { consolidateStreamedStyles } from 'styled-components';

export default ({ visible, toggleMenu }) => {
  return (
    <div>
      <header className={visible ? 'c-white' : ''}>
        <div className="container">
          <p style={{ flex: "1" }}>
            <a href="/">Breitner Ciaccia–Office of Architecture</a>
          </p>
          <button className="header-menuButton" onClick={toggleMenu}>
            <span className="hide">{visible ? "Close Menu" : "Open Menu"}</span>
            {visible ? icons["x-mark"] : icons.hamburger}
          </button>
        </div>
      </header>
      {visible &&
        <nav className="menu f-navigation" style={{ backgroundImage: `url(http://placehold.it/1920/1080)` }}>
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
      }
    </div>
  )
}
