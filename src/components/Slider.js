import React from 'react'
import Slider from "react-slick";
import slugify from "slugify";
import { icons } from "./Icons";

const PrevArrow = ({ onClick }) => (
  <div className="slick-arrow" onClick={onClick}>
    Previous
  </div>
)

const NextArrow = ({ onClick }) => (
  <div className="slick-arrow slick-next" onClick={onClick} >
    Next
  </div>
)

export default ({ slides }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  console.log(slides);

  return (
    <Slider className="hero" {...settings}>
      {slides.map((slide, i) => {
        return slide.project ?
          <a href={`projects/${slugify(slide.project, { lower: true })}`} className="slide" key={`slide-${i}`}>
            <div className="slide-info">
              <div className="md" dangerouslySetInnerHTML={{ __html: slide.description }} />
              <span>{i + 1}/{slides.length}</span>
            </div>
            <img src={slide.url} alt={slide.alt} />
          </a>
          :
          <div className="slide" key={`slide-${i}`}>
            <div className="slide-info">
              <div className="md" dangerouslySetInnerHTML={{ __html: slide.description }} />
              <span>{i + 1}/{slides.length}</span>
            </div>
            <img src={slide.url} alt={slide.alt} />
          </div>
      })}
    </Slider>
  )
}
