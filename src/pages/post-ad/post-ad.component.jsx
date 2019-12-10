import React from 'react';
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Select from 'react-virtualized-select';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import Swal from 'sweetalert2';

import API from '../../lib/api';
import { CountryOptionRenderer } from '../../lib/utils';

import ImagePreview from '../../components/image-preview/image-preview.component';
import LoadingScreen from '../../components/loading/loading.component';

import { selectServiceCategory , selectCountyObj } from '../../redux/common/common.selectors';
import { selectAdPostingLoading } from '../../redux/advertisements/advertisements.selectors';
import { selectUserDetails } from '../../redux/user/user.selectors';

import { setAdPostingLoading } from '../../redux/advertisements/advertisements.actions';

import './post-ad.styles.scss';
import 'react-day-picker/lib/style.css';

class PostAdComponent extends React.Component {

    constructor(){
        super()

        this.state = {
            type : '',
            title: '',
            terms : [],
            country : '',
            specifications : '',
            quantity : '',
            price: '',
            shippingTerms : '',
            destinationPort : '',
            otherSpecificRequrements : '',
            addDisplayPeriod : new Date(),
            images : [],
            imagesPreviewUrls : [],
            isSubmit : false
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

    renderTerms(){
        const { serviceTerms } = this.props;
        
        return (serviceTerms)? serviceTerms.map(term => 
            <FormCheck key={term.ID} className="col-md-6 col-12">
                <FormCheck.Input type="checkbox" name="term" onChange={this.toggleCheckbox} id={term.ID} value={term.ID} />
                <FormCheck.Label htmlFor={term.ID}>{term.name}</FormCheck.Label>
            </FormCheck>) : ''

    }

    handleDayChange(day) {
        this.setState({ addDisplayPeriod: day });
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { setAdPostingLoading , userDetails } = this.props;        
        const { 
            type, 
            title, 
            terms , 
            country, 
            specifications, 
            quantity,
            price,
            shippingTerms, 
            destinationPort, 
            otherSpecificRequrements,
            addDisplayPeriod,
            images
        } = this.state;

        setAdPostingLoading();

        const formData = new FormData();
        formData.append('type',type);
        formData.append('title',title);
        formData.append('terms',terms);
        formData.append('country', country.value );
        formData.append('countryFlag',country.flagPath);
        formData.append('specifications',specifications);
        formData.append('quantity',quantity);
        formData.append('price',price);
        formData.append('shippingTerms',shippingTerms);
        formData.append('destinationPort',destinationPort);
        formData.append('otherSpecificRequrements',otherSpecificRequrements);
        formData.append('addDisplayPeriod',addDisplayPeriod);
        formData.append('userID',userDetails.user_id);

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
            if( response.data.status ){
                this.setState({ 
                    type : '',
                    title: '',
                    terms : [],
                    country : '',
                    specifications : '',
                    quantity : '',
                    price : '',
                    shippingTerms : '',
                    destinationPort : '',
                    otherSpecificRequrements : '',
                    addDisplayPeriod : new Date(),
                    images : [],
                    imagesPreviewUrls : [] 
                });
                Swal.fire({
                    icon: 'success',
                    title: `${response.data.message}`,
                    text: 'Your add will be published after reviewing within 24 hours.',
                });
            }else{
                Swal.fire({
                    icon: 'error',
                    title: `${response.data.message}`,
                    text: 'Please try again',
                });
            }
            
            setAdPostingLoading();
            
        }).catch(err => {
            //console.log('err' , err);
        });

    }

    render(){
        const { countries , isLoading } = this.props;
        const { imagesPreviewUrls } = this.state;
        return(
            <div className="postNewAdWrap">
                {
                    (isLoading)?
                    (<LoadingScreen />)
                    : ''
                }
                <div className="container">

                    <h1>Post New Advertisement</h1>
                    <form onSubmit={this.handleSubmit}>

                        <div className="form-group">
                            <Form.Check
                                type="radio"
                                label="Buy"
                                id="want"
                                name="type"
                                onChange={this.handleChange}
                                value="Buy"
                            />
                            <Form.Check
                                type="radio"
                                label="Sell"
                                id="offer"
                                name="type"
                                onChange={this.handleChange}
                                value="Sell"
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
                            <label>Name of  Product or sevices</label>
                            <div className="d-flex flex-wrap">{this.renderTerms()}</div>
                        </div>

                        <div className="form-group">
                            <label>The County/Countries we sell /buy</label>
                            <Select
                                labelKey='value'
                                onChange={(country) => (country) ? this.setState({ country }) : this.setState({ country : '' })}
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
                            <label>Price per Unit</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="price"
                                onChange={this.handleChange}
                                value={this.state.price}
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
                            <label>Shipping/Destination Port</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="destinationPort"
                                onChange={this.handleChange}
                                value={this.state.destinationPort}
                            />
                        </div>

                        <div className="form-group">
                            <label>Other Specific Requirements</label>
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
                            <input type="file" name="images" id="images" className="inputfile" onChange={this.handleMedia} multiple/>
                            <label htmlFor="images"><figure><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg></figure> <span>Choose images&hellip;</span></label>
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
    serviceTerms : selectServiceCategory,
    countries : selectCountyObj,
    isLoading : selectAdPostingLoading,
    userDetails: selectUserDetails
});

const mapDispatchToProps = dispatch => ({
    setAdPostingLoading : () => dispatch(setAdPostingLoading())
})

export default connect(mapStateToProps , mapDispatchToProps)(PostAdComponent);