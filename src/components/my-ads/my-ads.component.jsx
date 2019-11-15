import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectMyAds } from '../../redux/user/user.selectors';

import MyAdItem from '../my-ad-item/my-ad-item.component';

import './my-ads.styles.scss';

const MyAds = ({ myAds }) => {

    const publishedAdFilter = myAds.filter( ad => ad.status === 'publish' );
    const pendingAdFilter = myAds.filter( ad => ad.status === 'pending' );

    console.log(publishedAdFilter);

    return(
        <div className="accountContent">
            <div className="titleBar">My Advertisements</div>
            <div className="myAdsWrap">
                <div className="advertisementWrap">
                    <h4 className="subTitle">Published Ad</h4>
                    {
                        (publishedAdFilter.length)?
                        publishedAdFilter.map( ad => <MyAdItem key={ad.ID} item={ad} /> )
                        : <h2 className="noResults">No Published Advertisements</h2>
                    }
                </div>

                <div className="advertisementWrap">
                    <h4 className="subTitle">Pending Ad</h4>
                    {
                        (pendingAdFilter.length)?
                        pendingAdFilter.map( ad => <MyAdItem key={ad.ID} item={ad} /> )
                        : <h2 className="noResults">No Pending Advertisements</h2>
                    }
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    myAds : selectMyAds,
})

export default connect(mapStateToProps)(MyAds);