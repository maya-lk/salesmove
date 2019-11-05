import React from 'react';

import './image-preview.styles.scss';

const ImagePreview = ({ image }) => (
    <div className="imagePreview">
        <img src={image} alt="Preview"/>
    </div>
);

export default ImagePreview;