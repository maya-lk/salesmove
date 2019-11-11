import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectAllAds } from '../../redux/advertisements/advertisements.selectors';

import SearchItem from '../search-item/search-item.component';
import SearchItemLoader from '../content-loader/content-loader.component';

import './latest-listing.styles.scss';

const LatestListings = ({ ads }) => (
    <div className="latestListingWrap">
        <div className="container">
            <h2>Latest <span>Listings</span></h2>
            <div className="latestItemsWrap d-flex justify-content-between flex-wrap">
                {
                    (ads)?
                    ads.filter((item , idx) => idx < 3)
                    .map( ad => <SearchItem key={ad.ID} item={ad} /> )
                    : <SearchItemLoader/>
                }
            </div>
        </div>
    </div>
);

const mapStateToProps = createStructuredSelector({
    ads : selectAllAds
})

export default connect(mapStateToProps)(LatestListings);