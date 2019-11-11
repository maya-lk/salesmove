import { pagesActionTypes } from './pages.types';

export const setAboutPage = about => ({
    type : pagesActionTypes.SET_ABOUT_PAGE,
    payload : about
});

export const setServicePage = services => ({
    type : pagesActionTypes.SET_SERVICES_PAGE,
    payload : services
});

export const setHowToPostAdPage = howToPostAd => ({
    type : pagesActionTypes.SET_HOW_TO_POST_AD_PAGE,
    payload : howToPostAd
});