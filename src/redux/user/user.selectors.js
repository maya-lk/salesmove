import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectUserDetails = createSelector(
    [selectUser],
    (user) => user.userDetails
);

export const selectMyAds = createSelector(
    [selectUser],
    (user) => user.myAds
);

export const selectUserProfile = createSelector(
    [selectUser],
    (user) => user.userProfile
);

export const selectEditAd = editAdUrlParams =>
    createSelector(
        [selectUser],
        user => user.myAds.filter( ad => ad.ID === editAdUrlParams )
);

export const selectPaymentsDetails = createSelector(
    [selectUser],
    (user) => user.payments
);