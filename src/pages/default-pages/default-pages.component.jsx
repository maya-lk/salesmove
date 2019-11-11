import React from 'react';
import { Route } from 'react-router-dom';

import AboutPage from '../../components/about/about.component';
import ServicesPage from '../../components/services/services.component';
import HowToPostAd from '../../components/how-to-post-ad/how-to-post-ad.component';
import Footer from '../../components/footer/footer.component';

import './default-pages.styles.scss';

const DefaultPages = ({match}) => (
    <div className="defaultPagesWrap">
        <Route path={`${match.path}/about`} component={AboutPage} />
        <Route path={`${match.path}/services`} component={ServicesPage} />
        <Route path={`${match.path}/how-to-post-ad`} component={HowToPostAd} />
        <Footer />
    </div>
);

export default DefaultPages;