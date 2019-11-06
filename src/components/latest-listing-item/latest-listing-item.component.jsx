import React from 'react';
import { Link } from 'react-router-dom';

import './latest-listing-item.styles.scss';

const LatestListingItem = ({ item }) => (
    <div className="listingItem">
        <Link to={`/advertisements/${item.slug}`} />
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

export default LatestListingItem;