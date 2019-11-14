import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import OwlCarousel from 'react-owl-carousel';

import { selectClickedItem } from '../../redux/advertisements/advertisements.selectors';
import { setClickedItem , setItemModalToggle , setInquiryModalToggle } from '../../redux/advertisements/advertisements.actions';

import './modal-item.styles.scss';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const ModalItem = ({ clickedItem , setClickedItem , setItemModalToggle , setInquiryModalToggle }) => (
    <div className="modalItemWrap">
        <div className="topWrap d-flex">
            <div className="country">
                {
                    (clickedItem.country_flag)?
                    <img src={clickedItem.country_flag} alt={clickedItem.country}/>
                    : ''
                }
                {clickedItem.country}               
            </div>
            <div className="time" dangerouslySetInnerHTML={{__html: clickedItem.time }} />
            <div className="type">{clickedItem.type}</div>
        </div>
        <div className="content">
            {
                (clickedItem.images.length) ?
                (<OwlCarousel
                    className="owl-theme singleSlider"
                    loop
                    items={1}
                    dots={false}
                    autoplay={true}
                >
                    {
                        clickedItem.images.map( (img , idx) => <div key={idx} className="item" style={{ backgroundImage : `url(${img})` }}></div> )
                    }
                </OwlCarousel>)
                : ''
            }
            <table className="table">
                <tbody>
                    <tr>
                        <th scope="row">Specifications</th>
                        <td>{clickedItem.specifications}</td>
                    </tr>
                    <tr>
                        <th scope="row">Quantity</th>
                        <td>{clickedItem.quantity}</td>
                    </tr>
                    <tr>
                        <th scope="row">Price per unit</th>
                        <td>{clickedItem.price}</td>
                    </tr>
                    <tr>
                        <th scope="row">Shipping Terms</th>
                        <td>{clickedItem.shipping_terms}</td>
                    </tr>
                    <tr>
                        <th scope="row">Destination Port</th>
                        <td>{clickedItem.destination_port}</td>
                    </tr>
                    <tr>
                        <th scope="row">Other Specific Requrements</th>
                        <td>{clickedItem.other_specific_requrements}</td>
                    </tr>
                </tbody>
            </table>

        </div>
        <div className="bottomWrap">
            <span 
                className="btn inqueryBtn" 
                onClick={() => {
                    setClickedItem(clickedItem);
                    setItemModalToggle();
                    setInquiryModalToggle();
                }}
            >Inquiry Now</span>
        </div>
    </div>
);

const mapStateToProps = createStructuredSelector({
    clickedItem : selectClickedItem
});

const mapDispatchToProps = dispatch => ({
    setClickedItem : (item) => dispatch(setClickedItem(item)),
    setItemModalToggle : () => dispatch(setItemModalToggle()),
    setInquiryModalToggle : () => dispatch(setInquiryModalToggle())
});

export default connect(mapStateToProps , mapDispatchToProps)(ModalItem);