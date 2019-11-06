import { createSelector } from 'reselect';

const selectTestimonialAPI = state => state.testimonials;

export const selectBanner = createSelector(
    [selectTestimonialAPI],
    (testimonials) => testimonials.testimonialBanner
);

export const selectTestimonialItems = createSelector(
    [selectTestimonialAPI],
    (testimonials) => testimonials.items
);