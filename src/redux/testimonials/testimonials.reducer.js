import { testimonialActionTypes } from './testimonials.types';

const INITIAL_STATE = {
    items : null,
    testimonialBanner : null
}

const testimonialReducer = ( state = INITIAL_STATE , action ) => {
    switch (action.type) {
        case testimonialActionTypes.SET_TESTIMONIAL_BANNER:
            return{
                ...state,
                testimonialBanner : action.payload
            }
        case testimonialActionTypes.SET_TESTIMONIAL_ITEMS:
            return{
                ...state,
                items : action.payload
            }
        default:
            return state;
    }
}

export default testimonialReducer;