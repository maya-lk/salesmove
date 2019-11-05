import React from 'react';
import { Link } from 'react-router-dom';

import './sidebar.styles.scss';

const Sidebar = () => (
    <div className="sidebarWrap">
        <h3>Categories</h3>
        <div className="list-group">
            <Link to="/search/products" className="list-group-item list-group-item-action">Products <span className="count"></span></Link>
            <Link to="/search/services" className="list-group-item list-group-item-action">Services</Link>
            <Link to="/search/investments" className="list-group-item list-group-item-action">Investments</Link>
            <div className="list-group-item list-group-item-action btnWrap">
                <Link to="/" className="btn">Want(Buy)</Link>
                <Link to="/" className="btn offer">Offer(Sell)</Link>
            </div>
        </div>
    </div>
);

export default Sidebar;