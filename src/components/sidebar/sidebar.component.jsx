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

class Sidebar extends React.Component{
    constructor(){
        super();
        this.state = {
            activeID : ''
        }
        this.handleCategoryClick = this.handleCategoryClick.bind(this);
    }

    handleCategoryClick = term => {
        const { setCategoryParam } = this.props;
        setCategoryParam(term.name);
        this.setState({ activeID : term.ID });
    }

    handleAllCategory = () =>{
        const { setCategoryParam } = this.props;
        setCategoryParam('');
        this.setState({ activeID : '' });
    }

    render(){
        const { ads , category , setWantParam , serviceTerms } = this.props;
        return(
            <div className="sidebarWrap">
                <h3>Categories</h3>
                <div className="list-group">
                    {
                        (category)?
                        <span className="list-group-item list-group-item-action" onClick={ () => this.handleAllCategory() }>All <span className="count">({ads.length})</span></span>
                        : ''
                    }
    
                    {
                        (serviceTerms) ?
                        (serviceTerms.map( term => 
                        <span 
                            key={term.ID} 
                            className={`${ term.ID === this.state.activeID ? 'active' : '' } list-group-item list-group-item-action`} 
                            onClick={ () => this.handleCategoryClick(term) }
                        >
                            {term.name}
                            <span className="count"> ({ads.filter( (ad) => ad.terms.find(serviceTerm => serviceTerm.name === term.name) ).length})</span>
                        </span> ))
                        : ''
                    }
                    <div className="list-group-item list-group-item-action btnWrap">
                        <span className="btn" onClick={ () => setWantParam('Buy') }>Buy</span>
                        <span className="btn offer" onClick={ () => setWantParam('Sell') }>Sell</span>
                    </div>
                </div>
            </div>
        )
    }

}

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