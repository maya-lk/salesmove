import React from 'react';
import Select from 'react-virtualized-select';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import API from '../../lib/api';

import { selectSignupModalHidden , selectCountyObj } from '../../redux/common/common.selectors';
import { selectUserProfile } from '../../redux/user/user.selectors';

import { toggleSignupHidden } from '../../redux/common/common.actions';

import './profile.styles.scss';

class Profile extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            business: this.props.userProfile.buinessName,
            fname: this.props.userProfile.fname,
            email : this.props.userProfile.email,
            contactNo: this.props.userProfile.contactNo,
            website: this.props.userProfile.website,
            country: this.props.userProfile.country,
            userID: this.props.userProfile.userID,
            currpassword : '',
            password: '',            
            confirmPassword: '',
            errors: null,
            success : null
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { business , fname , email , password , contactNo , website , country , userID , confirmPassword , currpassword } = this.state;

        if( business === '' || fname === '' || email === '' || contactNo === '' || website === '' || country === '' ){
            this.setState({ errors : 'All fields Required.' });
        }else if( password !== confirmPassword ){
            this.setState({ errors : 'New passwords do not match!.' });
        }else {

            const formData = new FormData();
            formData.append('business',business);
            formData.append('fname',fname);
            formData.append('email',email);
            formData.append('contactNo',contactNo);
            formData.append('website',website);
            formData.append('country',country);
            formData.append('userID',userID);
            formData.append('currpassword',currpassword);
            formData.append('password',password);
            formData.append('confirmPassword',confirmPassword);
        
            API.post("profile-update", formData ,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then(response => {
                //console.log('response' , response.data);
                if( response.data.status ){
                    this.setState({ 
                        success : response.data.message,
                        currpassword : '',
                        password: '',            
                        confirmPassword: '',
                    });
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
            <div className="accountContent">
                <div className="titleBar">Profile</div>
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
                            required
                        />
                    </div>

                    <h4>Password change</h4>

                    <div className="form-group">
                        <input 
                            type="password" 
                            className="form-control"
                            placeholder="Current password (leave blank to leave unchanged)"
                            name="currpassword"
                            onChange={this.handleChange}
                            value={this.state.currpassword}
                        />
                    </div>

                    <div className="form-group">
                        <input 
                            type="password" 
                            className="form-control"
                            placeholder="New password (leave blank to leave unchanged)"
                            name="password"
                            onChange={this.handleChange}
                            value={this.state.password}
                        />
                    </div>

                    <div className="form-group">
                        <input 
                            type="password" 
                            className="form-control"
                            placeholder="Confirm new password"
                            name="confirmPassword"
                            onChange={this.handleChange}
                            value={this.state.confirmPassword}
                        />
                    </div>
                    
                    <div className="buttons">
                        <input type="submit" value="Update" className="btn submitBtn" />
                    </div>                  
                </form>
            </div>
        )
    }
}

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

const mapDispatchToProps = dispatch => ({
    toggleSignupHidden : () => dispatch(toggleSignupHidden())
})

const mapStateToProps = createStructuredSelector({
    registerModal : selectSignupModalHidden,
    countries : selectCountyObj,
    userProfile : selectUserProfile
});

export default connect(mapStateToProps , mapDispatchToProps)(Profile);