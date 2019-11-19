import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ReactFancyBox from 'react-fancybox'

import { selectPaymentsDetails } from '../../redux/user/user.selectors';

import './paymets-list.styles.scss';
import 'react-fancybox/lib/fancybox.css'

const PaymentsList = ({ payments }) => (
    <div className="paymentsListWrap">
        {
            (payments)?
            (<h4>Payment List</h4>)
            : ''
        }
        <div className="paymentsListsWrap d-flex flex-wrap row">
            {
                (payments)?
                payments.map(payment => <div key={payment.ID} className="paymentOuter col-md-4 col-12">
                    <div className="payment">
                        <ReactFancyBox
                        thumbnail={payment.slip}
                        image={payment.slip}/>
                        <div className="date">{payment.date}</div>
                    </div>
                </div>)
                : ''
            }
        </div>
    </div>
);

const mapStateToProps = createStructuredSelector({
    payments: selectPaymentsDetails
});

export default connect(mapStateToProps)(PaymentsList);