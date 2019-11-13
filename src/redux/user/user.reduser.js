import { userActionTypes } from './user.types';

const INITIAL_STATE = {
    userDetails: null,
    error: null,
    isLoading: false,
    redirectURL: "/",
    myAds: null,
    userProfile : null,
    payments: null
}

const userReducer = ( state = INITIAL_STATE , action ) => {
    switch (action.type) {
        case userActionTypes.SET_USER:
            return{
                ...state,
                userDetails : action.payload
            }
        case userActionTypes.USER_SIGNIN_FAIL:
            return{
                ...state,
                error: action.error
            }
        case userActionTypes.USER_SIGNOUT:
            return{
                ...state,
                userDetails : action.payload
            }
        case userActionTypes.VALIDATE_TOKEN:
            return{
                ...state,
                userDetails : action.payload
            }
        case userActionTypes.SET_MY_ADS:
            return{
                ...state,
                myAds : action.payload
            }
        case userActionTypes.DELETE_AD:
            return{
                ...state,
                myAds : state.myAds.filter( ad => ad.ID !== action.payload )
            }
        case userActionTypes.SET_USER_PROFILE_DETAILS:
            return{
                ...state,
                userProfile : action.payload
            }
        case userActionTypes.SET_PAYMENTS_DETAILS:
            return{
                ...state,
                payments : action.payload
            }
        default:
            return state
    }
};

export default userReducer;