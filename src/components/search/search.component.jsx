import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Select from 'react-virtualized-select';

import thIcon from '../../assets/images/th-icon.png';

import { selectCountyObj } from '../../redux/common/common.selectors';

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

    constructor(){
        super()
        this.state = {
            country : '',
            category: '',
            want: '',
            searchItem : ''
        }
    }

    componentDidMount(){

    }

    handleChange = event => {
        const { name , value } = event.target;

        this.setState({ [name] : value });
    }

    handleSubmit = async event => {
        event.preventDefault();
    }

    render(){
        const { countries } = this.props;
        return(
            <form className="searchForm" onSubmit={this.handleSubmit}>
                <div className="labelWrap">I/We</div>
                <div className="form-group">
                    <Select
                        labelKey='value'
                        onChange={(want) => this.setState({ want })}
                        options={[
                            { value: 'want' },
                            { value: 'offer' }
                        ]}
                        value={this.state.want}
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
                        onChange={(category) => this.setState({ category })}
                        options={[
                            { value: 'products' },
                            { value: 'services' },
                            { value: 'investments' }
                        ]}
                        value={this.state.category}
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
                        onChange={this.handleChange}
                        value={this.state.searchItem}
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
                        onChange={(country) => this.setState({ country })}
                        optionRenderer={CountryOptionRenderer}
                        options={countries}
                        value={this.state.country}
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
    countries : selectCountyObj
})

export default connect(mapStateToProps)(SearchForm);