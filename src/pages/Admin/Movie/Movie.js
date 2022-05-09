import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, PageHeader, Input, Table } from "antd";
import {
  getDataAdminPhimsAction,
  getMovieListAction,
  layThongTinPhimAction,
  xoaPhimAction,
  xoaPhimsAction,
} from "../../../redux/actions/quanLyPhimAction";
import Swal from "sweetalert2";
import MovieForm from "../../../Components/Admin/Movie/MovieForm";
import { usePrevious } from "react-use";
import { OPEN_FORM } from "../../../redux/actions/types/modalType";
const { Search } = Input;

export default function Movie() {
  const dispatch = useDispatch();

  // let [soTrang, setSoTrang] = useState(1);
  // let [soPhanTuTrenTrang, setSoPhanTuTrenTrang] = useState(10);
  let { movieList } = useSelector((a) => a.quanLyPhimReducer);
  let [arrPhims, setArrPhims] = useState([]);
  let [selectedRowKeyss, setSelectedRowKeys] = useState([]);
  // let [filter, setFilter] = useState("");
  useEffect(() => {
    dispatch(getMovieListAction());
  }, []);
  useEffect(() => {
    setArrPhims(movieList);
  }, [movieList]);
  // const prevFilter = usePrevious(filter);
  // useEffect(() => {
  //   if (prevFilter != filter) {
  //     setSoTrang(1);
  //   }
  //   dispatch(getDataAdminPhimsAction(filter, soTrang, soPhanTuTrenTrang));
  // }, [filter, soTrang]);
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
            dispatch(xoaPhimsAction(selectedRowKeyss));
            // Swal.fire({
            //   title: "Xóa thành công",
            //   icon: "success",
            //   showConfirmButton: false,
            // });
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
  const onSearch = (value) => {
    // setFilter(value);
    dispatch(getMovieListAction(value));
  };

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

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeyss,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };
  // const handleTableChange = (pagination) => {
  //   setSoTrang(pagination.current);
  // };

  return (
    <React.Fragment>
      <PageHeader
        ghost={false}
        title="Quản lý phim"
        extra={buttons}
      ></PageHeader>
      <div className="">
        <div className="card-body filter-wrapper bg-white my-3">
          <Search placeholder="Tên phim" onSearch={onSearch} enterButton />
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={arrPhims
            .map((item) => {
              return { ...item, key: item.maPhim };
            })
            .reverse()}
          // pagination={{
          //   current: soTrang,
          //   pageSize: soPhanTuTrenTrang,
          //   total: totalCount,
          // }}
          // onChange={handleTableChange}
        />
      </div>
    </React.Fragment>
  );
}
