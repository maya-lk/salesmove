import React from 'react';
import { connect } from 'react-redux';

import API from './lib/api';
import 'bootstrap/dist/css/bootstrap.min.css';

import { setSiteLogo , setSocialMedia , setMainBanner , setCountries } from './redux/common/common.actions';

import Header from './components/header/header.component';

import './App.css';

class App extends React.Component {

  componentDidMount(){
    const { setSiteLogo , setSocialMedia , setMainBanner , setCountries } = this.props;

    //Common API
    API.get('common')
    .then(function(response){
      setSiteLogo(response.data.siteLogo);
      setSocialMedia(response.data.socialMedia);
      setMainBanner(response.data.mainBanner);
      setCountries(response.data.countries);
    });

  }

  render(){
    return (
      <div className="siteWrapper">
        <Header/>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setSiteLogo : (logo) => dispatch(setSiteLogo(logo)),
  setSocialMedia : (socialMedia) => dispatch(setSocialMedia(socialMedia)),
  setMainBanner : (mainBanner) => dispatch(setMainBanner(mainBanner)),
  setCountries : (countries) => dispatch(setCountries(countries)),
});

export default connect(null , mapDispatchToProps)(App);