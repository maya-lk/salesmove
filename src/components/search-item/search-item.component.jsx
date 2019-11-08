import React from 'react';
import { connect } from 'react-redux';

import { setClickedItem , setItemModalToggle , setInquiryModalToggle } from '../../redux/advertisements/advertisements.actions';

import './search-item.styles.scss';

const SearchItem = ({ item , setClickedItem , setItemModalToggle , setInquiryModalToggle }) => (
    <div className="searchItem">
        <div className="topWrap d-flex">
            <div className="country">
                {
                    (item.country_flag)?
                    <img src={item.country_flag} alt={item.country}/>
                    : ''
                }
                {item.country}               
            </div>
            <div className="time" dangerouslySetInnerHTML={{__html: item.time }} />
            <div className="type">{item.type}</div>
        </div>
        <div className="content">
            <h3>{item.title}</h3>
            {item.specifications}
        </div>
        <div className="bottomWrap">
            <span 
                onClick={() => {
                    setClickedItem(item);
                    setItemModalToggle();
                }}
                className="btn viewBtn"
            >View Ad</span>
            <span 
                className="btn inqueryBtn" 
                onClick={() => {
                    setClickedItem(item);
                    setInquiryModalToggle();
                }}
            >Inquiry Now</span>
        </div>
    </div>
);

const mapDispatchToProps = dispatch => ({
    setClickedItem : (item) => dispatch(setClickedItem(item)),
    setItemModalToggle : () => dispatch(setItemModalToggle()),
    setInquiryModalToggle : () => dispatch(setInquiryModalToggle())
});

export default connect(null, mapDispatchToProps)(SearchItem);