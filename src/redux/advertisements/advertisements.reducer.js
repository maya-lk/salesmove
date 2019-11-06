import { advertisementActionTypes } from './advertisements.types';

const INITIAL_STATE = {
    ads : null,
    country : '',
    category: '',
    want: '',
    searchItem : ''
}

const advertisementReducer = ( state = INITIAL_STATE , action ) => {
    switch (action.type) {
        case advertisementActionTypes.SET_ADVERTISEMENTS:
            return{
                ...state,
                ads : action.payload
            }
        case advertisementActionTypes.SET_WANT_PARAM:
            return{
                ...state,
                want : action.payload
            }
        case advertisementActionTypes.SET_CATEGORY_PARAM:
            return{
                ...state,
                category : action.payload
            }
        case advertisementActionTypes.SET_SEARCH_ITEM_PARAM:
            return{
                ...state,
                searchItem : action.payload
            }
        case advertisementActionTypes.SET_COUNTRY_PARAM:
            return{
                ...state,
                country : action.payload 
            }
        default:
            return state;
    }
}

export default advertisementReducer;