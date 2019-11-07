import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser , faBookReader } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import './account-sidebar.styles.scss';

const AccountSidebar = () => (
    <div className="accountSidebar">
        <h3>My Account</h3>
        <div className="list-group">
            <Link to="/account/profile" className="list-group-item list-group-item-action">
                <span className="icon"><FontAwesomeIcon icon={faUser} /></span> Profile
            </Link>
            <Link to="/account/my-ads" className="list-group-item list-group-item-action">
                <span className="icon"><FontAwesomeIcon icon={faBookReader} /></span>My Ads
            </Link>
        </div>
    </div>
);

export default AccountSidebar;