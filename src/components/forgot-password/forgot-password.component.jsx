import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import API from '../../lib/api';

import { selectForgotPasswordModalHidden } from '../../redux/common/common.selectors';
import { toggleForgotPasswordHidden , toggleSigninHidden } from '../../redux/common/common.actions';

import './forgot-password.styles.scss';

class FotgotPassword extends React.Component {

    constructor(){
        super();
        this.state = {
            email : '',
            error: null,
            success : null
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { email } = this.state;

        this.setState({ error : null , success : null });

        const formData = new FormData();
        formData.append('username',email);

        API.post("reset-password", formData ,{
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log('response' , response.data);
            if( response.data.status ){
                this.setState({ success : response.data.message });
            }else{
                this.setState({ error : response.data.message });
            }
        }).catch(err => {
            console.log('err' , err);
            this.setState({ error : 'Username incorrect, Please check and try again.' });
        });

    }

    handleChange = event => {
        const { name , value } = event.target;
        this.setState({ [name] : value });
    }

    handleLogin = () => {
        const { toggleSigninHidden , toggleForgotPasswordHidden } = this.props;
        toggleSigninHidden();
        toggleForgotPasswordHidden();
    }

    render(){
        const { error , success } = this.state;
        return(
            <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={this.props.forgotPasswordModal} onHide={this.props.toggleForgotPasswordHidden}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Forgot Password
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        (error)?
                        (<div className="alert alert-danger" role="alert" dangerouslySetInnerHTML={{__html: error}} />)
                        : (success) ?
                        (<div className="alert alert-success" role="alert" dangerouslySetInnerHTML={{__html: success}} />)
                        : ''
                    }
                    <form onSubmit={this.handleSubmit} >

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
                        
                        <div className="buttons">
                            <input type="submit" value="Forgot Password" className="btn submitBtn" />
                        </div>               
                    </form>                    
                    <div className="linkUrl" onClick={this.handleLogin}>Back to Signin</div>
                </Modal.Body>
            </Modal>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    toggleForgotPasswordHidden : () => dispatch(toggleForgotPasswordHidden()),
    toggleSigninHidden : () => dispatch(toggleSigninHidden())
})

const mapStateToProps = createStructuredSelector({
    forgotPasswordModal : selectForgotPasswordModalHidden
});

export default connect(mapStateToProps , mapDispatchToProps)(FotgotPassword);