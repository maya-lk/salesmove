import { pagesActionTypes } from './pages.types';

const INITIAL_STATE = {
    about : null,
    services : null,
    howToPostAd : null
}

const pagesReduser = ( state = INITIAL_STATE , action ) => {
    switch (action.type) {
        case pagesActionTypes.SET_ABOUT_PAGE:
            return{
                ...state,
                about : action.payload
            }
        case pagesActionTypes.SET_SERVICES_PAGE:
            return{
                ...state,
                services : action.payload
            }
        case pagesActionTypes.SET_HOW_TO_POST_AD_PAGE:
            return{
                ...state,
                howToPostAd : action.payload
            }
        default:
            return state;
    }
}

export default pagesReduser;