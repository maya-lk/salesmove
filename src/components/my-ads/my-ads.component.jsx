import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectMyAds } from '../../redux/user/user.selectors';

import MyAdItem from '../my-ad-item/my-ad-item.component';
import SearchItemLoader from '../content-loader/content-loader.component';

import './my-ads.styles.scss';

const MyAds = ({ myAds }) => (
    <div className="accountContent">
        <div className="titleBar">My Advertisements</div>
        <div className="myAdsWrap">
            {
                (myAds)?
                myAds
                .filter( ad => ad.status === 'publish' )
                .map( ad => <MyAdItem key={ad.ID} item={ad} /> )
                : <SearchItemLoader/>
            }
        </div>
    </div>
);

const mapStateToProps = createStructuredSelector({
    myAds : selectMyAds,
})

export default connect(mapStateToProps)(MyAds);