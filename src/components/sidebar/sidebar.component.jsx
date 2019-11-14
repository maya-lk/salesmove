import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { 
    selectAllAds,
    selectCategoryParam,
    selectWantParam , 
    selectSearchItemParam,
    selectCountryParam
} from '../../redux/advertisements/advertisements.selectors';
import { selectServiceCategory } from '../../redux/common/common.selectors';

import { setWantParam , setCategoryParam } from '../../redux/advertisements/advertisements.actions';

import './sidebar.styles.scss';

const Sidebar = ({ categoryParam , setWantParam , setCategoryParam , serviceTerms }) => {
    return(
        <div className="sidebarWrap">
            <h3>Categories</h3>
            <div className="list-group">
                {
                    (categoryParam)?
                    <span className="list-group-item list-group-item-action" onClick={ () => setCategoryParam('') }>All</span>
                    : ''
                }

                {
                    (serviceTerms) ?
                    (serviceTerms.map( term => <span key={term.ID} className="list-group-item list-group-item-action" onClick={ () => setCategoryParam(term.name) }>{term.name}</span> ))
                    : ''
                }
                <div className="list-group-item list-group-item-action btnWrap">
                    <span className="btn" onClick={ () => setWantParam('Buy') }>Buy</span>
                    <span className="btn offer" onClick={ () => setWantParam('Sell') }>Sell</span>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    ads : selectAllAds,
    category : selectCategoryParam,
    want : selectWantParam,
    searchItem : selectSearchItemParam,
    country : selectCountryParam,
    serviceTerms : selectServiceCategory,
})

const mapDispatchToProps = dispatch => ({
    setWantParam : (want) => dispatch(setWantParam(want)),
    setCategoryParam : (category) => dispatch(setCategoryParam(category))
});

export default connect(mapStateToProps , mapDispatchToProps)(Sidebar);