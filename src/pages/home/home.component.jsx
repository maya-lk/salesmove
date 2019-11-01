import React from 'react';

import MainBanner from '../../components/main-banner/main-banner.component';

import './home.styles.scss';

class HomePage extends React.Component {

    render(){
        return(
            <div className="homePageWrap">
                <MainBanner />
            </div>
        )
    }

}

export default HomePage;