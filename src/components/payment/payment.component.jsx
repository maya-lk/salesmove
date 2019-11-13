import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import API from '../../lib/api';

import LoadingScreen from '../loading/loading.component';
import PaymentsList from '../paymets-list/paymets-list.component';

import { selectUserDetails } from '../../redux/user/user.selectors';

import { setPaymentsDetails } from '../../redux/user/user.actions';

import './payment.styles.scss';

class Payment extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            errors: null,
            success : null,
            paymentSlip : null,
            isLoading: false
        }
    }

    handleMedia = event => {
        this.setState({ paymentSlip: event.target.files });

        /* let files = Array.from(event.target.files);

        files.forEach((file) => {
            let reader = new FileReader();
            reader.onloadend = () => {
                this.setState({    
                    imagesPreviewUrls: [...this.state.imagesPreviewUrls, reader.result]
                });
            }
            reader.readAsDataURL(file);
        }); */
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { paymentSlip } = this.state;
        const { userDetails , setPaymentsDetails } = this.props;
        
        this.setState({ isLoading : true });

        const formData = new FormData();
        formData.append('slip',paymentSlip[0]);
        formData.append('userID',userDetails.user_id);
    
        API.post("upload-slip", formData ,{
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(response => {
            //console.log('response' , response.data);
            if( response.data.status ){
                var successMessage = response.data.message;

                API.get(`payments?userid=${userDetails.user_id}`)
                .then(res => {
                    setPaymentsDetails(res.data);
                })

                this.setState({ 
                    success : successMessage,
                    paymentSlip : null,
                });
            }else{
                this.setState({ errors : response.data.message });
            }

            this.setState({ isLoading : false });
            
        }).catch(err => {
            //console.log('err' , err);
        });

    }

    render(){
        const { errors , success , isLoading } = this.state;
        return(
            <div className="paymentWrap accountContent">
                {
                    (isLoading)?
                    (<LoadingScreen />)
                    : ''
                }
                <div className="titleBar">Payments</div>
                {
                    (errors)?
                    (<div className="alert alert-danger" role="alert">{errors}</div>)
                    : (success)?
                    (<div className="alert alert-success" role="alert">{success}</div>)
                    : ''
                }
                <form onSubmit={this.handleSubmit}> 

                    <h5>Upload Payment Slip</h5>

                    <div className="form-group">
                        <input type="file" name="paymentSlip" id="paymentSlip" className="inputfile" onChange={this.handleMedia} required/>
                        <label htmlFor="paymentSlip"><figure><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg></figure> <span>Choose slip file&hellip;</span></label>
                    </div>

                    <div className="buttons">
                        <input type="submit" value="Upload" className="btn submitBtn" />
                    </div>                  
                </form>
                <PaymentsList />
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    userDetails: selectUserDetails
});

const mapDispatchToProps = dispatch => ({
    setPaymentsDetails : (payments) => dispatch(setPaymentsDetails(payments))
})

export default connect(mapStateToProps , mapDispatchToProps)(Payment);