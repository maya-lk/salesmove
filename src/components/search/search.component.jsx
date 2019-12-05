import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Select from 'react-virtualized-select';
import { withRouter } from 'react-router-dom';

import thIcon from '../../assets/images/th-icon.png';

import { selectCountyObj , selectServiceCategory } from '../../redux/common/common.selectors';
import { setWantParam , setCategoryParam , setSearchItemParam , setCountryParam } from '../../redux/advertisements/advertisements.actions';
import { selectWantParam , selectCategoryParam , selectSearchItemParam , selectCountryParam } from '../../redux/advertisements/advertisements.selectors';

import { CountryOptionRenderer } from '../../lib/utils';

import './search.styles.scss';
import './react-select.css';
import 'react-virtualized-select/styles.css';

class SearchForm extends React.Component {
    
    constructor(){
        super();
        this.state = {
            multiValue: [],
        }
        this.handleMultiChange = this.handleMultiChange.bind(this);
    }

    handleMultiChange(option) {
        this.setState(state => {
          return {
            multiValue: option
          };
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        this.props.history.push(`/search`);
    }

    render(){
        const { 
            countries , 
            want , 
            category , 
            searchItem , 
            country , 
            setWantParam , 
            setCategoryParam , 
            setSearchItemParam , 
            setCountryParam,
            serviceTerms
        } = this.props;

        return(
            <form className="searchForm" onSubmit={this.handleSubmit}>
                <div className="labelWrap">I/We</div>
                <div className="form-group">
                    <Select
                        labelKey='value'
                        onChange={(want) => (want)? setWantParam(want.value) : setWantParam('')}
                        options={[
                            { value: 'Buy' },
                            { value: 'Sell' }
                        ]}
                        value={want}
                        valueKey='value'
                        name="want"
                    />
                </div>
                <div className="input-group category">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <img src={thIcon} alt="th icon"/>
                        </span>
                    </div>
                    <select 
                        name="category" 
                        id="category"
                        onChange={(event) => setCategoryParam(event.target.value)}
                        className="form-control"
                        value={category}
                    >
                        <option value="">All Category</option>
                        {
                            (serviceTerms) ?
                            (serviceTerms.map( serviceTerm => <option key={serviceTerm.ID} value={serviceTerm.name}>{serviceTerm.name}</option> ))
                            : ''
                        }
                    </select>
                </div>
                <div className="form-group item">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="What are you looking for?" 
                        aria-label="What are you looking for?"
                        name="searchItem"
                        onChange={(event) => setSearchItemParam(event.target.value)}
                        value={searchItem}
                    />
                </div>
                <div className="input-group country">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                        </span>
                    </div>
                    <Select
                        labelKey='value'
                        onChange={(conty) => (conty) ? setCountryParam(conty) : setCountryParam('')}
                        optionRenderer={CountryOptionRenderer}
                        options={countries}
                        value={country}
                        valueKey='value'
                        name="country"
                        placeholder="From"
                        multi
                        simpleValue
                    />
                </div>
                <div className="submitWrap">
                    <input type="submit" value="Search Now" className="btn searchSubmit"/>
                </div>
            </form>
        )
    }

}

const mapStateToProps = createStructuredSelector({
    countries : selectCountyObj,
    want : selectWantParam,
    category : selectCategoryParam,
    searchItem : selectSearchItemParam,
    country : selectCountryParam,
    serviceTerms : selectServiceCategory,
});

const mapDispatchToProps = dispatch => ({
    setWantParam : (want) => dispatch(setWantParam(want)),
    setCategoryParam : (category) => dispatch(setCategoryParam(category)),
    setSearchItemParam : (searchItem) => dispatch(setSearchItemParam(searchItem)),
    setCountryParam : (country) => dispatch(setCountryParam(country)),
});

export default withRouter(connect(mapStateToProps , mapDispatchToProps)(SearchForm));