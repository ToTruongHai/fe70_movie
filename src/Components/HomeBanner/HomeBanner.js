import { Carousel } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../assets/styles/HomeBanner/HomeBanner.module.css";
import { getAllBannerAction } from "../../redux/actions/homeBannerAction";

export default function HomeBanner() {
  const { arrBanner } = useSelector(
    (rootReducer) => rootReducer.homeBannerReducer
  );
  const dispatch = useDispatch();
  const [banner, setBanner] = useState();

  const carouselRef = React.createRef();

  useEffect(async () => {
    let action = getAllBannerAction();
    dispatch(action);
  }, []);

  const renderBanner = () => {
    return arrBanner.map((banner, index) => {
      return (
        <div key={index}>
          <div
            style={{ backgroundImage: `url(${banner.hinhAnh})` }}
            className={`${styles.carousel_img}`}
          ></div>
        </div>
      );
    });
  };

  return (
    <div className={`${styles.carousel_container}`}>
      <Carousel
        className={`${styles.carousel_custom}`}
        autoplay
        autoplaySpeed={4000}
        ref={carouselRef}
      >
        {renderBanner()}
      </Carousel>
      <div className={`${styles.carousel_container_button}`}>
        <button
          className={`btn ${styles.carousel_container_button_left}`}
          onClick={() => {
            carouselRef.current.prev();
          }}
        >
          <i className="fa fa-chevron-left" aria-hidden="true"></i>
        </button>
        <button
          className={`btn ${styles.carousel_container_button_right}`}
          onClick={() => {
            carouselRef.current.next();
          }}
        >
          <i className="fa fa-chevron-right" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}
