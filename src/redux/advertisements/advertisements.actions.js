import { advertisementActionTypes } from './advertisements.types';

export const setAdvertisements = ads => ({
    type : advertisementActionTypes.SET_ADVERTISEMENTS,
    payload : ads
});

export const setWantParam = want => ({
    type : advertisementActionTypes.SET_WANT_PARAM,
    payload : want
});

export const setCategoryParam = category => ({
    type : advertisementActionTypes.SET_CATEGORY_PARAM,
    payload : category
});

export const setSearchItemParam = searchItem => ({
    type : advertisementActionTypes.SET_SEARCH_ITEM_PARAM,
    payload : searchItem
});

export const setCountryParam = country => ({
    type : advertisementActionTypes.SET_COUNTRY_PARAM,
    payload : country
});

export const setAdPostingLoading = () => ({
    type : advertisementActionTypes.SET_AD_POSTING_LOADING
});

export const setItemModalToggle = () => ({
    type : advertisementActionTypes.SET_AD_ITEM_MODAL_TOGGLE
});

export const setClickedItem = clickedItem => ({
    type : advertisementActionTypes.SET_CLICKED_ITEM,
    payload : clickedItem
});

export const setInquiryModalToggle = () => ({
    type : advertisementActionTypes.SET_INQUIRY_MODAL_TOGGLE
});