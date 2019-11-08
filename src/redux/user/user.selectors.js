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
