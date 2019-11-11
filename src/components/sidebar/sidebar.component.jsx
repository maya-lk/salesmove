import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { 
    selectAllAds,
    selectAllProductsCount , 
    selectAllServicesCount , 
    selectAllInvestmentCount,
    selectCategoryParam,
    selectWantParam , 
    selectSearchItemParam,
    selectCountryParam
} from '../../redux/advertisements/advertisements.selectors';
import { setWantParam , setCategoryParam } from '../../redux/advertisements/advertisements.actions';

import './sidebar.styles.scss';

const Sidebar = ({ ads , productCount , serviceCount , investmentCount , want , categoryParam , searchItem , country , setWantParam , setCategoryParam }) => {

    const productFilterCount = ( want &&  ads ) ?
            ads.filter( (ad) => (want)? ad.type.toLowerCase() === want.toLowerCase() : '' )
            .filter( (ad) => ad.category.toLowerCase() === 'products' )
            
            : productCount

    const serviceFilterCount = ( want &&  ads ) ?
            ads.filter( (ad) => (want)? ad.type.toLowerCase() === want.toLowerCase() : '' )
            .filter( (ad) => ad.category.toLowerCase() === 'services' )

            : serviceCount

    const investmentsFilterCount = ( want &&  ads ) ?
            ads.filter( (ad) => (want)? ad.type.toLowerCase() === want.toLowerCase() : '' )
            .filter( (ad) => ad.category.toLowerCase() === 'investments' )
            
            : investmentCount
    return(
    <div className="sidebarWrap">
        {searchItem}
        <h3>Categories</h3>
        <div className="list-group">
            {
                (categoryParam)?
                <span className="list-group-item list-group-item-action" onClick={ () => setCategoryParam('') }>All <span className="count">({ads.length})</span></span>
                : ''
            }
            
            <span className="list-group-item list-group-item-action" onClick={ () => setCategoryParam('products') }>Products <span className="count">({productFilterCount.length})</span></span>
            <span className="list-group-item list-group-item-action" onClick={ () => setCategoryParam('services') }>Services <span className="count">({serviceFilterCount.length})</span></span>
            <span className="list-group-item list-group-item-action" onClick={ () => setCategoryParam('investments') }>Investments <span className="count">({investmentsFilterCount.length})</span></span>
            <div className="list-group-item list-group-item-action btnWrap">
                <span className="btn" onClick={ () => setWantParam('want') }>Want(Buy)</span>
                <span className="btn offer" onClick={ () => setWantParam('offer') }>Offer(Sell)</span>
            </div>
        </div>
    </div>
)
};

const mapStateToProps = createStructuredSelector({
    ads : selectAllAds,
    productCount : selectAllProductsCount,
    serviceCount : selectAllServicesCount,
    investmentCount : selectAllInvestmentCount,
    category : selectCategoryParam,
    want : selectWantParam,
    searchItem : selectSearchItemParam,
    country : selectCountryParam,
})

const mapDispatchToProps = dispatch => ({
    setWantParam : (want) => dispatch(setWantParam(want)),
    setCategoryParam : (category) => dispatch(setCategoryParam(category))
});

export default connect(mapStateToProps , mapDispatchToProps)(Sidebar);