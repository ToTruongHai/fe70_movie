import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Tooltip } from "antd";
import {
  getMovieListAction,
  layThongTinPhimAction,
  xoaPhimAction,
  xoaPhimsAction,
} from "../../../redux/actions/quanLyPhimAction";
import Swal from "sweetalert2";
import MovieForm from "../../../Components/Admin/Movie/MovieForm";
// import { usePrevious } from "react-use";
import { OPEN_FORM } from "../../../redux/actions/types/modalType";
import { LOAD_COMPONENT } from "../../../redux/actions/types/adminTemplateType";
import { NavLink } from "react-router-dom";
const { Search } = Input;

function Movie() {
  let { selectedRowKeys } = useSelector((a) => a.adminTemplateReducer);
  let { movieList } = useSelector((a) => a.quanLyPhimReducer);

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
            <Tooltip
              placement="topLeft"
              title="Cập nhật phim"
              key={film.maPhim + "1"}
            >
              <button
                className="btn btn-warning btn-lg"
                data-toggle="modal"
                data-target="#modelId"
                onClick={() => {
                  dispatch(layThongTinPhimAction(film.maPhim));
                  const action = {
                    type: OPEN_FORM,
                    component: <MovieForm edit={true} maPhim={film.maPhim} />,
                    titleModal: "Cập nhật phim",
                    maxWidth: 75,
                    typeModal: "",
                  };
                  dispatch(action);
                }}
              >
                <i className="fa-solid fa-gear"></i>
              </button>
            </Tooltip>
            <Tooltip placement="top" title="Xóa phim" key={film.maPhim + "2"}>
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
                    }
                  });
                }}
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </Tooltip>
            <Tooltip
              placement="topRight"
              title="Danh sách lịch chiếu"
              key={film.maPhim + "3"}
            >
              <NavLink
                to={`/admin/showtimes/${film.maPhim}`}
                className="btn btn-primary btn-lg ml-3"
              >
                <i className="fa-solid fa-list"></i>
              </NavLink>
            </Tooltip>
          </React.Fragment>
        );
      },
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovieListAction());

    let dataSource = movieList
      .map((item) => {
        return { ...item, key: item.maPhim };
      })
      .reverse();
    let buttons = [
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
            typeModal: "",
          };
          dispatch(action);
        }}
      >
        Thêm mới
      </Button>,
    ];
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
  // console.log("load lại trang movie");
  useEffect(() => {
    let buttons = [
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
            typeModal: "",
          };
          dispatch(action);
        }}
      >
        Thêm mới
      </Button>,
    ];
    dispatch({
      type: LOAD_COMPONENT,
      payload: {
        buttons,
      },
    });
  }, [selectedRowKeys]);
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

export default memo(Movie);
