import React from 'react';
import { connect } from 'react-redux';

import { setClickedItem , setItemModalToggle } from '../../redux/advertisements/advertisements.actions';

import './search-item.styles.scss';

const SearchItem = ({ item , setClickedItem , setItemModalToggle }) => (
    <div className="searchItem" onClick={() => {
        setClickedItem(item);
        setItemModalToggle();
    }}>
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
    </div>
);

const mapDispatchToProps = dispatch => ({
    setClickedItem : (item) => dispatch(setClickedItem(item)),
    setItemModalToggle : () => dispatch(setItemModalToggle())
});

export default connect(null, mapDispatchToProps)(SearchItem);