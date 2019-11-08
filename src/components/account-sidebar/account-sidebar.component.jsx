import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser , faBookReader } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import API from '../../lib/api';

import { setMyAds , setUserProfileDetails } from '../../redux/user/user.actions';

import './account-sidebar.styles.scss';

const AccountSidebar = ({ setMyAds , setUserProfileDetails }) => {

    const handleMyAds = () => {
        const userID = (localStorage.getItem("userID")) ? localStorage.getItem("userID") : '';
        if( userID ){
            API.get(`my-ads?userid=${userID}`)
            .then(function(response){
                setMyAds(response.data);
            });
        }
    }

    const handleProfile = () => {
        const userID = (localStorage.getItem("userID"))? localStorage.getItem("userID") : '';
        if( userID ){
            API.get(`user?userid=${userID}`)
            .then(function(response){
                setUserProfileDetails(response.data);
            });
        }
    }
    
    return(
        <div className="accountSidebar">
            <h3>My Account</h3>
            <div className="list-group">
                <Link to="/account/profile" className="list-group-item list-group-item-action" onClick={handleProfile}>
                    <span className="icon"><FontAwesomeIcon icon={faUser} /></span> Profile
                </Link>
                <Link to="/account/my-ads" className="list-group-item list-group-item-action" onClick={handleMyAds}>
                    <span className="icon"><FontAwesomeIcon icon={faBookReader} /></span>My Ads
                </Link>
            </div>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    setMyAds : (myAds) => dispatch(setMyAds(myAds)),
    setUserProfileDetails : (userProfile) => dispatch(setUserProfileDetails(userProfile)),
})

export default connect(null,mapDispatchToProps)(AccountSidebar);