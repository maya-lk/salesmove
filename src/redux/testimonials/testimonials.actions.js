import { testimonialActionTypes } from './testimonials.types';

export const setTestimonialBanner = testimonialBanner => ({
    type : testimonialActionTypes.SET_TESTIMONIAL_BANNER,
    payload : testimonialBanner
});

export const setTestimonialItems = items => ({
    type : testimonialActionTypes.SET_TESTIMONIAL_ITEMS,
    payload : items
});