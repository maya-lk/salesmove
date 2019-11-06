import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Select from 'react-virtualized-select';
import { withRouter } from 'react-router-dom';

import thIcon from '../../assets/images/th-icon.png';

import { selectCountyObj } from '../../redux/common/common.selectors';
import { setWantParam , setCategoryParam , setSearchItemParam , setCountryParam } from '../../redux/advertisements/advertisements.actions';
import { selectWantParam , selectCategoryParam , selectSearchItemParam , selectCountryParam } from '../../redux/advertisements/advertisements.selectors';

import './search.styles.scss';
import './react-select.css';
import 'react-virtualized-select/styles.css';

function CountryOptionRenderer ({ focusedOption, focusedOptionIndex, focusOption, key, labelKey, option, options, selectValue, style, valueArray, valueKey }) {
  
    return (
        <div
            key={key}
            onClick={() => selectValue(option)}
            onMouseEnter={() => focusOption(option)}
            style={{ padding : '0.5rem' , cursor : 'pointer' }}
        >   
            
            <label>
                {
                    (option.flagPath)?
                    (<img
                        className="countryIcon"
                        src={option.flagPath}
                        style={{ width : '30px' , marginRight : '10px' }}
                        alt={option.value}
                    />)
                    : ''
                } 
                {option.value}
            </label>
        </div>
    )
}

class SearchForm extends React.Component {

    handleSubmit = async event => {
        event.preventDefault();

        this.props.history.push(`/search`);
    }

    render(){
        const { countries , want , category , searchItem , country } = this.props;
        const { setWantParam , setCategoryParam , setSearchItemParam , setCountryParam } = this.props;
        return(
            <form className="searchForm" onSubmit={this.handleSubmit}>
                <div className="labelWrap">I/We</div>
                <div className="form-group">
                    <Select
                        labelKey='value'
                        onChange={(want) => (want)? setWantParam(want.value) : setWantParam('')}
                        options={[
                            { value: 'want' },
                            { value: 'offer' }
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
                    <Select
                        labelKey='value'
                        onChange={(category) => (category) ? setCategoryParam(category.value) : setCategoryParam('')}
                        options={[
                            { value: 'products' },
                            { value: 'services' },
                            { value: 'investments' }
                        ]}
                        value={category}
                        valueKey='value'
                        name="category"
                        placeholder="Category"
                    />
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
                        onChange={(country) => (country) ? setCountryParam(country.value) : setCountryParam('')}
                        optionRenderer={CountryOptionRenderer}
                        options={countries}
                        value={country}
                        valueKey='value'
                        name="country"
                        placeholder="From"
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
});


const mapDispatchToProps = dispatch => ({
    setWantParam : (want) => dispatch(setWantParam(want)),
    setCategoryParam : (category) => dispatch(setCategoryParam(category)),
    setSearchItemParam : (searchItem) => dispatch(setSearchItemParam(searchItem)),
    setCountryParam : (country) => dispatch(setCountryParam(country)),
});

export default withRouter(connect(mapStateToProps , mapDispatchToProps)(SearchForm));