import React from 'react'
import Slider from "react-slick";
import slugify from "slugify";
import { icons } from "./Icons";
import remark from "remark";
import recommended from "remark-preset-lint-recommended";
import remarkHtml from "remark-html";

const PrevArrow = ({ onClick }) => (
  <div className="container slick-container">
    <div className="slick-arrow slick-previous c-white" onClick={onClick}>
      {icons.carouselArrowLeft}
    </div>
  </div>
)

const NextArrow = ({ onClick }) => (
  <div className="container slick-container">
    <div className="slick-arrow slick-next c-white" onClick={onClick} >
      {icons.carouselArrowRight}
    </div>
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

  return (
    <Slider className="hero" {...settings}>
      {slides.map((slide, i) => {
        const description = remark().use(recommended).use(remarkHtml).processSync(slide.description).toString();
        return slide.project ?
          <div className="slide c-white" key={`slide-${i}`}>
            <div className="container slick-container">
              <div className="slide-info ">
                <a className="marginBottom-4 block" href={`projects/${slugify(slide.project, { lower: true })}`}>
                  <div className="md" dangerouslySetInnerHTML={{ __html: description }} />
                </a>
                <span>{i + 1}/{slides.length}</span>
              </div>
            </div>
            <img src={slide.url} alt={slide.alt} />
          </div>
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
