import React from 'react';
import { Link } from 'react-router-dom';

import './search-item.styles.scss';

const SearchItem = ({ item }) => (
    <div className="searchItem">
        <Link to={`/advertisements/${item.slug}`} />
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
        </div>
    </div>
);

export default SearchItem;