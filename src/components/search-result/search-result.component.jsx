import React from 'react';

import SearchItem from '../search-item/search-item.component';

import './search-result.styles.scss';

const SearchResults = () => (
    <div className="searchResultsWrap">
        <div className="countBar">Showing 4 results for "tea"</div>
        <div className="searchItemsWrap d-flex justify-content-between flex-wrap">
            <SearchItem />
        </div>
    </div>
);

export default SearchResults;