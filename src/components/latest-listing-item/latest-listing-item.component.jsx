import React from 'react';
import { connect } from 'react-redux';

import { setClickedItem , setInquiryModalToggle } from '../../redux/advertisements/advertisements.actions';

import './latest-listing-item.styles.scss';

const LatestListingItem = ({ item , setClickedItem  , setInquiryModalToggle }) => (
    <div className="listingItem">
        <div className="topWrap">
            {
                (item.country_flag)?
                <img src={item.country_flag} alt={item.country}/>
                : ''
            }
            {
                ( item.type === 'Want' )?
                <span>Buyer from {item.country}</span>
                : ( item.type === 'Offer' ) ?
                <span>Seller from {item.country}</span>
                : <span>{item.country}</span>
            }
            <span 
                className="btn inqueryBtn" 
                onClick={() => {
                    setClickedItem(item);
                    setInquiryModalToggle();
                }}
            >Inquiry Now</span>           
        </div>
        <div className="content">
            <h3>{item.title}</h3>
        </div>
        <div className="bottomWrap d-flex">
            <div className="time" dangerouslySetInnerHTML={{__html: item.time }} />
            <div className="type">{item.type}</div>
        </div>
    </div>
);

const mapDispatchToProps = dispatch => ({
    setClickedItem : (item) => dispatch(setClickedItem(item)),
    setInquiryModalToggle : () => dispatch(setInquiryModalToggle())
});

export default connect(null, mapDispatchToProps)(LatestListingItem);