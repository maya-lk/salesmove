import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectSiteLogo } from '../../redux/common/common.selectors';

import './header.styles.scss';

const Header = ({ logo }) => (
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
                <Link to="/" className="navbar-brand">
                    <img src={logo} alt="Sales Moves"/>
                </Link>
                <div className="naviWrap">
                    <div className="accountWrap"></div>
                    <ul className="navbar-nav socialMedia">
                        <li className="nav-item"><a href="http://" target="_blank" rel="noopener noreferrer">#</a></li>
                    </ul>
                    <Link className="btn postAdBtn">Post Free Ad Now</Link>
                </div>
            </div>
        </div>
    </div>
);

const mapStateToProps = createStructuredSelector({
    logo : selectSiteLogo
});

export default connect(mapStateToProps)(Header);