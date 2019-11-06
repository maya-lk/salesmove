import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';

import { selectAllAds } from '../../redux/advertisements/advertisements.selectors';

import SearchItem from '../search-item/search-item.component';
import SearchItemLoader from '../content-loader/content-loader.component';

import './search-result.styles.scss';

const SearchResults = ({ ads , match }) => (
    <div className="searchResultsWrap">
        <div className="countBar">Showing 4 results for "tea"</div>
        <div className="searchItemsWrap d-flex justify-content-between flex-wrap">
            {
                ( match.params.category && match.params.category === 'products' && ads ) ?
                    ads.filter( (ad) => ad.category === 'products' )
                    .map( ad => <SearchItem key={ad.ID} item={ad} /> )
                    : ( match.params.category && match.params.category === 'services' && ads ) ?
                    ads.filter( (ad) => ad.category === 'services' )
                    .map( ad => <SearchItem key={ad.ID} item={ad} /> )
                    : ( match.params.category && match.params.category === 'investments' && ads ) ?
                    ads.filter( (ad) => ad.category === 'investments' )
                    .map( ad => <SearchItem key={ad.ID} item={ad} /> )
                    : <SearchItemLoader />
            }           
        </div>
    </div>
);

const mapStateToProps = createStructuredSelector({
    ads : selectAllAds
})

export default withRouter(connect(mapStateToProps)(SearchResults));