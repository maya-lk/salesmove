import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectSigninModalHidden } from '../../redux/common/common.selectors';
import { toggleSigninHidden } from '../../redux/common/common.actions';

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
        //const { email , password } = this.state;

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
    toggleSigninHidden : () => dispatch(toggleSigninHidden())
})

const mapStateToProps = createStructuredSelector({
    loginModal : selectSigninModalHidden
});

export default connect(mapStateToProps , mapDispatchToProps)(SignIn);