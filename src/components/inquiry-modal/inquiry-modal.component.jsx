import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Select from 'react-virtualized-select';

import API from '../../lib/api';
import { CountryOptionRenderer } from '../../lib/utils';

import { setInquiryModalToggle } from '../../redux/advertisements/advertisements.actions';
import { selectClickedItem , selectInquiryModalToggle } from '../../redux/advertisements/advertisements.selectors';
import { selectCountyObj } from '../../redux/common/common.selectors';

import './inquiry-modal.styles.scss';

class InquiryModal extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            adTitle : this.props.clickedItem.title,
            adID : this.props.clickedItem.ID,
            userEmail: this.props.clickedItem.userEmail,
            fname : '',
            email : '',
            contactNo : '',
            message : '',
            quantity : '',
            shippingTerms : '',
            price: '',
            country : '',
            errors: null,
            success: null
        }
    }

    handleChange = event => {
        event.preventDefault();
        const { name , value } = event.target;
        this.setState({ [name] : value });
    }

    handleSubmit = event => {
        event.preventDefault();
        const { adTitle , adID , fname , email , contactNo , message , quantity , shippingTerms , price, country , userEmail } = this.state;

        if( adTitle === '' || adID === '' || fname === '' || email === '' || contactNo === '' || message === '' ){
            this.setState({ errors : 'All fields Required.' });
        }else {
            const formData = new FormData();
            formData.append('adTitle',adTitle);
            formData.append('adID',adID);
            formData.append('fname',fname);
            formData.append('email',email);
            formData.append('contactNo',contactNo);
            formData.append('message',message);
            formData.append('quantity',quantity);
            formData.append('shippingTerms',shippingTerms);
            formData.append('price',price);
            formData.append('country',country);
            formData.append('userEmail',userEmail);
        
            API.post("inquiry", formData ,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then(response => {
                //console.log('response' , response.data);
                if( response.data.status ){
                    this.setState({ 
                        success : response.data.message,
                        adTitle : '',
                        adID : '',
                        fname : '',
                        email : '',
                        contactNo : '',
                        message : '',
                        quantity : '',
                        shippingTerms : '',
                        price: '',
                        country : '',
                        userEmail : ''
                    });
                }else{
                    this.setState({ errors : response.data.message });
                }
            }).catch(err => {
                //console.log('err' , err);
            });
        }
    }

    render(){
        const { toggleInquiryModal , setInquiryModalToggle , countries } = this.props;
        const { adTitle , fname , email , contactNo , message , errors , success } = this.state;
        return(
            <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={toggleInquiryModal} 
                onHide={setInquiryModalToggle} 
                className="inquiryModal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Inquiry Now</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        (errors)?
                        (<div className="alert alert-danger" role="alert">{errors}</div>)
                        : (success)?
                        (<div className="alert alert-success" role="alert">{success}</div>)
                        : ''
                    }
                    <form onSubmit={this.handleSubmit}>

                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Advertisement Title"
                                name="adTitle"
                                value={adTitle}
                                onChange={this.handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control"
                                placeholder="Quantity"
                                name="quantity"
                                onChange={this.handleChange}
                                value={this.state.quantity}
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="text" 
                                placeholder="Shipping Terms"
                                className="form-control"
                                name="shippingTerms"
                                onChange={this.handleChange}
                                value={this.state.shippingTerms}
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="text" 
                                placeholder="Ex: USD 10"
                                className="form-control"
                                name="price"
                                onChange={this.handleChange}
                                value={this.state.price}
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Full Name"
                                name="fname"
                                value={fname}
                                onChange={this.handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="email"
                                className="form-control"
                                placeholder="Email Address"
                                name="email"
                                value={email}
                                onChange={this.handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Contact Number"
                                name="contactNo"
                                value={contactNo}
                                onChange={this.handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <Select
                                labelKey='value'
                                onChange={(country) => (country && country.value !== 'All Country') ? this.setState({ country : country.value }) : this.setState({ country : '' })}
                                optionRenderer={CountryOptionRenderer}
                                options={countries}
                                value={this.state.country}
                                valueKey='value'
                                name="country"
                                placeholder="Country"
                            />
                        </div>

                        <div className="form-group">
                            <textarea 
                                className="form-control"
                                placeholder="Message"
                                name="message"
                                value={message}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <input type="submit" value="Inquiry" className="btn submitBtn" />
                        </div>

                    </form>
                </Modal.Body>
            </Modal>
        )
    }

}

const mapStateToProps = createStructuredSelector({
    clickedItem : selectClickedItem,
    toggleInquiryModal : selectInquiryModalToggle,
    countries : selectCountyObj,
});

const mapDispatchToProps = dispatch => ({
    setInquiryModalToggle : () => dispatch(setInquiryModalToggle())
});

export default connect(mapStateToProps , mapDispatchToProps)(InquiryModal);