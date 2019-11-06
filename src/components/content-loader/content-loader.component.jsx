import React from 'react';
import ContentLoader from 'react-content-loader';

const SearchItemLoader = () => (
    <ContentLoader 
        height={150}
        width={400}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
    ></ContentLoader>
)

export default SearchItemLoader;