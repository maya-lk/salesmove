import { userActionTypes } from './user.types';

export const setUser = userDetails => ({
    type : userActionTypes.SET_USER,
    payload : userDetails
});

export const setUserError = error => ({
    type : userActionTypes.USER_SIGNIN_FAIL,
    payload : error
});

export const signOutUser = userDetails => ({
    type : userActionTypes.USER_SIGNOUT,
    payload : userDetails
});

export const validateToken = userDetails => ({
    type : userActionTypes.VALIDATE_TOKEN,
    payload : userDetails
});

export const setMyAds = myAds => ({
    type : userActionTypes.SET_MY_ADS,
    payload : myAds
});

export const deleteAdItem = item => ({
    type : userActionTypes.DELETE_AD,
    payload : item
});

export const setUserProfileDetails = userProfile => ({
    type : userActionTypes.SET_USER_PROFILE_DETAILS,
    payload : userProfile
});

export const setPaymentsDetails = payments => ({
    type : userActionTypes.SET_PAYMENTS_DETAILS,
    payload : payments
});