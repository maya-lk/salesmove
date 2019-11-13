import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';

import API , { accountAPI } from '../../lib/api';

import { selectSigninModalHidden } from '../../redux/common/common.selectors';
import { toggleSigninHidden , toggleSignupHidden , toggleForgotPasswordHidden } from '../../redux/common/common.actions';
import { setUser , setUserError , setMyAds } from '../../redux/user/user.actions';

import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor(){
        super();
        this.state = {
            email : '',
            password: '',
            error: null
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { setUser , setUserError , toggleSigninHidden , history , setMyAds } = this.props;
        const { email , password } = this.state;

        let user = {
            username: email,
            password: password
        };

        accountAPI.post("token", user)
        .then(response => {
            console.log('res' , response.data);
            if (typeof response.data.token !== 'undefined') {
                setUser(response.data);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("email", response.data.user_email);
                localStorage.setItem("userID", response.data.user_id);
                localStorage.setItem("displayName", response.data.user_display_name);

                API.get(`my-ads?userid=${response.data.user_id}`)
                .then(function(response){
                    setMyAds(response.data);
                    toggleSigninHidden();
                    history.push('/account/my-ads');
                });
            }
        }).catch(err => {
            console.log('err' , err);
            setUserError(err);
            this.setState({ error : 'Password/Username incorrect, Please check and try again.' });
        });

    }

    handleChange = event => {
        const { name , value } = event.target;
        this.setState({ [name] : value });
    }

    handleRegister = () => {
        const { toggleSigninHidden , toggleSignupHidden } = this.props;
        toggleSigninHidden();
        toggleSignupHidden();
    }

    handleForgotPassword = () => {
        const { toggleSigninHidden , toggleForgotPasswordHidden } = this.props;
        toggleSigninHidden();
        toggleForgotPasswordHidden();
    }

    render(){
        const { error } = this.state;
        return(
            <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={this.props.loginModal} onHide={this.props.toggleSigninHidden}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Sign In
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        (error)?
                        (<div className="alert alert-danger" role="alert">{error}</div>)
                        : ''
                    }
                    <form onSubmit={this.handleSubmit}>

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
                            <input type="submit" value="Sign In" className="btn submitBtn" />
                        </div>
                        <div className="linkUrl" onClick={this.handleRegister}>Don't you have an Account?</div>
                        <div className="linkUrl" onClick={this.handleForgotPassword}>Forgot Password</div>                
                    </form>
                </Modal.Body>
            </Modal>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    toggleSignupHidden : () => dispatch(toggleSignupHidden()),
    toggleSigninHidden : () => dispatch(toggleSigninHidden()),
    setUser: (user) => dispatch(setUser(user)),
    setUserError: (error) => dispatch(setUserError(error)),
    setMyAds : (myAds) => dispatch(setMyAds(myAds)),
    toggleForgotPasswordHidden : () => dispatch(toggleForgotPasswordHidden()),
})

const mapStateToProps = createStructuredSelector({
    loginModal : selectSigninModalHidden
});

export default withRouter(connect(mapStateToProps , mapDispatchToProps)(SignIn));