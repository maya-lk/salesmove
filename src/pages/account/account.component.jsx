import React from 'react';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';

import AccountSidebar from '../../components/account-sidebar/account-sidebar.component';
import Profile from '../../components/profile/profile.component';
import MyAds from '../../components/my-ads/my-ads.component';

import './account.styles.scss';

const AccountPage = ({ match }) => (
    <div className="accountPageWrap">
        <div className="container d-flex justify-content-between flex-wrap">
            <AccountSidebar />
            {
                ( match.params.accId && match.params.accId === 'profile' )?
                <Route path="/account/profile" component={Profile} />
                : ( match.params.accId && match.params.accId === 'my-ads' )?
                <Route path="/account/my-ads" component={MyAds} />
                : ''
            }             
        </div>
    </div>
);

export default withRouter(AccountPage);