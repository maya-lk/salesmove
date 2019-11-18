import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Select from 'react-virtualized-select';

import API from '../../lib/api';
import { CountryOptionRenderer } from '../../lib/utils';

import { selectSignupModalHidden , selectCountyObj } from '../../redux/common/common.selectors';
import { toggleSignupHidden } from '../../redux/common/common.actions';

import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor(){
        super();
        this.state = {
            business: '',
            fname: '',
            email : '',
            password: '',
            contactNo: '',
            website: '',
            country: '',
            errors: null,
            success : null
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { business , fname , email , password , contactNo , website , country } = this.state;

        if( business === '' || fname === '' || email === '' || password === '' || contactNo === '' || country === '' ){
            this.setState({ errors : 'All fields Required.' });
        }else if( password.length < 6 ){
            this.setState({ errors : 'Password is too short.' });
        }else {
            const user = {
                'business' : business,
                'fname' : fname,
                'email' : email,
                'password' : password,
                'contactNo' : contactNo,
                'website' : website,
                'country' : country
            };
        
            API.post("register", user )
            .then(response => {
                //console.log('response' , response.data);
                if( response.data.status ){
                    this.setState({ success : response.data.message });
                }else{
                    this.setState({ errors : response.data.message });
                }
            }).catch(err => {
                //console.log('err' , err);
            });
        }

    }

    handleChange = event => {
        const { name , value } = event.target;
        this.setState({ [name] : value });
    }

    render(){
        const { countries } = this.props;
        const { errors , success } = this.state;
        return(
            <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={this.props.registerModal} onHide={this.props.toggleSignupHidden}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Sign Up
                    </Modal.Title>
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
                                placeholder="Name of Business"
                                name="business"
                                onChange={this.handleChange}
                                value={this.state.business}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control"
                                placeholder="Name of Contact Person"
                                name="fname"
                                onChange={this.handleChange}
                                value={this.state.fname}
                                required
                            />
                        </div>

                        <div className="form-group">
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
                            <input 
                                type="email" 
                                className="form-control"
                                placeholder="Email"
                                name="email"
                                onChange={this.handleChange}
                                value={this.state.email}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control"
                                placeholder="Tele No"
                                name="contactNo"
                                onChange={this.handleChange}
                                value={this.state.contactNo}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control"
                                placeholder="Website"
                                name="website"
                                onChange={this.handleChange}
                                value={this.state.website}
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="password" 
                                className="form-control"
                                placeholder="Password"
                                name="password"
                                onChange={this.handleChange}
                                value={this.state.password}
                                required
                            />
                        </div>
                        
                        <div className="buttons">
                            <input type="submit" value="Sign Up" className="btn submitBtn" />
                        </div>                  
                    </form>
                </Modal.Body>
            </Modal>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    toggleSignupHidden : () => dispatch(toggleSignupHidden())
})

const mapStateToProps = createStructuredSelector({
    registerModal : selectSignupModalHidden,
    countries : selectCountyObj
});

export default connect(mapStateToProps , mapDispatchToProps)(SignUp);