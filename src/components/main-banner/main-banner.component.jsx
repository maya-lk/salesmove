import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectMainBanner } from '../../redux/common/common.selectors';

import SearchForm from '../search/search.component';

import './main-banner.styles.scss';

const MainBanner = ({ mainBanner }) => (
    <div className="mainBannerWrap">
        <span className="imageOverlay" style={{ backgroundImage : `url(${mainBanner})` }}></span>
        <div className="searchWrap">
            <SearchForm />
        </div>
    </div>
);

const mapStateToProps = createStructuredSelector({
    mainBanner : selectMainBanner
})

export default connect(mapStateToProps)(MainBanner);