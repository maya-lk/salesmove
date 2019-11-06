import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { 
    selectAllProductsCount , 
    selectAllServicesCount , 
    selectAllInvestmentCount 
} from '../../redux/advertisements/advertisements.selectors';

import './sidebar.styles.scss';

const Sidebar = ({ productCount , serviceCount , investmentCount }) => (
    <div className="sidebarWrap">
        <h3>Categories</h3>
        <div className="list-group">
            <Link to="/search/products" className="list-group-item list-group-item-action">Products <span className="count">({productCount.length})</span></Link>
            <Link to="/search/services" className="list-group-item list-group-item-action">Services <span className="count">({serviceCount.length})</span></Link>
            <Link to="/search/investments" className="list-group-item list-group-item-action">Investments <span className="count">({investmentCount.length})</span></Link>
            <div className="list-group-item list-group-item-action btnWrap">
                <span className="btn">Want(Buy)</span>
                <span className="btn offer">Offer(Sell)</span>
            </div>
        </div>
    </div>
);

const mapStateToProps = createStructuredSelector({
    productCount : selectAllProductsCount,
    serviceCount : selectAllServicesCount,
    investmentCount : selectAllInvestmentCount
})

export default connect(mapStateToProps)(Sidebar);