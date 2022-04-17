import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "../../assets/styles/HomeMovieList/HomeMovieList.module.css";
import { getMovieListAction } from "../../redux/actions/quanLyPhimAction";

export default function HomeMovieList() {
  let { movieList } = useSelector((a) => a.quanLyPhimReducer);
  let [srcTrailer, setSrcTrailer] = useState("");
  let renderMovieList = () => {
    return movieList.map((item, index) => {
      return (
        <div className="col-lg-3 col-md-4 col-6" key={index}>
          <div className={`${styles.img_wrapper} w-100 position-relative`}>
            <img src={item.hinhAnh} alt="" className={`${styles.img_item}`} />
            <div
              className={`${styles.ovelay_item}`}
              data-toggle="modal"
              data-target="#modelTrailer"
              onClick={() => {
                let source = item.trailer;
                if (source.includes(".be/")) {
                  source = source.split(".be/");
                  source =
                    "https://www.youtube.com/embed/" +
                    source[source.length - 1];
                }
                if (source.includes("/watch?v=")) {
                  source = source.split("/watch?v=");
                  source = source[source.length - 1];

                  source = source.split("&")[0];
                  source = "https://www.youtube.com/embed/" + source;
                }
                setSrcTrailer(source);
              }}
            >
              <i className="mdi mdi-play-circle-outline"></i>
            </div>
          </div>
          <NavLink exact to={`/dat-ve/`}>
            <div className={`${styles.title_movie} position-relative`}>
              <h4 className="text-uppercase">{item.tenPhim}</h4>
              <p className="text-dark">
                {item.moTa.length > 50
                  ? item.moTa.substr(0, 50) + "..."
                  : item.moTa}
              </p>
              <button className={`${styles.btn_datve} btn-default`}>
                <span>Mua Vé</span>
              </button>
            </div>
          </NavLink>
        </div>
      );
    });
  };
  let dispatch = useDispatch();
  useEffect(() => {
    document.getElementById("modelTrailer").onhide = () => {
      setSrcTrailer("");
    };
    let action = getMovieListAction();
    dispatch(action);
    return () => {
      document
        .getElementById("modelTrailer")
        .removeEventListener("onhide", null);
    };
  }, []);
  return (
    <div className="row">
      <div className="col">
        <div className="tab-movies my-3">
          <div>
            <ul
              className={`nav nav-tabs ${styles.movie_home}`}
              id="pills-tab"
              role="tablist"
            >
              <li className={`${styles.nav_item_home} mr-4`}>
                <a
                  className="nav-link active text-uppercase"
                  id="pills-home-tab"
                  data-toggle="pill"
                  href="#pills-home"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  PHIM ĐANG CHIẾU
                </a>
              </li>
              <li className={`${styles.nav_item_home}`}>
                <a
                  className="nav-link text-uppercase"
                  id="pills-profile-tab"
                  data-toggle="pill"
                  href="#pills-profile"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  PHIM SẮP CHIẾU
                </a>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active py-5"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                <div className="row">{renderMovieList()}</div>
              </div>
              <div
                className="tab-pane fade py-5"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                ...
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          className="modal fade"
          id="modelTrailer"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div
            className="modal-dialog  mx-auto"
            role="document"
            style={{ maxWidth: "80%", height: "500px" }}
          >
            <div className="modal-content h-100">
              <div className="modal-header p-0 h-100">
                <iframe
                  width="100%"
                  height="100%"
                  src={srcTrailer}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
