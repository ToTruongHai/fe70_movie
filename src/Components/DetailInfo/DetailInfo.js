import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../assets/styles/DetailInfo/DetailInfo.module.css";
import { getMovieDetailAction } from "../../redux/actions/quanLyPhimAction";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Trailer from "../Trailer/Trailer";
import { useParams } from "react-router-dom";

export default function DetailInfo() {
  const { movieDetail } = useSelector(
    (rootReducer) => rootReducer.quanLyPhimReducer
  );
  const dispatch = useDispatch();

  let danhGia = movieDetail?.danhGia;
  const params = useParams();

  useEffect(async () => {
    danhGia = movieDetail?.danhGia;
  }, [movieDetail]);


  useEffect(async () => {
    let action = getMovieDetailAction(params.id);
    dispatch(action);
  }, []);

  return (
    <div className={`${styles.movieInfo} mt-5`}>
      <div className={`${styles.movieInfo_img}`}>
        <div className="col-5 m-0 p-0">
          <img
            src={movieDetail?.hinhAnh}
            alt="..."
            width={`100%`}
            height={`100%`}
          />
        </div>
        <div className={`${styles.movieInfo_content} col-7`}>
          <p>{movieDetail?.tenPhim}</p>
          <p>
            <span>Ngày khởi chiếu: </span>
            {movieDetail?.ngayKhoiChieu}
          </p>
          <div className="row">
            <div className="col-md-5 col-lg-3 ">
              <CircularProgressbar
                value={danhGia}
                maxValue={10}
                text={`${danhGia}/10`}
                background={true}
                backgroundPadding={5}
              />
            </div>
            <div className="col-md-7 col-lg-9">
              <button className="btn text-white">ĐÁNH GIÁ</button>
            </div>
          </div>
          <div className={`${styles.movieInfo_content_noidung}`}>
            <h3>Nội Dung</h3>
            <p>{movieDetail?.moTa}</p>
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
