import { createSelector } from 'reselect';

const selectCommonAPI = state => state.commonParams;

export const selectSiteLogo = createSelector(
    [selectCommonAPI],
    (commonParams) => commonParams.logo
);

export const selectSocialMedia = createSelector(
    [selectCommonAPI],
    (commonParams) => commonParams.socialMedia
);

export const selectMainBanner = createSelector(
    [selectCommonAPI],
    (commonParams) => commonParams.mainBanner
);

export const selectCountries = createSelector(
    [selectCommonAPI],
    (commonParams) => commonParams.countries
);