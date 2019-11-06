import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import OwlCarousel from 'react-owl-carousel';

import { selectBanner , selectTestimonialItems } from '../../redux/testimonials/testimonials.selectors';

import TestimonialItem from '../testimonial-item/testimonial-item.component';
import ContactUs from '../contact-us/contact-us.component';

import './testimonials.styles.scss';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const Testimonials = ({ testimonialBanner , items }) => (
    <div className="testimonialsWrap d-flex justify-content-between flex-wrap">
        <div className="testimonials text-center">
            <span className="imgOverlay" style={{ backgroundImage : `url(${testimonialBanner})` }}></span>
            <h3>What our clients say</h3>
            {
                (items)?
                (<OwlCarousel
                    className="owl-theme testimonialSlider"
                    loop
                    items={1}
                    dots={false}
                    autoplay={true}
                >
                    {
                        items.map( item => <TestimonialItem key={item.ID} item={item} /> )
                    }
                </OwlCarousel>)
                : ''
            }
        </div>
        <ContactUs />
    </div>
)

const mapStateToProps = createStructuredSelector({
    testimonialBanner : selectBanner,
    items : selectTestimonialItems
});

export default connect(mapStateToProps)(Testimonials);