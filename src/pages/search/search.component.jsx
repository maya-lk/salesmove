import React from 'react';

import MainBanner from '../../components/main-banner/main-banner.component';
import Sidebar from '../../components/sidebar/sidebar.component';
import SearchResults from '../../components/search-result/search-result.component';
import LatestListings from '../../components/latest-listing/latest-listing.component';

import './search.styles.scss';

const SearchPage = () => (
    <div className="searchPageWrap">        
        <MainBanner />
        <div className="container d-flex justify-content-between flex-wrap">
            <Sidebar />
            <SearchResults />
        </div>
        <LatestListings />
    </div>
);

export default SearchPage;