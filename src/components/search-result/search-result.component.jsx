import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { 
    selectAllAds , 
    selectSearchItemParam , 
    selectWantParam , 
    selectCategoryParam ,
    selectCountryParam,
    selectItemModalToggle
} from '../../redux/advertisements/advertisements.selectors';

import SearchItem from '../search-item/search-item.component';
import ItemModalOverview from '../item-modal-overview/item-modal-overview.component';

import './search-result.styles.scss';

class SearchResults extends React.Component {
    render(){
        const { ads , want , categoryParam , searchItem , country , toggleItemModal } = this.props;

        const filteredOptions = ( want && categoryParam && searchItem && country && ads ) ?
            ads.filter( (ad) => (want)? ad.type.toLowerCase() === want.toLowerCase() : '' )
            .filter( (ad) => (categoryParam)? ad.category.toLowerCase() === categoryParam.toLowerCase() : '' )
            .filter( (ad) => (searchItem)? ad.title.toLowerCase().includes(searchItem.toLowerCase()) : '' )
            .filter( (ad) => (country)? ad.country.toLowerCase() === country.toLowerCase() : '' )

            : ( want && categoryParam && searchItem && ads ) ?
            ads.filter( (ad) => (want)? ad.type.toLowerCase() === want.toLowerCase() : '' )
            .filter( (ad) => (categoryParam)? ad.category.toLowerCase() === categoryParam.toLowerCase() : '' )
            .filter( (ad) => (searchItem)? ad.title.toLowerCase().includes(searchItem.toLowerCase()) : '' )

            : ( want && categoryParam && ads ) ?
            ads.filter( (ad) => (want)? ad.type.toLowerCase() === want.toLowerCase() : '' )
            .filter( (ad) => (categoryParam)? ad.category.toLowerCase() === categoryParam.toLowerCase() : '' )

            : ( want && ads ) ?
            ads.filter( (ad) => (want)? ad.type.toLowerCase() === want.toLowerCase() : '' )

            : ( categoryParam && ads ) ?
            ads.filter( (ad) => (categoryParam)? ad.category.toLowerCase() === categoryParam.toLowerCase() : '' )

            : ( searchItem && ads ) ?
            ads.filter( (ad) => (searchItem)? ad.title.toLowerCase().includes(searchItem.toLowerCase()) : '' )

            : ( country && ads ) ? 
            ads.filter( (ad) => (country)? ad.country.toLowerCase() === country.toLowerCase() : '' )
            
            : (ads) ?
            ads
            : []
        
        return(
            <div className="searchResultsWrap">        
                <div className="countBar">
                Showing <span>{filteredOptions.length}</span> results
                    {
                        searchItem?
                        <span> for "{searchItem}"</span>
                        : ''
                    }            
                </div>
                <div className="searchItemsWrap d-flex justify-content-between flex-wrap">
                    {   
                        (filteredOptions.length)?
                        filteredOptions.map( ad => <SearchItem key={ad.ID} item={ad} /> )
                        : <h2>No Results Found</h2>
                    }           
                </div>
                {
                    (toggleItemModal)?
                    <ItemModalOverview />
                    : ''
                }
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    ads : selectAllAds,
    want : selectWantParam,
    categoryParam : selectCategoryParam,
    searchItem : selectSearchItemParam,
    country : selectCountryParam,
    toggleItemModal : selectItemModalToggle,
})

export default connect(mapStateToProps)(SearchResults);