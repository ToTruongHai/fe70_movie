import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../assets/styles/Checkout/Checkout.module.css";
import { getSeatListAction, postBookSeatAction } from "../../redux/actions/quanLyDatVeAction";
import "../../assets/styles/Checkout/Checkout.css";
import { BOOK_SEAT } from "../../redux/actions/types/quanLyDatVeType";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";

export default function Checkout(props) {
  const { seatList, danhSachGheDangDat } = useSelector(
    (rootReducer) => rootReducer.quanLyDatVeReducer
  );
  const { thongTinPhim, danhSachGhe } = seatList;
  const dispatch = useDispatch();

  useEffect(async () => {
    let action = getSeatListAction(props.match.params.id);
    dispatch(action);
  }, []);

  const renderSeat = () => {
    return danhSachGhe.map((ghe, index) => {
      let gheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let gheDaDat = ghe.daDat === true ? "gheDaDat" : "";

      let classGheDangDat = "";
      //find seat in state and compare to API list if it exist
      let indexGheDangDat = danhSachGheDangDat.findIndex(
        (gheDangDat) => gheDangDat.maGhe === ghe.maGhe
      );
      if (indexGheDangDat != -1) {
        classGheDangDat = "gheDangDat";
      }

      return (
        <React.Fragment key={index}>
          <button
            disabled={ghe.daDat}
            className={`ghe ${gheVip} ${gheDaDat} ${classGheDangDat}`}
            key={index}
            onClick={() => {
              dispatch({
                type: BOOK_SEAT,
                bookSeat: ghe,
              });
            }}
          >
            {ghe.daDat === true ? (
              <i class="fa-solid fa-xmark" style={{ fontSize: "1.5rem" }}></i>
            ) : (
              ghe.stt
            )}
          </button>

          {/* {(index + 1) % 16 === 0 ? <br /> : ""} */}
        </React.Fragment>
      );
    });
  };

  return (
    <div
      className="container-fluid"
      style={{ height: "100%", minHeight: "100vh" }}
    >
      <div className="row">
        {/* SEAT_LIST */}

        <div className={`col-9 text-center ${styles.seat_list}`}>
          <div className="mt-5 ">
            <div className={`${styles.darkbg} ml-auto mr-auto`}></div>
            <div className={`${styles.trapezoid} ml-auto mr-auto`}>
              <h3 className="text-black pt-3">Màn Hình</h3>
            </div>
          </div>
          <div className="w-100 container seat_container">
            <div className="row">{renderSeat()}</div>
          </div>
        </div>
        {/* SIDE_INFO */}
        <div
          className={`col-3 d-flex flex-column justify-content-between ${styles.side_info}`}
          style={{ height: "100%", minHeight: "100vh" }}
        >
          <div>
            <div className="d-flex mt-3">
              <img
                src={thongTinPhim.hinhAnh}
                className="mr-auto ml-auto"
                alt="..."
                width={`50%`}
              />
            </div>
            <hr />
            <h3>{thongTinPhim?.tenPhim}</h3>
            <p>
              <span>Địa Chỉ: </span> {thongTinPhim?.diaChi}
            </p>
            <p>
              <span>Rạp: </span>
              {thongTinPhim.tenCumRap} | {thongTinPhim.tenRap}
            </p>
            <hr />
            <p>
              <span>Xuất Chiếu: </span>
              {thongTinPhim?.gioChieu} | {thongTinPhim?.ngayChieu}
            </p>
            <hr />
            <div className="row justify-content-between m-0">
              <div className="col-1 p-0">
                <span>Ghế: </span>
              </div>
              <div className="primary_color col-7">
                {danhSachGheDangDat.map((gheDangDat, index) => {
                  if (index + 1 === danhSachGheDangDat.length) {
                    return (
                      <span className="ml-2" key={index}>
                        {gheDangDat.stt}
                      </span>
                    );
                  } else {
                    return (
                      <span className="ml-2" key={index}>
                        {gheDangDat.stt} ,
                      </span>
                    );
                  }
                })}
              </div>

              <div className="col-4 p-0 text-right">
                <span>
                  {danhSachGheDangDat
                    .reduce((tongTien, ghe, index) => {
                      return (tongTien += ghe.giaVe);
                    }, 0)
                    .toLocaleString()}
                  đ
                </span>
              </div>
            </div>
            <hr />
            <p>
              <span>E-mail: </span>
              AHSDKJASHJDK@gmail.com
            </p>
            <hr />
            <p>
              <span>Phone: </span>
              12312312312312312
            </p>

            <hr />
          </div>
          <h3
            className="text-center"
            style={{ color: "var(--primary_color)", fontSize: "3rem" }}
          >
            <span>
              {danhSachGheDangDat
                .reduce((tongTien, ghe, index) => {
                  return (tongTien += ghe.giaVe);
                }, 0)
                .toLocaleString()}
              đ
            </span>
          </h3>
          <div className="pb-0 d-flex">
            <button
              className="w-100 pt-4 pb-4 mb-4 btn btn-outline-success"
              style={{ fontSize: "2rem" }}
              onClick={
                () => {
                  const thongTinDatVe = new ThongTinDatVe();
                  thongTinDatVe.maLichChieu = props.match.params.id;
                  thongTinDatVe.danhSachVe = danhSachGheDangDat;

                  console.log(thongTinDatVe);

                  dispatch(postBookSeatAction(thongTinDatVe));
                }
              }
            >
              Đặt Vé
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
