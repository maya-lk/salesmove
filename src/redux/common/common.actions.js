import { commonActionTypes } from './common.types';

export const setSiteLogo = logo => ({
    type : commonActionTypes.SET_SITE_LOGO,
    payload : logo
});

export const setSocialMedia = socialMedia => ({
    type : commonActionTypes.SET_SOCIAL_MEDIA,
    payload : socialMedia
});

export const setMainBanner = mainBanner => ({
    type : commonActionTypes.SET_MAIN_BANNER,
    payload : mainBanner
});

export const setCountries = countries => ({
    type : commonActionTypes.SET_COUNTRIES,
    payload : countries
});

export const toggleSigninHidden = () => ({
    type : commonActionTypes.SET_SIGNIN_MODAL_TOGGLE
});

export const toggleSignupHidden = () => ({
    type : commonActionTypes.SET_SIGNUP_MODAL_TOGGLE
});