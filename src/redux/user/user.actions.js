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