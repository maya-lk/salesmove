import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLock , faKey , faSignOutAlt , faUserCog } from '@fortawesome/free-solid-svg-icons';
import { faTwitter , faFacebookF , faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import { withRouter } from 'react-router';

import { accountAPI } from '../../lib/api';

import SignIn from '../sign-in/sign-in.component';
import SignUp from '../sign-up/sign-up.component';

import { selectSiteLogo , selectSocialMedia } from '../../redux/common/common.selectors';
import { toggleSigninHidden , toggleSignupHidden } from '../../redux/common/common.actions';
import { selectUserDetails } from '../../redux/user/user.selectors';
import { signOutUser } from '../../redux/user/user.actions';

import './header.styles.scss';

const Header = ({ logo , socialMedia , toggleSigninHidden , toggleSignupHidden , userDetails , signOutUser , history }) => {
    
    const handalSignout = () => {
        accountAPI.post("token/revoke", {}, {
            headers: {"Authorization": "Bearer " + userDetails.token
        }})
        .then(response => {
            //Clear local storage
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            signOutUser(null);
            history.push('/');
        }).catch(err => {
            
        })
    }

    return(
        <div className="headerWrap">
            <div className="topWrap">
                <div className="container d-flex justify-content-end">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/how-to-post-ads">HOW TO POST ADS</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact-us">CONTACT US</Link>
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
                        {
                            (userDetails)?
                            (<ul className="navbar-nav accountWrap">                        
                                <li className="nav-item">
                                    <span className="nav-link" onClick={handalSignout}>
                                        <span><FontAwesomeIcon icon={faSignOutAlt} /></span>
                                        Sign Out
                                    </span>
                                </li>
                                <Dropdown as="li" className="nav-item">
                                    <Dropdown.Toggle as="span" id="dropdown-basic" className="nav-link">
                                        <span><FontAwesomeIcon icon={faUserCog} /></span>
                                        My Account
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Link to="/account/profile" className="dropdown-item">Profile</Link>
                                        <Link to="/account/my-ads" className="dropdown-item">My Ads</Link>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </ul>)
                            : (<ul className="navbar-nav accountWrap">                        
                            <li className="nav-item">
                                <span className="nav-link" onClick={toggleSigninHidden}>
                                    <span><FontAwesomeIcon icon={faKey} /></span>
                                    Sign In
                                </span>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link" onClick={toggleSignupHidden}>
                                    <span><FontAwesomeIcon icon={faUserLock} /></span>
                                    Sign Up
                                </span>
                            </li>
                        </ul>)
                        }
                        {
                            (userDetails)?
                            '' : <SignIn />
                        }
                        {
                            (userDetails)?
                            '' : <SignUp />
                        }
                        {
                            (socialMedia)?
                            (
                                <ul className="navbar-nav socialMedia">
                                    <li className="nav-item"><a href={socialMedia.linkedin} className="nav-link linkedin" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedinIn} /></a></li>
                                    <li className="nav-item"><a href={socialMedia.twitter} className="nav-link twitter" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /></a></li>
                                    <li className="nav-item"><a href={socialMedia.facebook} className="nav-link facebook" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookF} /></a></li>
                                </ul>
                            )
                            : ''
                        } 
                        {
                            (userDetails)?
                            <Link className="btn postAdBtn" to="/post-new-ad">Post Free Ad Now</Link>
                            : <span className="btn postAdBtn" onClick={toggleSigninHidden}>Post Free Ad Now</span>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    toggleSigninHidden : () => dispatch(toggleSigninHidden()),
    toggleSignupHidden : () => dispatch(toggleSignupHidden()),
    signOutUser : (user) => dispatch(signOutUser(user))
})

const mapStateToProps = createStructuredSelector({
    logo : selectSiteLogo,
    socialMedia : selectSocialMedia,
    userDetails : selectUserDetails
});

export default withRouter(connect(mapStateToProps , mapDispatchToProps)(Header));