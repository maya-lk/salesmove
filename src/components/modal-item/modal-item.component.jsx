import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectClickedItem } from '../../redux/advertisements/advertisements.selectors';

import './modal-item.styles.scss';

const ModalItem = ({ clickedItem }) => (
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
            {clickedItem.specifications}
        </div>
    </div>
);

const mapStateToProps = createStructuredSelector({
    clickedItem : selectClickedItem
  });

export default connect(mapStateToProps)(ModalItem);