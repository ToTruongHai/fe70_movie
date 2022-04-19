import React, { Component } from "react";
import Slider from "react-slick";
import "../../assets/styles/MultipleRowSlick/MultipleRowSlick.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

export default class MultipleRowSlick extends Component {
  render() {
    const settings = {
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      rows: 2,
      slidesPerRow: 4,
      autoplay: true,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesPerRow: 3,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesPerRow: 2,
          },
        },
      ],
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    return (
      <div className="multiple-row">
        <Slider {...settings}>
          {/* <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div> */}
          {this.props.arr}
        </Slider>
      </div>
    );
  }
}
