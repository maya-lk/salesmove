import React from 'react';
import { connect } from 'react-redux';
import { Switch , Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import API , { accountAPI } from './lib/api';
import 'bootstrap/dist/css/bootstrap.min.css';

import { 
  setSiteLogo , 
  setSocialMedia , 
  setMainBanner , 
  setCountries ,  
  setServiceCategory , 
  setFooterAbout,
  setMainLoading
} from './redux/common/common.actions';
import { setAdvertisements } from './redux/advertisements/advertisements.actions';
import { validateToken , setMyAds , setUserProfileDetails } from './redux/user/user.actions';
import { setTestimonialBanner , setTestimonialItems } from './redux/testimonials/testimonials.actions';
import { setAboutPage , setServicePage , setHowToPostAdPage } from './redux/pages/pages.actions';

import { selectMainLoading } from './redux/common/common.selectors';

import MainLoadingScreen from './components/main-loading/main-loading.component';
import Header from './components/header/header.component';
import HomePage from './pages/home/home.component';
import PostAdComponent from './pages/post-ad/post-ad.component';
import SearchPage from './pages/search/search.component';
import AccountPage from './pages/account/account.component';
import NotFoundPage from './pages/404/404.component';
import EditAdvertisement from './pages/edit-ad/edit-ad.component';
import DefaultPages from './pages/default-pages/default-pages.component';

import './App.css';

class App extends React.Component {

  componentDidMount(){
    const { 
      setSiteLogo , 
      setSocialMedia , 
      setMainBanner , 
      setCountries , 
      validateToken , 
      setServiceCategory , 
      setAdvertisements,
      setTestimonialBanner,
      setTestimonialItems,
      setFooterAbout,
      setMainLoading,
      setMyAds,
      setUserProfileDetails,
      setAboutPage,
      setServicePage,
      setHowToPostAdPage
    } = this.props;

    //Common API
    API.get('common')
    .then(function(response){
      setSiteLogo(response.data.siteLogo);
      setSocialMedia(response.data.socialMedia);
      setMainBanner(response.data.mainBanner);
      setCountries(response.data.countries);

      setServiceCategory(response.data.serviceCategory);

      setFooterAbout(response.data.footerAbout)
    });

    let token = null, email = null, userID = null, displayName = null;
    if(localStorage.getItem("token")){
      token = localStorage.getItem("token");
      email = localStorage.getItem("email");
      userID = localStorage.getItem("userID");
      displayName = localStorage.getItem("displayName");
    }
    if(token){
      accountAPI.post("token/validate", {},{
        headers: {"Authorization": "Bearer " + token
      }})
      .then(res => {
        if(res.data.data.status === 200){
          const userDetails = {
            token : token,
            user_email : email,
            user_id : userID,
            user_display_name : displayName
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

    //Testimonials
    API.get('testimonials')
    .then(function(response){
      setTestimonialBanner(response.data.testimonialBanner);
      setTestimonialItems(response.data.items);
    });

    //Get My Ads
    if(userID){
      API.get(`my-ads?userid=${userID}`)
      .then(function(response){
        setMyAds(response.data);
      });

      API.get(`user?userid=${userID}`)
      .then(function(response){
        setUserProfileDetails(response.data);
      });
    }

    //Set Other Pages
    API.get('pages')
    .then(function(response){
      setAboutPage(response.data.about);
      setServicePage(response.data.services);
      setHowToPostAdPage(response.data.howToPostAd);
    });

    setTimeout(
      function() {
        setMainLoading();
      },
     3000
    );

  }

  render(){
    const { mainLoading } = this.props;
    return (
      <div>
        {
          (mainLoading)?
          (<MainLoadingScreen />)
          : (<div className="siteWrapper">
          <Header/>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/post-new-ad" component={PostAdComponent} />
            <Route path="/search/:category?" component={SearchPage} />
            <Route path="/account/:accId?" component={AccountPage} />
            <Route path="/edit/:editId" component={EditAdvertisement} />
            <Route path="/page" component={DefaultPages} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>)
        }        
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
  setServiceCategory: (serviceCategory) => dispatch(setServiceCategory(serviceCategory)),
  setAdvertisements: (ads) => dispatch(setAdvertisements(ads)),
  setTestimonialBanner: (testimonialBanner) => dispatch(setTestimonialBanner(testimonialBanner)),
  setTestimonialItems: (items) => dispatch(setTestimonialItems(items)),
  setFooterAbout: (footerAbout) => dispatch(setFooterAbout(footerAbout)),
  setMainLoading : () => dispatch(setMainLoading()),
  setMyAds : (myAds) => dispatch(setMyAds(myAds)),
  setUserProfileDetails : (userProfile) => dispatch(setUserProfileDetails(userProfile)),
  setAboutPage : (about) => dispatch(setAboutPage(about)),
  setServicePage : (services) => dispatch(setServicePage(services)),
  setHowToPostAdPage : (howToPostAd) => dispatch(setHowToPostAdPage(howToPostAd)),
});

const mapStateToProps = createStructuredSelector({
  mainLoading : selectMainLoading
})

export default connect(mapStateToProps , mapDispatchToProps)(App);