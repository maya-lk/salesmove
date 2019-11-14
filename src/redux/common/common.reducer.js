import { commonActionTypes } from './common.types';

const INITIAL_STATE = {
    logo : null,
    socialMedia : null,
    mainBanner : null,
    countries : null,
    loginModal: false,
    registerModal : false,
    serviceCategory : null,
    footerAbout: null,
    mainLoading: true,
    forgotPasswordModal: false,
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
        case commonActionTypes.SET_SERVICES_CATEGORY:
            return{
                ...state,
                serviceCategory : action.payload
            }
        case commonActionTypes.SET_FOOTER_ABOUT:
            return{
                ...state,
                footerAbout : action.payload
            }
        case commonActionTypes.SET_MAIN_LOADING:
            return{
                ...state,
                mainLoading : !state.mainLoading
            }
        case commonActionTypes.SET_FORGOT_PASSWORD_MODAL_TOGGLE:
            return{
                ...state,
                forgotPasswordModal : !state.forgotPasswordModal
            }
        default:
            return state;
    }
}

export default commonReducer;