import { commonActionTypes } from './common.types';

const INITIAL_STATE = {
    logo : null,
    socialMedia : null,
    mainBanner : null,
    countries : null,
    loginModal: false,
    registerModal : false,
    productCategory : null,
    serviceCategory : null,
    investmentCategory : null
}

const commonReducer = ( state = INITIAL_STATE , action ) => {
    switch (action.type) {
        case commonActionTypes.SET_SITE_LOGO:
            return{
                ...state,
                logo : action.payload
            }
        case commonActionTypes.SET_SOCIAL_MEDIA:
            return{
                ...state,
                socialMedia : action.payload
            }
        case commonActionTypes.SET_MAIN_BANNER:
            return{
                ...state,
                mainBanner : action.payload
            }
        case commonActionTypes.SET_COUNTRIES:
            return{
                ...state,
                countries : action.payload
            }
        case commonActionTypes.SET_SIGNIN_MODAL_TOGGLE:
            return {
                ...state,
                loginModal : !state.loginModal
            }
        case commonActionTypes.SET_SIGNUP_MODAL_TOGGLE:
            return{
                ...state,
                registerModal : !state.registerModal
            }
        case commonActionTypes.SET_PRODUCTS_CATEGORY:
            return{
                ...state,
                productCategory : action.payload
            }
        case commonActionTypes.SET_SERVICES_CATEGORY:
            return{
                ...state,
                serviceCategory : action.payload
            }
        case commonActionTypes.SET_INVESTMENTS_CATEGORY:
            return{
                ...state,
                investmentCategory : action.payload
            }
        default:
            return state;
    }
}

export default commonReducer;