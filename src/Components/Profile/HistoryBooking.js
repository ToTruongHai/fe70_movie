import React from "react";
import { useSelector } from "react-redux";
import HistoryBookingItem from "../Elements/HistoryBookingItem";

export default function HistoryBooking() {
  const { userSeatHistory } = useSelector(
    (rootReducer) => rootReducer.quanLyNguoiDungReducer
  );
  return (
    <div className="container">
      <h2 className="text-center">LỊCH SỬ ĐẶT VÉ</h2>
      <div className="row">
        {userSeatHistory.thongTinDatVe?.map((seat, index) => {
          return (
            <div className="p-3 col-12 col-md-6" key={index}>
              <HistoryBookingItem seat={seat} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
