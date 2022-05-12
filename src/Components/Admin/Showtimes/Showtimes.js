import React, { useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_COMPONENT } from "../../../redux/actions/types/adminTemplateType";
import { getMovieSchedule } from "../../../redux/actions/quanLyRapAction";
import moment from "moment";
import { Button } from "antd";
import ShowtimesForm from "./ShowtimesForm";
import { OPEN_FORM } from "../../../redux/actions/types/modalType";

export default function Showtimes(props) {
  const dispatch = useDispatch();
  let { movieSchedule } = useSelector((a) => a.quanLyRapReducer);
  const columns = [
    {
      title: "Mã lịch chiếu",
      dataIndex: "maLichChieu",
      sortDirection: ["descend", "ascend"],
      sorter: (a, b) => a.maLichChieu - b.maLichChieu,
      align: "center",
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      sortDirection: ["descend", "ascend"],
      sorter: (a, b) =>
        a.tenPhim.toLowerCase().trim() > b.tenPhim.toLowerCase().trim(),
      width: "30%",
    },
    {
      title: "Tên cụm rạp",
      dataIndex: "tenCumRap",
      sortDirection: ["descend", "ascend"],
      sorter: (a, b) =>
        a.tenCumRap.toLowerCase().trim() > b.tenCumRap.toLowerCase().trim(),
      width: "20%",
    },
    {
      title: "Thời gian chiếu",
      dataIndex: "ngayChieuGioChieu",
      width: "25%",
      align: "center",
      fixed: "right",
      sortDirection: ["descend", "ascend"],
      sorter: (a, b) => a.ngayChieuGioChieu > b.ngayChieuGioChieu,
    },
    {
      title: "Giá vé",
      dataIndex: "giaVe",
      sortDirection: ["descend", "ascend"],
      sorter: (a, b) => a.maLichChieu - b.maLichChieu,
      render: (value) => {
        return (
          <CurrencyFormat
            value={value}
            displayType={"text"}
            thousandSeparator={true}
            suffix={" VNĐ"}
          />
        );
      },
      width: "25%",
      fixed: "right",
    },
  ];
  useEffect(() => {
    console.log("load vào trang");
    dispatch(getMovieSchedule(props.match.params.id));
    let dataSource = [];
    const { tenPhim, heThongRapChieu } = movieSchedule;
    heThongRapChieu?.reduce((result, item) => {
      item.cumRapChieu.reduce((result_level1, lichChieus) => {
        lichChieus.lichChieuPhim.reduce((result_level2, lichChieu) => {
          dataSource.push({
            key: lichChieu.maLichChieu,
            maLichChieu: lichChieu.maLichChieu,
            giaVe: lichChieu.giaVe,
            ngayChieuGioChieu: moment(lichChieu.ngayChieuGioChieu).format(
              "DD/MM/YYYY HH:MM:ss"
            ),
            tenCumRap: lichChieus.tenCumRap,
            tenPhim,
          });
        }, []);
      }, []);
    }, []);
    dispatch({
      type: LOAD_COMPONENT,
      payload: {
        title: `Danh sách lịch chiếu - Phim ${String(tenPhim).trim()}`,
        columns,
        buttons: [
          <Button
            key="1"
            type="primary"
            data-toggle="modal"
            data-target="#modelId"
            onClick={() => {
              const action = {
                type: OPEN_FORM,
                component: <ShowtimesForm id={props.match.params.id} />,
                titleModal: "Tạo lịch chiếu",
                typeModal: "",
                maxWidth: 50,
              };
              dispatch(action);
            }}
          >
            Thêm mới
          </Button>,
        ],
        selectedRowKeys: [],
      },
    });
  }, []);
  useEffect(() => {
    console.log("render lại trang");
    console.log(movieSchedule);
    let dataSource = [];
    const { tenPhim, heThongRapChieu } = movieSchedule;
    heThongRapChieu?.reduce((result, item) => {
      item.cumRapChieu.reduce((result_level1, lichChieus) => {
        lichChieus.lichChieuPhim.reduce((result_level2, lichChieu) => {
          dataSource.push({
            key: lichChieu.maLichChieu,
            maLichChieu: lichChieu.maLichChieu,
            giaVe: lichChieu.giaVe,
            ngayChieuGioChieu: moment(lichChieu.ngayChieuGioChieu).format(
              "DD/MM/YYYY HH:MM:ss"
            ),
            tenCumRap: lichChieus.tenCumRap,
            tenPhim,
          });
        }, []);
      }, []);
    }, []);
    dispatch({
      type: LOAD_COMPONENT,
      payload: {
        dataSource,
        title: `Danh sách lịch chiếu - Phim ${String(tenPhim).trim()}`,
      },
    });
  }, [movieSchedule]);
  return <div className="mb-3"></div>;
}
