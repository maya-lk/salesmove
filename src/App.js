import React from 'react';
import { connect } from 'react-redux';
import { Switch , Route } from 'react-router-dom';
import axios from 'axios';

import API from './lib/api';
import 'bootstrap/dist/css/bootstrap.min.css';

import { 
  setSiteLogo , 
  setSocialMedia , 
  setMainBanner , 
  setCountries , 
  setProductCategory , 
  setServiceCategory , 
  setInvestmentCategory 
} from './redux/common/common.actions';
import { setAdvertisements } from './redux/advertisements/advertisements.actions';
import { validateToken } from './redux/user/user.actions';

import Header from './components/header/header.component';
import HomePage from './pages/home/home.component';
import PostAdComponent from './pages/post-ad/post-ad.component';

import './App.css';

class App extends React.Component {

  componentDidMount(){
    const { 
      setSiteLogo , 
      setSocialMedia , 
      setMainBanner , 
      setCountries , 
      validateToken , 
      setProductCategory , 
      setServiceCategory , 
      setInvestmentCategory,
      setAdvertisements
    } = this.props;

    //Common API
    API.get('common')
    .then(function(response){
      setSiteLogo(response.data.siteLogo);
      setSocialMedia(response.data.socialMedia);
      setMainBanner(response.data.mainBanner);
      setCountries(response.data.countries);

      setProductCategory(response.data.productCategory);
      setServiceCategory(response.data.serviceCategory);
      setInvestmentCategory(response.data.investmentCategory);
    });

    let token = null, email = null;
    if(localStorage.getItem("token")){
      token = localStorage.getItem("token");
      email = localStorage.getItem("email");
    }
    if(token){
      axios.post("https://mayaprojects.net/salesmove/wp-json/simple-jwt-authentication/v1/token/validate", {},{
        headers: {"Authorization": "Bearer " + token
      }})
      .then(res => {
        if(res.data.data.status === 200){
          const userDetails = {
            token : token,
            user_email : email
          }
          validateToken(userDetails);
        }
      }).catch(err => {
        //TODO: HANDLE VALIDATION ERROR
      });
    }else{
      //TODO: HANDLE NO TOKEN
    }

    //Advertisements
    API.get('results')
    .then(function(response){
      setAdvertisements(response.data);
    });

  }

  render(){
    return (
      <div className="siteWrapper">
        <Header/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/post-new-ad" component={PostAdComponent} />
        </Switch>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setSiteLogo : (logo) => dispatch(setSiteLogo(logo)),
  setSocialMedia : (socialMedia) => dispatch(setSocialMedia(socialMedia)),
  setMainBanner : (mainBanner) => dispatch(setMainBanner(mainBanner)),
  setCountries : (countries) => dispatch(setCountries(countries)),
  validateToken: (user) => dispatch(validateToken(user)),
  setProductCategory: (productCategory) => dispatch(setProductCategory(productCategory)),
  setServiceCategory: (serviceCategory) => dispatch(setServiceCategory(serviceCategory)),
  setInvestmentCategory: (investmentCategory) => dispatch(setInvestmentCategory(investmentCategory)),
  setAdvertisements: (ads) => dispatch(setAdvertisements(ads))
});

export default connect(null , mapDispatchToProps)(App);