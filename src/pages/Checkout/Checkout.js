import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../assets/styles/Checkout/Checkout.module.css";
import {
  getSeatListAction,
  postBookSeatAction,
} from "../../redux/actions/quanLyDatVeAction";
import "../../assets/styles/Checkout/Checkout.css";
import { BOOK_SEAT } from "../../redux/actions/types/quanLyDatVeType";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import _ from "lodash";
import { Tabs } from "antd";
import { GET_USER_HISTORY } from "../../redux/actions/types/quanLyNguoiDungType";
import { getUserSeatHistory } from "../../redux/actions/quanLyNguoiDungAction";
import moment from "moment";
import ButtonPrimary from "../../Components/Elements/ButtonPrimary/ButtonPrimary";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";
import ButtonPrimaryOutline from "../../Components/Elements/ButtonPrimaryOutline/ButtonPrimary";
import { history } from "../../util/setting";
import HistoryBookingItem from "../../Components/Elements/HistoryBookingItem";
// import { connection } from "../..";

function Checkout(props) {
  const { seatList, danhSachGheDangDat, danhSachGheKhachDangDat } = useSelector(
    (rootReducer) => rootReducer.quanLyDatVeReducer
  );
  const { userLogin } = useSelector(
    (rootReducer) => rootReducer.quanLyNguoiDungReducer
  );
  const { thongTinPhim, danhSachGhe } = seatList;
  const dispatch = useDispatch();

  useEffect(async () => {
    let action = getSeatListAction(props.match.params.id);
    dispatch(action);

    //Lấy danh sách ghế từ server về
    // connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
    //   console.log("dsGheKhachDat: ", dsGheKhachDat)
    // });
  }, []);

  useEffect(async () => {
    renderSeat();
  }, [seatList]);

  const renderSeat = () => {
    return danhSachGhe.map((ghe, index) => {
      let gheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let gheDaDat = ghe.daDat === true ? "gheDaDat" : "";

      let gheMinhDat = "";
      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        gheMinhDat = "gheMinhDat";
      }

      //find seat in state and compare to API list if it exist
      let classGheDangDat = "";
      let indexGheDangDat = danhSachGheDangDat.findIndex(
        (gheDangDat) => gheDangDat.maGhe === ghe.maGhe
      );
      if (indexGheDangDat != -1) {
        classGheDangDat = "gheDangDat";
      }

      //find realTime other book the seat
      let classGheKhachDangDat = "";
      let indexGheKhachDangDat = danhSachGheKhachDangDat.findIndex(
        (gheDangDat) => gheDangDat.maGhe === ghe.maGhe
      );
      if (indexGheKhachDangDat != -1) {
        classGheKhachDangDat = "gheKhachDangDat";
      }

      return (
        <React.Fragment key={index}>
          <button
            disabled={ghe.daDat | (classGheKhachDangDat !== "")}
            className={`ghe ${gheVip} ${gheDaDat} ${classGheDangDat} ${gheMinhDat} ${classGheKhachDangDat}`}
            key={index}
            onClick={() => {
              dispatch({
                type: BOOK_SEAT,
                bookSeat: ghe,
              });
            }}
          >
            {ghe.daDat === true ? (
              gheMinhDat != "" ? (
                <i className="fa-solid fa-user"></i>
              ) : (
                <i
                  className="fa-solid fa-xmark"
                  style={{ fontSize: "1.5rem" }}
                ></i>
              )
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
          {/* RENDER SEAT */}
          <div className="w-100 container seat_container">
            <div className="row">{renderSeat()}</div>
          </div>
          {/* TABLE */}
          <div className="mt-5 container">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <strong>Ghế chưa đặt</strong>
                  </th>
                  <th>
                    <strong>Ghế đang đặt</strong>
                  </th>
                  {/* <th>
                    <strong>Ghế khách đang đặt</strong>
                  </th> */}
                  <th>
                    <strong>Ghế đã đặt</strong>
                  </th>
                  <th>
                    <strong>Ghế vip</strong>
                  </th>
                  <th>
                    <strong>Ghế của bạn</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <button
                      className=" ghe text-center w-auto pl-5 pr-5"
                      disabled={true}
                    >
                      <i className="fa-solid fa-check"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      className=" ghe gheDangDat text-center w-auto pl-5 pr-5"
                      disabled={true}
                    >
                      <i className="fa-solid fa-check"></i>
                    </button>
                  </td>
                  {/* <td>
                    <button
                      className=" ghe gheKhachDangDat text-center w-auto pl-5 pr-5"
                      disabled={true}
                    >
                      <i className="fa-solid fa-check"></i>
                    </button>
                  </td> */}
                  <td>
                    <button
                      className=" ghe gheDaDat text-center w-auto pl-5 pr-5"
                      disabled={true}
                    >
                      <i
                        className="fa-solid fa-xmark"
                        style={{ fontSize: "1.5rem" }}
                      ></i>
                    </button>
                  </td>
                  <td>
                    <button
                      className=" ghe gheVip text-center w-auto pl-5 pr-5"
                      disabled={true}
                    >
                      <i className="fa-solid fa-check"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      className=" ghe gheMinhDat text-center w-auto pl-5 pr-5"
                      disabled={true}
                    >
                      <i className="fa-solid fa-user"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
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
              <span>Họ Tên: </span>
              {userLogin.hoTen}
            </p>
            <hr />
            <p>
              <span>E-mail: </span>
              {userLogin.email}
            </p>
            <hr />
            <p>
              <span>Phone: </span>
              {userLogin.soDT}
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
              onClick={() => {
                console.log("danhSachGheDangDat", danhSachGheDangDat);
                if (danhSachGheDangDat.length === 0) {
                  Swal.fire("Vui Lòng Chọn Ghế!");
                } else {
                  Swal.fire({
                    title: "Đặt Vé",
                    text: `Bạn Đã Chắc Về Chỗ Đã Đặt?`,
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#f26b38",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Confirm",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire("Success!", "Đặt Thành Công.");
                      const thongTinDatVe = new ThongTinDatVe();
                      thongTinDatVe.maLichChieu = props.match.params.id;
                      thongTinDatVe.danhSachVe = danhSachGheDangDat;

                      console.log(thongTinDatVe);

                      dispatch(postBookSeatAction(thongTinDatVe));
                    }
                  });
                }
              }}
            >
              Đặt Vé
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const { TabPane } = Tabs;

function callback(key) {}

export default function (props) {
  const { tabActive } = useSelector(
    (rootReducer) => rootReducer.quanLyDatVeReducer
  );
  const dispatch = useDispatch();
  return (
    <div className={`${styles.tabCheckOut}`}>
      <div className={`${styles.tabCheckOut_backHome}`}>
        <ButtonPrimaryOutline
          handleClick={() => {
            history.push("/");
          }}
        >
          BACK TO HOME
        </ButtonPrimaryOutline>
      </div>
      <Tabs
        defaultActiveKey="1"
        activeKey={tabActive}
        onChange={(key) => {
          dispatch({ type: "CHANGE_BACK_TAB", number: key.toString() });
        }}
      >
        <TabPane tab="01 CHỌN GHẾ & THANH TOÁN" key="1">
          <Checkout {...props} />
        </TabPane>
        <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
          <KetQuaDatVe {...props} />
        </TabPane>
      </Tabs>
    </div>
  );
}

export const KetQuaDatVe = (props) => {
  const { userSeatHistory, userLogin } = useSelector(
    (rootReducer) => rootReducer.quanLyNguoiDungReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const action = getUserSeatHistory();
    dispatch(action);
  }, []);
  return (
    <div className="container-fluid  p-5">
      <div className="row">
        {userSeatHistory.thongTinDatVe?.map((seat, index) => {
          return (
            <div className="p-3 col-12 col-lg-4 col-md-6 col-md-6" key={index}>
              <HistoryBookingItem seat={seat} />
              {/* <div
                className="row m-0 pt-3 pb-3 border rounded"
                style={{ height: "150px" }}
              >
                <div className="col-3 m-0 p-0 d-flex justify-content-center align-items-center">
                  <img
                    src={seat.hinhAnh}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                    }}
                    alt="..."
                  />
                </div>
                <div
                  className="col-9 m-0 p-0"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      color: "var(--primary_color)",
                      fontSize: "1.5rem",
                    }}
                    className="text-xs font-weight-bold  mb-1"
                  >
                    {seat.tenPhim}
                  </div>
                  <div className="h5 mb-0  text-gray-800">
                    {`Giờ Chiếu: ${moment(seat.ngayDat).format(
                      "hh:mm A"
                    )} - Ngày Chiếu: ${moment(seat.ngayDat).format(
                      "DD-MM-YYYY"
                    )}`}
                  </div>
                  <div>
                    <span className="h5">Địa Điểm: </span>
                    {_.first(seat.danhSachGhe).tenHeThongRap}
                  </div>
                  <div>
                    <span className="h5">Rạp: </span>
                    {_.first(seat.danhSachGhe).tenCumRap}
                  </div>
                  <div>
                    <span className="h5">Ghế: </span>

                    {seat.danhSachGhe.map((ghe, index) => {
                      if (index < 10) {
                        return (
                          <span
                            style={{
                              display: "inline-block",
                              color: "var(--primary_color)",
                              margin: "0 2px",
                              fontWeight: "500",
                            }}
                            key={index}
                          >
                            {"[" + ghe.tenGhe + "]"}
                          </span>
                        );
                      } else {
                        if (index + 1 === seat.danhSachGhe.length) {
                          return (
                            <span
                              style={{ display: "inline-block" }}
                              key={index}
                            >
                              ...
                            </span>
                          );
                        }
                      }
                    })}
                  </div>
                </div>
              </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};
