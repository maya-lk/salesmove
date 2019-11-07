import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { accountAPI } from '../../lib/api';

import { selectSigninModalHidden } from '../../redux/common/common.selectors';
import { toggleSigninHidden } from '../../redux/common/common.actions';
import { setUser , setUserError } from '../../redux/user/user.actions';

import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor(){
        super();
        this.state = {
            email : '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { setUser , setUserError , toggleSigninHidden } = this.props;
        const { email , password } = this.state;

        let user = {
            username: email,
            password: password
        };

        accountAPI.post("token", user)
        .then(response => {
            setUser(response.data);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", response.data.user_email);
            toggleSigninHidden();
        }).catch(err => {
            setUserError(err);
        });

    }

    handleChange = event => {
        const { name , value } = event.target;
        this.setState({ [name] : value });
    }

    render(){
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
                    </form>
                </Modal.Body>
            </Modal>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    toggleSigninHidden : () => dispatch(toggleSigninHidden()),
    setUser: (user) => dispatch(setUser(user)),
    setUserError: (error) => dispatch(setUserError(error))
})

const mapStateToProps = createStructuredSelector({
    loginModal : selectSigninModalHidden
});

export default connect(mapStateToProps , mapDispatchToProps)(SignIn);