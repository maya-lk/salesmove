import React from 'react';
import { Link } from 'react-router-dom';

import './header.styles.scss';

const Header = () => (
    <div className="headerWrap">
        <div className="topWrap">
            <div className="container d-flex justify-content-end">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-item" to="/how-to-post-ads">HOW TO POST ADS</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-item" to="/contact-us">CONTACT US</Link>
                    </li>
                </ul>
            </div>
        </div>
        <div className="bottomWrap">
            <div className="container d-flex justify-content-between">
                <Link to="/" className="navbar-brand"></Link>
            </div>
        </div>
    </div>
);

export default Header;