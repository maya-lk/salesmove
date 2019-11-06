import React from 'react';

import './testimonial-item.styles.scss';

const TestimonialItem = ({ item }) => (
    <div className="testimonialItem">
        <div className="content" dangerouslySetInnerHTML={{ __html: item.content }}/>
        <h4>- {item.title}</h4>
    </div>
);

export default TestimonialItem;