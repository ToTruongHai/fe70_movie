import { Carousel } from "antd";
import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "../../assets/styles/HomeBanner/HomeBanner.module.css";
import { getAllBannerAction } from "../../redux/actions/quanLyPhimAction";

function HomeBanner() {
  const { arrBanner } = useSelector(
    (rootReducer) => rootReducer.quanLyPhimReducer
  );
  const dispatch = useDispatch();

  const carouselRef = React.createRef();

  useEffect(async () => {
    let action = getAllBannerAction();
    dispatch(action);
  }, []);

  // useEffect(async () => {
  //   let action = getAllBannerAction();
  //   dispatch(action);
  // }, [arrBanner]);

  const renderBanner = () => {
    return arrBanner?.map((banner, index) => {
      return (
        <div key={index}>
          <NavLink to={`/detail/${banner.maPhim}`}>
            <div
              style={{ backgroundImage: `url(${banner.hinhAnh})` }}
              className={`${styles.carousel_img}`}
            ></div>
          </NavLink>
        </div>
      );
    });
  };

  return (
    <div className={`${styles.carousel_container}`}>
      <button
        className={`btn ${styles.carousel_container_button_left}`}
        onClick={() => {
          carouselRef.current.prev();
        }}
      >
        <i className="fa fa-chevron-left" aria-hidden="true"></i>
      </button>
      <Carousel
        className={`${styles.carousel_custom} `}
        autoplay
        autoplaySpeed={4000}
        ref={carouselRef}
      >
        {renderBanner()}
      </Carousel>

      <button
        className={`btn ${styles.carousel_container_button_right}`}
        onClick={() => {
          carouselRef.current.next();
        }}
      >
        <i className="fa fa-chevron-right" aria-hidden="true"></i>
      </button>
    </div>
  );
}

export default memo(HomeBanner);
