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

export const selectCountyObj = createSelector(
    [selectCountries],
    (countries) => (countries) ? countries.map( (country) => ({ value: country.name , flagPath: country.flag  }) ) : ''
);

export const selectSigninModalHidden = createSelector(
    [selectCommonAPI],
    (commonParams) => commonParams.loginModal
);

export const selectSignupModalHidden = createSelector(
    [selectCommonAPI],
    (commonParams) => commonParams.registerModal
);

export const selectProductCategory = createSelector(
    [selectCommonAPI],
    (commonParams) => commonParams.productCategory
);

export const selectServiceCategory = createSelector(
    [selectCommonAPI],
    (commonParams) => commonParams.serviceCategory
);

export const selectInvestmentCategory = createSelector(
    [selectCommonAPI],
    (commonParams) => commonParams.investmentCategory
);

export const selectFooterAbout = createSelector(
    [selectCommonAPI],
    (commonParams) => commonParams.footerAbout
);