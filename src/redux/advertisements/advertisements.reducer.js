import { advertisementActionTypes } from './advertisements.types';

const INITIAL_STATE = {
    ads : null,
}

const advertisementReducer = ( state = INITIAL_STATE , action ) => {
    switch (action.type) {
        case advertisementActionTypes.SET_ADVERTISEMENTS:
            return{
                ...state,
                ads : action.payload
            }
        default:
            return state;
    }
}

export default advertisementReducer;