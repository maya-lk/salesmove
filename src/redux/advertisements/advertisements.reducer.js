import { advertisementActionTypes } from './advertisements.types';

const INITIAL_STATE = {
    ads : null,
    country : '',
    category: '',
    want: '',
    searchItem : '',
    isLoading: false,
    toggleItemModal : false,
    clickedItem : null
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
        case advertisementActionTypes.SET_AD_POSTING_LOADING:
            return{
                ...state,
                isLoading : !state.isLoading
            }
        case advertisementActionTypes.SET_AD_ITEM_MODAL_TOGGLE:
            return{
                ...state,
                toggleItemModal : !state.toggleItemModal
            }
        case advertisementActionTypes.SET_CLICKED_ITEM:
            return{
                ...state,
                clickedItem : action.payload 
            }
        default:
            return state;
    }
}

export default advertisementReducer;