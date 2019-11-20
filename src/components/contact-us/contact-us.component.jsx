import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Select from 'react-virtualized-select';

import API from '../../lib/api';
import { CountryOptionRenderer } from '../../lib/utils';

import { selectCountyObj } from '../../redux/common/common.selectors';

import './contact-us.styles.scss';

class ContactUs extends React.Component {

    constructor(){
        super()
        this.state = {
            fname: '',
            contactNo : '',
            email: '',
            country : '',
            message: '',
            error: null,
            success: null,
        }
    }

    handalChange = event => {
        const { name , value } = event.target;
        this.setState({ [name] : value });
    }

    handalSubmit = event => {
        event.preventDefault();
        const { fname , contactNo , message , email , country } = this.state;

        if( fname === '' || contactNo === '' || message === '' || email === '' || country === '' ){
            this.setState({ error : 'All fields required.' });
        }else{
            this.setState({ error : null });

            const formData = new FormData();
            formData.append('fname',fname);
            formData.append('contactNo',contactNo);
            formData.append('email',email);
            formData.append('country',country.value);
            formData.append('message',message);

            API.post("contact", formData)
            .then(response => {
                //console.log('response' , response.data);
                if( response.data.status ){
                    this.setState({ 
                        success : response.data.msg,
                        fname: '',
                        contactNo : '',
                        email: '',
                        country : '',
                        message: '', 
                    });
                }else{
                    this.setState({ error : response.data.msg });
                }

                this.setState({ fname : '' , contactNo : '' , message : ''  });
            }).catch(err => {
                //console.log('err' , err);
            });
        }

    }

    render(){
        const { error , success } = this.state;
        const { countries } = this.props;
        return(
            <div className="contactUsWrap">
                <h3>Partner With Us</h3>
                <p>If you  want to be a partner with saleseazy team fill below form (Freelance SalesEazy Country representatives, Product certification bodies, Export, and Import Service providers, Consultants, International Exhibition Organizers, and B2B services providers)</p>
                <form onSubmit={this.handalSubmit}>

                    {
                        (error)?
                        <div className="alert alert-danger" role="alert">{error}</div>
                        : (success)?
                        <div className="alert alert-success" role="alert">{success}</div>
                        : ''
                    }

                    <div className="form-group">
                        <input 
                            type="text" 
                            name="fname" 
                            id="fname" 
                            className="form-control" 
                            placeholder="Name"
                            onChange={this.handalChange}
                            value={this.state.fname}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            name="contactNo" 
                            id="contactNo" 
                            className="form-control" 
                            placeholder="Contact Number"
                            onChange={this.handalChange}
                            value={this.state.contactNo}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            className="form-control" 
                            placeholder="Email Address"
                            onChange={this.handalChange}
                            value={this.state.email}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <Select
                            labelKey='value'
                            onChange={(country) => (country) ? this.setState({ country }) : this.setState({ country : '' })}
                            optionRenderer={CountryOptionRenderer}
                            options={countries}
                            value={this.state.country}
                            valueKey='value'
                            name="country"
                            placeholder="Country"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <textarea 
                            name="message" 
                            id="message" 
                            className="form-control" 
                            placeholder="Message"
                            onChange={this.handalChange}
                            value={this.state.message}
                            required
                        />
                    </div>
                    <div className="form-group mb-0 btnsWrap">
                        <input type="submit" value="Submit" className="btn submitBtn"/>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    countries : selectCountyObj
});

export default connect(mapStateToProps)(ContactUs);