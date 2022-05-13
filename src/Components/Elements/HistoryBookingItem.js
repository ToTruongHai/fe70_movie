import React from "react";
import moment from "moment";
import _ from "lodash";
export default function HistoryBookingItem(props) {
  const { seat } = props;
  return (
    <div
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
          )} - Ngày Chiếu: ${moment(seat.ngayDat).format("DD-MM-YYYY")}`}
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
                  <span style={{ display: "inline-block" }} key={index}>
                    ...
                  </span>
                );
              }
            }
          })}
        </div>
      </div>
    </div>
  );
}
