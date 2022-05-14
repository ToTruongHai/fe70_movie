import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import style from "../../assets/styles/HomeFooter/HomeFooter.module.css";
import $ from "jquery";
import logo from "../../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovieTheaterAction } from "../../redux/actions/quanLyRapAction";

export default function HomeFooter() {
  const { movieTheaterList } = useSelector((a) => a.quanLyRapReducer);
  const dispatch = useDispatch();
  console.log(movieTheaterList);
  useEffect(() => {
    dispatch(getAllMovieTheaterAction());
    window.addEventListener("scroll", () => {
      $(window).scrollTop() == 0
        ? $("#to_top").fadeOut()
        : $("#to_top").fadeIn();
    });
    return () => {
      window.removeEventListener("scroll", () => {
        $(window).scrollTop() == 0
          ? $("#to_top").fadeOut()
          : $("#to_top").fadeIn();
      });
    };
  }, []);
  return (
    <>
      <div>
        <footer>
          <section className={`${style.footer_wrapper} p-5`}>
            <div className="row">
              <div className="col-md-4 d-flex align-items-center mb-5 justify-content-center justify-content-md-start">
                <NavLink
                  to="/"
                  className="d-flex align-items-center text-white"
                >
                  <img src={logo} width={75} height={75} alt="" />
                  <h2 className="ml-3 text-capitalize">TixVN</h2>
                </NavLink>
              </div>
              <div className="col-lg-4 col-md-8">
                <h2>Đối tác</h2>
                <ul className="d-flex row align-items-center ">
                  {movieTheaterList.map((item, index) => {
                    return (
                      <li key={index} className="col-4 mb-4">
                        <div className="rounded-circle bg-white d-inline-block">
                          <img width={50} height={50} src={item.logo} alt="" />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="col-md-4 d-lg-none"></div>
              <div className="col-lg-4 col-md-8 mb-3">
                <h2 className="text-capitalize">Mobile App</h2>
                <ul className="d-flex row align-items-center ">
                  <a href="" className="text-white ml-5 display-4">
                    <span>
                      <i class="fab fa-facebook-square"></i>
                    </span>
                  </a>
                  <a href="" className="text-white ml-5 display-4">
                    <span>
                      <i class="fab fa-twitter"></i>
                    </span>
                  </a>
                  <a href="" className="text-white ml-5 display-4">
                    <span>
                      <i class="fab fa-pinterest"></i>
                    </span>
                  </a>
                  <a href="" className="text-white ml-5 display-4">
                    <span>
                      <i class="fab fa-linkedin-in"></i>
                    </span>
                  </a>
                </ul>
              </div>
            </div>
          </section>
          <section className={`${style.copyright_wrapper}`}>
            <p className={`${style.copyright}`}>
              Copyright © 2022 - <NavLink to="/">TixVN</NavLink> - All Rights
              Reserved
            </p>
          </section>
        </footer>
        <a className={`${style.to_top}`} onClick={scrollTop} id="to_top">
          <i className="fas fa-angle-up" />
        </a>
      </div>
    </>
  );
}

function scrollTop() {
  $("html").animate({ scrollTop: 0 }, 500);
}
