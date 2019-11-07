import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { css } from '@emotion/core';
import PulseLoader from 'react-spinners/PulseLoader';

import { selectAdPostingLoading } from '../../redux/advertisements/advertisements.selectors';

import './loading.styles.scss';

const override = css`
    display: block;
    margin: auto;
`;

const LoadingScreen = ({ isLoading }) => (
    <div className="loadingScreenAds">
        <PulseLoader
          css={override}
          sizeUnit={"px"}
          size={80}
          color={'#fff'}
          loading={isLoading}
        />
    </div>
);

const mapStateToProps = createStructuredSelector({
    isLoading : selectAdPostingLoading
})

export default connect(mapStateToProps)(LoadingScreen);