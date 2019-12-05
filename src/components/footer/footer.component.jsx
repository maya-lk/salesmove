import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter , faFacebookF , faInstagram , faYoutube } from '@fortawesome/free-brands-svg-icons';

import { selectFooterAbout , selectSocialMedia } from '../../redux/common/common.selectors';

import './footer.styles.scss';

const Footer = ({ footerAbout , socialMedia }) => (
    <div className="footerWrap">
        <div className="topFooterWrap">
            <div className="container d-flex justify-content-between flex-wrap">
                <div className="footerBox footerAbout col-md-5 col-12">
                    <div dangerouslySetInnerHTML={{ __html: footerAbout }}/>
                    <ul className="nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/page/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/page/services">Services</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/page/contact">Contact</Link>
                        </li> */}
                    </ul>
                </div>
                <div className="footerBox footerLinks col-md-4 col-12"></div>
                <div className="footerBox footerSocial col-md-3 col-12">
                    {
                        (socialMedia)?
                        (
                            <ul className="navbar-nav socialMedia">
                                <li className="nav-item"><a href={socialMedia.facebook} className="nav-link facebook" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookF} /></a></li>
                                <li className="nav-item"><a href={socialMedia.instagram} className="nav-link instagram" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a></li>
                                <li className="nav-item"><a href={socialMedia.twitter} className="nav-link twitter" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /></a></li>
                                <li className="nav-item"><a href={socialMedia.youtube} className="nav-link youtube" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faYoutube} /></a></li>
                            </ul>
                        )
                        : ''
                    } 
                    <div className="copyright">ALL RIGHTS RESERVED 2019</div>
                </div>
            </div>
        </div>
        <div className="bottomFooterWrap">
            <div className="container text-right">
                <span className="creator">Website By <a href="https://www.maya.lk" target="_blank" rel="noopener noreferrer">Maya</a></span>
            </div>
        </div>
    </div>
);

const mapStateToProps = createStructuredSelector({
    footerAbout : selectFooterAbout,
    socialMedia : selectSocialMedia,
});

export default connect(mapStateToProps)(Footer);