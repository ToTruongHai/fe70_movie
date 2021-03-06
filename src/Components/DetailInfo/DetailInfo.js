import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../assets/styles/DetailInfo/DetailInfo.module.css";
import { getMovieDetailAction } from "../../redux/actions/quanLyPhimAction";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Trailer from "../Trailer/Trailer";
import { useParams } from "react-router-dom";
import moment from "moment";
import ButtonPrimary from "../Elements/ButtonPrimary/ButtonPrimary.js";

export default function DetailInfo() {
  const { movieDetail } = useSelector(
    (rootReducer) => rootReducer.quanLyPhimReducer
  );
  const dispatch = useDispatch();

  let danhGia = movieDetail?.danhGia;
  const params = useParams();

  useEffect(async () => {
    danhGia = movieDetail?.danhGia;
    console.log("movieDetail: ", movieDetail);
  }, [movieDetail]);

  useEffect(async () => {
    let action = getMovieDetailAction(params.id);
    dispatch(action);
  }, []);

  const renderMota = (movieDetail) => {
    if (window.innerWidth < 768) {
      return movieDetail?.moTa.length > 100
        ? movieDetail?.moTa.substr(0, 100) + "..."
        : movieDetail?.moTa;
    } else {
      return movieDetail?.moTa.length > 500
      ? movieDetail?.moTa.substr(0, 500) + "..."
      : movieDetail?.moTa;
    }
  };

  return (
    <div className={`${styles.movieInfo} mt-5`}>
      <div className={`${styles.movieInfo_img} row`}>
        <div className={`col-12 col-sm-6 col-md-5 m-0 p-0`}>
          <img
            src={movieDetail?.hinhAnh}
            alt="..."
            width={`100%`}
            height={`100%`}
          />
        </div>
        <div className={`${styles.movieInfo_content} col-12 col-sm-6 col-md-7`}>
          <p>{movieDetail?.tenPhim}</p>
          <p>
            <span>Ngày khởi chiếu: </span>
            {moment(movieDetail.ngayKhoiChieu).format("DD/MM/YYYY hh:mm A")}
          </p>
          <div className={`row `}>
            <div className="col-3 ">
              <CircularProgressbar
                value={danhGia}
                maxValue={10}
                text={`${danhGia}/10`}
                background={true}
                backgroundPadding={5}
              />
            </div>
            <div className={`col-sm-9 col-md-7 col-lg-9 col-9 ${styles.row_rating}`}>
              {/* <button className="btn text-white">ĐÁNH GIÁ</button> */}
              <ButtonPrimary>Đánh giá</ButtonPrimary>
            </div>
          </div>
          <div className={`${styles.movieInfo_content_noidung}`}>
            <h3>Nội Dung</h3>
            <p>{renderMota(movieDetail)}</p>
          </div>
          <div className={`${styles.movieInfo_content_trailer}`}>
            <button
              className="btn"
              data-toggle="modal"
              data-target=".bd-example-modal-lg"
              onClick={() => {
                const action = {
                  type: "OPEN_FORM",
                  component: <Trailer />,
                  titleModal: "TRAILER",
                  isOpen: true,
                  handleSubmit: () => {
                    console.log("modal sumbit");
                  },
                  trailerSrc: movieDetail?.trailer,
                  typeModal: "TRAILER",
                };
                dispatch(action);
              }}
            >
              WATCH TRAILER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
