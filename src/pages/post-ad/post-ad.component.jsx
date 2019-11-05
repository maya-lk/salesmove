import React from 'react';
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Select from 'react-virtualized-select';
import DayPickerInput from 'react-day-picker/DayPickerInput';

import API from '../../lib/api';

import ImagePreview from '../../components/image-preview/image-preview.component';

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
            imagesPreviewUrls : [],
            message: ''
        }

        this.handleDayChange = this.handleDayChange.bind(this);
    }

    handleChange = event => {
        const { name , value } = event.target;
        this.setState({ [name] : value });
    }

    handleMedia = event => {
        this.setState({ images: [...this.state.images, ...event.target.files] });

        let files = Array.from(event.target.files);

        files.forEach((file) => {
            let reader = new FileReader();
            reader.onloadend = () => {
                this.setState({    
                    imagesPreviewUrls: [...this.state.imagesPreviewUrls, reader.result]
                });
            }
            reader.readAsDataURL(file);
        });
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

        const formData = new FormData();
        formData.append('type',type);
        formData.append('title',title);
        formData.append('category',category);
        formData.append('terms',terms);
        formData.append('country',country.value);
        formData.append('countryFlag',country.flagPath);
        formData.append('specifications',specifications);
        formData.append('quantity',quantity);
        formData.append('shippingTerms',shippingTerms);
        formData.append('destinationPort',destinationPort);
        formData.append('otherSpecificRequrements',otherSpecificRequrements);
        formData.append('addDisplayPeriod',addDisplayPeriod);

        console.log('country' , country);

        var imgLeng = images.length;
        for (let index = 0; index < imgLeng; index++) {
            formData.append('images[]',images[index]);
        }

        API.post("post-ad", formData ,{
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(response => {
            //console.log('response' , response.data);
            this.setState({ message : response.data });
        }).catch(err => {
            //console.log('err' , err);
        });

    }

    render(){
        const categories = [ 'products' , 'services' , 'investments' ];
        const { countries } = this.props;
        const { imagesPreviewUrls , message } = this.state;
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
                                //required
                            />
                        </div>

                        <div className="form-group">
                            <label for="category">Category</label>
                            <select
                                id="category"
                                name="category"
                                className="form-control"
                                onChange={this.handleChange}
                                //required
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
                            <div className="imagePreviewWrap">
                                {
                                    (imagesPreviewUrls)?
                                    imagesPreviewUrls.map( (image , idx) => <ImagePreview 
                                        key={idx} 
                                        image={image} 
                                        /> )
                                    : ''
                                }
                            </div>
                            <input type="file" name="images" onChange={this.handleMedia} multiple/>
                        </div>

                        <div className="form-group text-right btnsWrap">
                            <input type="submit" value="Add New Ad" className="btn submitBtn"/>
                        </div>

                        {
                            (message.status)?
                            (<div class="alert alert-success" role="alert">{message.message}</div>)
                            : (<div class="alert alert-danger" role="alert">{message.message}</div>)
                        }

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