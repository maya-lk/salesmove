import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { 
    selectAllAds , 
    selectSearchItemParam , 
    selectWantParam , 
    selectCategoryParam ,
    selectCountryParam,
    selectItemModalToggle,
    selectInquiryModalToggle
} from '../../redux/advertisements/advertisements.selectors';

import SearchItem from '../search-item/search-item.component';
import ItemModalOverview from '../item-modal-overview/item-modal-overview.component';
import InquiryModal from '../inquiry-modal/inquiry-modal.component';

import './search-result.styles.scss';

class SearchResults extends React.Component {
    render(){
        const { ads , want , categoryParam , searchItem , country , toggleItemModal , toggleInquiryModal } = this.props;

        const filteredOptions = ( want && categoryParam && searchItem && country && ads ) ?
            ads.filter( (ad) => (want)? ad.type.toLowerCase() === want.toLowerCase() : '' )
            .filter( (ad) => (categoryParam)? ad.terms.find(term => term.name === categoryParam) : '' )
            .filter( (ad) => (searchItem)? ad.title.toLowerCase().includes(searchItem.toLowerCase()) : '' )
            .filter( (ad) => 
                (country.length > 0 && !country.includes('All Countries')) ? 
                country.find( conty => ( conty.toLowerCase() === ad.country.toLowerCase() || ad.country.toLowerCase() === 'all countries') ) 
                : ad 
            )

            : ( want && categoryParam && searchItem && ads ) ?
            ads.filter( (ad) => (want)? ad.type.toLowerCase() === want.toLowerCase() : '' )
            .filter( (ad) => (categoryParam)? ad.terms.find(term => term.name === categoryParam) : '' )
            .filter( (ad) => (searchItem)? ad.title.toLowerCase().includes(searchItem.toLowerCase()) : '' )

            : ( want && categoryParam && ads ) ?
            ads.filter( (ad) => (want)? ad.type.toLowerCase() === want.toLowerCase() : '' )
            .filter( (ad) => (categoryParam)? ad.terms.find(term => term.name === categoryParam) : '' )

            : ( want && searchItem && ads ) ?
            ads.filter( (ad) => (want)? ad.type.toLowerCase() === want.toLowerCase() : '' )
            .filter( (ad) => (searchItem)? ad.title.toLowerCase().includes(searchItem.toLowerCase()) : '' )

            : ( want && country && ads ) ?
            ads.filter( (ad) => (want)? ad.type.toLowerCase() === want.toLowerCase() : '' )
            .filter( (ad) => 
                (country.length > 0 && !country.includes('All Countries')) ? 
                country.find( conty => ( conty.toLowerCase() === ad.country.toLowerCase() || ad.country.toLowerCase() === 'all countries') ) 
                : ad 
            )

            : ( want && ads ) ?
            ads.filter( (ad) => (want)? ad.type.toLowerCase() === want.toLowerCase() : '' )

            : ( categoryParam && searchItem && ads ) ?
            ads
            .filter( (ad) => (categoryParam)? ad.terms.find(term => term.name === categoryParam) : '' )
            .filter( (ad) => (searchItem)? ad.title.toLowerCase().includes(searchItem.toLowerCase()) : '' )

            : ( categoryParam && country && ads ) ?
            ads
            .filter( (ad) => (categoryParam)? ad.terms.find(term => term.name === categoryParam) : '' )
            .filter( (ad) => 
                (country.length > 0 && !country.includes('All Countries')) ? 
                country.find( conty => ( conty.toLowerCase() === ad.country.toLowerCase() || ad.country.toLowerCase() === 'all countries') ) 
                : ad 
            )

            : ( categoryParam && ads ) ?
            ads
            .filter( (ad) => (categoryParam)? ad.terms.find(term => term.name === categoryParam) : '' )

            : ( searchItem && country && ads ) ?
            ads.filter( (ad) => (searchItem)? ad.title.toLowerCase().includes(searchItem.toLowerCase()) : '' )
            .filter( (ad) => 
                (country.length > 0 && !country.includes('All Countries')) ? 
                country.find( conty => ( conty.toLowerCase() === ad.country.toLowerCase() || ad.country.toLowerCase() === 'all countries') ) 
                : ad 
            )

            : ( searchItem && ads ) ?
            ads.filter( (ad) => (searchItem)? ad.title.toLowerCase().includes(searchItem.toLowerCase()) : '' )

            : ( country && ads ) ? 
            ads
            .filter( (ad) => 
                (country.length > 0 && !country.includes('All Countries')) ? 
                country.find( conty => ( conty.toLowerCase() === ad.country.toLowerCase() || ad.country.toLowerCase() === 'all countries') ) 
                : ad 
            )
            
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
                <ReactCSSTransitionGroup
                    transitionName="messageout"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                    className="searchItemsWrap d-flex justify-content-between flex-wrap"
                >
                {   
                    (filteredOptions.length)?
                    filteredOptions.map( ad => <SearchItem key={ad.ID} item={ad} /> )
                    : <h2>No Results Found</h2>
                } 
                </ReactCSSTransitionGroup>
                {
                    (toggleItemModal)?
                    <ItemModalOverview />
                    : ''
                }
                {
                    (toggleInquiryModal)?
                    <InquiryModal />
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
    toggleInquiryModal : selectInquiryModalToggle
})

export default connect(mapStateToProps)(SearchResults);