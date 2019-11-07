import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';

import { 
    selectAllAds , 
    selectSearchItemParam , 
    selectWantParam , 
    selectCategoryParam ,
    selectCountryParam,
    selectItemModalToggle
} from '../../redux/advertisements/advertisements.selectors';

import SearchItem from '../search-item/search-item.component';
import SearchItemLoader from '../content-loader/content-loader.component';
import ItemModalOverview from '../item-modal-overview/item-modal-overview.component';

import './search-result.styles.scss';

const SearchResults = ({ ads , match , want , categoryParam , searchItem , country , toggleItemModal }) => (
    <div className="searchResultsWrap">
        <div className="countBar">
            Showing 
            {
                (ads)?
                <span> {ads.length} results</span>
                : ''
            }
            {
                searchItem?
                <span> for "{searchItem}"</span>
                : ''
            }            
        </div>
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
                
                //Filters
                : ( want && categoryParam && searchItem && country && ads ) ?
                ads.filter( (ad) => (want)? ad.type.toLowerCase() === want.toLowerCase() : '' )
                .filter( (ad) => (categoryParam)? ad.category.toLowerCase() === categoryParam.toLowerCase() : '' )
                .filter( (ad) => (searchItem)? ad.title.toLowerCase().includes(searchItem.toLowerCase()) : '' )
                .filter( (ad) => (country)? ad.country.toLowerCase() === country.toLowerCase() : '' )
                .map( ad => <SearchItem key={ad.ID} item={ad} /> )

                : ( want && categoryParam && searchItem && ads ) ?
                ads.filter( (ad) => (want)? ad.type.toLowerCase() === want.toLowerCase() : '' )
                .filter( (ad) => (categoryParam)? ad.category.toLowerCase() === categoryParam.toLowerCase() : '' )
                .filter( (ad) => (searchItem)? ad.title.toLowerCase().includes(searchItem.toLowerCase()) : '' )
                .map( ad => <SearchItem key={ad.ID} item={ad} /> )

                : ( want && categoryParam && ads ) ?
                ads.filter( (ad) => (want)? ad.type.toLowerCase() === want.toLowerCase() : '' )
                .filter( (ad) => (categoryParam)? ad.category.toLowerCase() === categoryParam.toLowerCase() : '' )
                .map( ad => <SearchItem key={ad.ID} item={ad} /> )

                : ( want && ads ) ?
                ads.filter( (ad) => (want)? ad.type.toLowerCase() === want.toLowerCase() : '' )
                .map( ad => <SearchItem key={ad.ID} item={ad} /> )

                : ( categoryParam && ads ) ?
                ads
                .filter( (ad) => (categoryParam)? ad.category.toLowerCase() === categoryParam.toLowerCase() : '' )
                .map( ad => <SearchItem key={ad.ID} item={ad} /> )

                : ( searchItem && ads ) ?
                ads
                .filter( (ad) => (searchItem)? ad.title.toLowerCase().includes(searchItem.toLowerCase()) : '' )
                .map( ad => (ad)? <SearchItem key={ad.ID} item={ad} /> : console.log('test') )

                : ( country && ads ) ?
                ads
                .filter( (ad) => (country)? ad.country.toLowerCase() === country.toLowerCase() : '' )
                .map( ad => <SearchItem key={ad.ID} item={ad} /> )

                : (ads)?
                ads.map( ad => <SearchItem key={ad.ID} item={ad} /> )
                : <SearchItemLoader />
            }           
        </div>
        {
            (toggleItemModal)?
            <ItemModalOverview />
            : ''
        }
    </div>
);

const mapStateToProps = createStructuredSelector({
    ads : selectAllAds,
    want : selectWantParam,
    categoryParam : selectCategoryParam,
    searchItem : selectSearchItemParam,
    country : selectCountryParam,
    toggleItemModal : selectItemModalToggle,
})

export default withRouter(connect(mapStateToProps)(SearchResults));