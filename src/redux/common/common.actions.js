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