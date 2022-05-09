import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "antd";
import {
  getMovieListAction,
  layThongTinPhimAction,
  xoaPhimAction,
  xoaPhimsAction,
} from "../../../redux/actions/quanLyPhimAction";
import Swal from "sweetalert2";
import MovieForm from "../../../Components/Admin/Movie/MovieForm";
import { OPEN_FORM } from "../../../redux/actions/types/modalType";
import { LOAD_COMPONENT } from "../../../redux/actions/types/adminTemplateType";
const { Search } = Input;

export default function Movie() {
  const buttons = [
    <Button
      key="2"
      type="danger"
      onClick={() => {
        Swal.fire({
          title: "Bạn chắc chắn muốn xóa những phim này?",
          icon: "warning",
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonText: "Xóa",
          cancelButtonText: "Hủy",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(xoaPhimsAction(selectedRowKeys));
          }
        });
      }}
    >
      Xóa
    </Button>,
    <Button
      key="1"
      type="primary"
      data-toggle="modal"
      data-target="#modelId"
      onClick={() => {
        const action = {
          type: OPEN_FORM,
          component: <MovieForm edit={false} />,
          titleModal: "Thêm phim",
          maxWidth: 75,
        };
        dispatch(action);
      }}
    >
      Thêm mới
    </Button>,
  ];

  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      sortDirection: ["descend", "ascend"],
      sorter: (a, b) => a.maPhim - b.maPhim,
      align: "center",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (src) => {
        return (
          <img
            src={src}
            width={50}
            height={75}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://is1-ssl.mzstatic.com/image/thumb/Purple114/v4/dd/5d/3c/dd5d3cc0-f63b-1ce9-498d-9437ab10795e/source/60x60bb.jpg";
            }}
          />
        );
      },
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      sortDirection: ["descend", "ascend"],
      sorter: (a, b) =>
        a.tenPhim.toLowerCase().trim() > b.tenPhim.toLowerCase().trim(),
      width: "20%",
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      render: (item) =>
        item.length > 100 ? item.substr(0, 100) + "..." : item,
      width: "25%",
    },
    {
      title: "",
      dataIndex: "",
      align: "right",
      render: (text, film) => {
        return (
          <React.Fragment>
            <button
              className="btn btn-warning btn-lg"
              data-toggle="modal"
              data-target="#modelId"
              key={film.maPhim + "1"}
              onClick={() => {
                dispatch(layThongTinPhimAction(film.maPhim));
                const action = {
                  type: OPEN_FORM,
                  component: <MovieForm edit={true} maPhim={film.maPhim} />,
                  titleModal: "Cập nhật phim",
                  maxWidth: 75,
                };
                dispatch(action);
              }}
            >
              <i className="fa-solid fa-gear"></i>
            </button>
            <button
              className="btn btn-danger btn-lg ml-3"
              onClick={() => {
                Swal.fire({
                  title: "Bạn chắc chắn muốn xóa phim này?",
                  icon: "warning",
                  showCancelButton: true,
                  showConfirmButton: true,
                  confirmButtonText: "Xóa",
                  cancelButtonText: "Hủy",
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(xoaPhimAction(film.maPhim));
                    // Swal.fire({
                    //   title: "Xóa thành công",
                    //   icon: "success",
                    //   showConfirmButton: false,
                    // });
                  }
                });
              }}
              key={film.maPhim + "2"}
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </React.Fragment>
        );
      },
    },
  ];

  const dispatch = useDispatch();

  let { movieList } = useSelector((a) => a.quanLyPhimReducer);
  let { selectedRowKeys } = useSelector((a) => a.adminTemplateReducer);
  useEffect(() => {
    dispatch(getMovieListAction());
    let dataSource = movieList
      .map((item) => {
        return { ...item, key: item.maPhim };
      })
      .reverse();
    dispatch({
      type: LOAD_COMPONENT,
      payload: {
        title: "Quản lý phim",
        buttons,
        columns,
        dataSource,
        selectedRowKeys: [],
      },
    });
  }, []);
  useEffect(() => {
    let dataSource = movieList
      .map((item) => {
        return { ...item, key: item.maPhim };
      })
      .reverse();
    dispatch({
      type: LOAD_COMPONENT,
      payload: {
        dataSource,
      },
    });
  }, [movieList]);
  // const prevFilter = usePrevious(filter);

  const onSearch = (value) => {
    // setFilter(value);
    dispatch(getMovieListAction(value));
  };

  return (
    <React.Fragment>
      <div className="">
        <div className="card-body filter-wrapper bg-white my-3">
          <Search placeholder="Tên phim" onSearch={onSearch} enterButton />
        </div>
      </div>
    </React.Fragment>
  );
}
