import React from 'react';
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Select from 'react-virtualized-select';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import ImageUploader from 'react-images-upload';

import API from '../../lib/api';

import { 
    selectProductCategory , 
    selectServiceCategory , 
    selectInvestmentCategory , 
    selectCountyObj 
} from '../../redux/common/common.selectors';

import './post-ad.styles.scss';
import 'react-day-picker/lib/style.css';

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

class PostAdComponent extends React.Component {

    constructor(){
        super()

        this.state = {
            type : '',
            title: '',
            category : '',
            terms : [],
            country : '',
            specifications : '',
            quantity : '',
            shippingTerms : '',
            destinationPort : '',
            otherSpecificRequrements : '',
            addDisplayPeriod : new Date(),
            images : [],
        }

        this.onDrop = this.onDrop.bind(this);
        this.handleDayChange = this.handleDayChange.bind(this);
    }

    handleChange = event => {
        const { name , value } = event.target;
        this.setState({ [name] : value });
    }

    toggleCheckbox = (event) => {
        const { terms } = this.state;
        const item = event.target.value;
        let newArr = [];
    
        if (!terms.includes(item)) {
            newArr = [...terms, item];
        } else {
          newArr = terms.filter(a => a !== item);
        }
        this.setState({ terms: newArr }, () => console.log('updated state', newArr))
    };

    renderTerms(params){
        const { productTerms , serviceTerms , invenstmentTerms } = this.props;
        switch (params) {
            case 'products':
                return productTerms.map(term => 
                <FormCheck key={term.ID}>
                    <FormCheck.Input type="checkbox" name="term" onChange={this.toggleCheckbox} id={term.ID} value={term.ID} />
                    <FormCheck.Label for={term.ID}>{term.name}</FormCheck.Label>
                </FormCheck>)
            case 'services':
                return serviceTerms.map(term => 
                <FormCheck key={term.ID}>
                    <FormCheck.Input type="checkbox" name="term" onChange={this.toggleCheckbox} id={term.ID} value={term.ID} />
                    <FormCheck.Label for={term.ID}>{term.name}</FormCheck.Label>
                </FormCheck>)
            case 'investments':
                return invenstmentTerms.map(term => 
                <FormCheck key={term.ID}>
                    <FormCheck.Input type="checkbox" name="term" onChange={this.toggleCheckbox} id={term.ID} value={term.ID} />
                    <FormCheck.Label for={term.ID}>{term.name}</FormCheck.Label>
                </FormCheck>)
            default:
                break;
        }
    }

    handleDayChange(day) {
        this.setState({ addDisplayPeriod: day });
    }

    onDrop(image) {
        this.setState({
            images: this.state.images.concat(image),
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { 
            type, 
            title, 
            category, 
            terms , 
            country, 
            specifications, 
            quantity, 
            shippingTerms, 
            destinationPort, 
            otherSpecificRequrements,
            addDisplayPeriod,
            images 
        } = this.state;

        const newAd = {
            'type' : type,
            'title' : title,
            'category' : category,
            'terms' : terms,
            'country' : country,
            'specifications' : specifications,
            'quantity' : quantity,
            'shippingTerms' : shippingTerms,
            'destinationPort' : destinationPort,
            'otherSpecificRequrements' : otherSpecificRequrements,
            'addDisplayPeriod' : addDisplayPeriod,
            'images' : images
        };

        API.post("post-ad", newAd )
        .then(response => {
            console.log('response' , response);
        }).catch(err => {
            //console.log('err' , err);
        });

    }

    render(){
        const categories = [ 'products' , 'services' , 'investments' ];
        const { countries } = this.props;
        return(
            <div className="postNewAdWrap">
                <div className="container">
                    <h1>Post New Advertisement</h1>
                    <form onSubmit={this.handleSubmit}>

                        <div className="form-group">
                            <Form.Check
                                type="radio"
                                label="Want"
                                id="want"
                                name="type"
                                onChange={this.handleChange}
                                value="Want"
                            />
                            <Form.Check
                                type="radio"
                                label="Offer"
                                id="offer"
                                name="type"
                                onChange={this.handleChange}
                                value="Offer"
                            />
                        </div>

                        <div className="form-group">
                            <label>Advertisement Title</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="title"
                                onChange={this.handleChange}
                                value={this.state.title}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label for="category">Category</label>
                            <select
                                id="category"
                                name="category"
                                className="form-control"
                                onChange={this.handleChange}
                                required
                                value={this.state.category}
                            >
                                <option value="">Select Category</option>
                                {
                                    categories.map( category => <option key={category} >{category}</option> )
                                }
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Name of  Product or sevices</label>
                            {this.renderTerms(this.state.category)}
                        </div>

                        <div className="form-group">
                            <label>Looking For Supplers from</label>
                            <Select
                                labelKey='value'
                                onChange={(country) => this.setState({ country })}
                                optionRenderer={CountryOptionRenderer}
                                options={countries}
                                value={this.state.country}
                                valueKey='value'
                                name="country"
                                placeholder="Country"
                            />
                        </div>

                        <div className="form-group">
                            <label>Specifications (Size,Materials, Packaging Terms etc)</label>
                            <textarea 
                                className="form-control"
                                onChange={this.handleChange}
                                value={this.state.specifications}
                                name="specifications"
                            />
                        </div>

                        <div className="form-group">
                            <label>Quantity</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="quantity"
                                onChange={this.handleChange}
                                value={this.state.quantity}
                            />
                        </div>

                        <div className="form-group">
                            <label>Shipping Terms</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="shippingTerms"
                                onChange={this.handleChange}
                                value={this.state.shippingTerms}
                            />
                        </div>

                        <div className="form-group">
                            <label>Destination Port</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="destinationPort"
                                onChange={this.handleChange}
                                value={this.state.destinationPort}
                            />
                        </div>

                        <div className="form-group">
                            <label>Other Specific Requrements</label>
                            <textarea 
                                className="form-control"
                                onChange={this.handleChange}
                                value={this.state.otherSpecificRequrements}
                                name="otherSpecificRequrements"
                            />
                        </div>

                        <div className="form-group">
                            <label>Add Display Period</label>
                            <DayPickerInput 
                                onDayChange={this.handleDayChange} 
                            />
                        </div>

                        <div className="form-group">
                            <label>Images</label>
                            <ImageUploader
                                withPreview={true}
                                withIcon={true}
                                buttonText='Choose images'
                                onChange={this.onDrop}
                                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                maxFileSize={5242880}
                            />
                        </div>

                        <div className="form-group text-right btnsWrap">
                            <input type="submit" value="Add New Ad" className="btn submitBtn"/>
                        </div>

                    </form>
                </div>
            </div>
        )
    }

}

const mapStateToProps = createStructuredSelector({
    productTerms : selectProductCategory,
    serviceTerms : selectServiceCategory,
    invenstmentTerms : selectInvestmentCategory,
    countries : selectCountyObj
})

export default connect(mapStateToProps)(PostAdComponent);