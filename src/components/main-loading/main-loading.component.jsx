import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { css } from '@emotion/core';
import BounceLoader from 'react-spinners/BounceLoader';

import { selectMainLoading } from '../../redux/common/common.selectors';

import './main-loading.styles.scss';

const override = css`
    display: block;
    margin: 0 auto;
`;

const MainLoadingScreen = ({ mainLoading }) => (
    <div className="mainLoadingScreen">
        <BounceLoader
          css={override}
          sizeUnit={"px"}
          size={100}
          color={'#43a0ff'}
          loading={mainLoading}
        />
    </div>
);

const mapStateToProps = createStructuredSelector({
    mainLoading : selectMainLoading
})

export default connect(mapStateToProps)(MainLoadingScreen);