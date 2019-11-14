import React from 'react';

import API from '../../lib/api';

import './contact-us.styles.scss';

class ContactUs extends React.Component {

    constructor(){
        super()
        this.state = {
            fname: '',
            contactNo : '',
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
        const { fname , contactNo , message } = this.state;

        if( fname === '' || contactNo === '' || message === '' ){
            this.setState({ error : 'All fields required.' });
        }else{
            this.setState({ error : null });

            const formData = new FormData();
            formData.append('fname',fname);
            formData.append('contactNo',contactNo);
            formData.append('message',message);

            API.post("contact", formData)
            .then(response => {
                //console.log('response' , response.data);
                if( response.data.status ){
                    this.setState({ success : response.data.msg });
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
        return(
            <div className="contactUsWrap">
                <h3>Partner With Us</h3>
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

export default ContactUs;