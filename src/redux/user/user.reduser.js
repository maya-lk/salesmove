import { userActionTypes } from './user.types';

const INITIAL_STATE = {
    userDetails: null,
    error: null,
    isLoading: false,
    redirectURL: "/"
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
        default:
            return state
    }
};

export default userReducer;