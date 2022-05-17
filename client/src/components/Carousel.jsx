import React from 'react'
import Slider from "react-slick"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3
}

const Carousel = ({children}) => {
  return (
    <Slider {...settings}>
      {children}
    </Slider>
  )
}

export default Carousel