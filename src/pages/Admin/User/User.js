import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "antd";

import Swal from "sweetalert2";
import MovieForm from "../../../Components/Admin/Movie/MovieForm";
import { OPEN_FORM } from "../../../redux/actions/types/modalType";
import { LOAD_COMPONENT } from "../../../redux/actions/types/adminTemplateType";
import { adminDeleteUserAction, adminDeleteUsersAction, adminGetUserInfoAction, adminGetUserListAction } from "../../../redux/actions/quanLyNguoiDungAction";
import UserForm from "../../../Components/Admin/User/UserForm";
const { Search } = Input;
export default function User() {
  const dispatch = useDispatch();

  const buttons = [
    <Button
      key="2"
      type="danger"
      onClick={() => {
        Swal.fire({
          title: "Bạn chắc chắn muốn xóa người dùng này?",
          icon: "warning",
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonText: "Xóa",
          cancelButtonText: "Hủy",
        }).then((result) => {
            if (result.isConfirmed) {
              dispatch(adminDeleteUsersAction(selectedRowKeys));
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
            component: <UserForm edit={false} />,
            titleModal: "Thêm người dùng",
            maxWidth: 40,
          };
          dispatch(action);
        }}
    >
      Thêm mới
    </Button>,
  ];

  const columns = [
    {
      title: "Tài Khoản",
      dataIndex: "taiKhoan",
      sortDirection: ["descend", "ascend"],
      sorter: (a, b) => a.taiKhoan?.toLowerCase().trim() > b.taiKhoan?.toLowerCase().trim(),
      align: "center",
    },
    {
      title: "Loại Người Dùng",
      dataIndex: "maLoaiNguoiDung",
      sortDirection: ["descend"],
      sorter: (a, b) => a.maLoaiNguoiDung?.length - b.maLoaiNguoiDung?.length,
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "soDt",
      //   sorter: (a, b) =>
      //     a.tenPhim.toLowerCase().trim() > b.tenPhim.toLowerCase().trim(),
      //   width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email?.toLowerCase().trim() > b.email?.toLowerCase().trim(),
      sortDirection: ["descend", "ascend"],

      //   render: (item) =>
      //     item.length > 100 ? item.substr(0, 100) + "..." : item,
      //   width: "25%",
    },
    {
      title: "",
      dataIndex: "",
      align: "right",
      render: (text, user) => {
        return (
          <React.Fragment>
            <button
              className="btn btn-warning btn-lg"
              data-toggle="modal"
              data-target="#modelId"
              key={user.taiKhoan + "1"}
                onClick={() => {
                  dispatch(adminGetUserInfoAction(user.taiKhoan));
                  const action = {
                    type: OPEN_FORM,
                    component: <UserForm edit={true} />,
                    titleModal: "Cập nhật người dùng",
                    maxWidth: 40,
                    typeModal: "",
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
                  title: "Bạn chắc chắn muốn xóa người dùng này?",
                  icon: "warning",
                  showCancelButton: true,
                  showConfirmButton: true,
                  confirmButtonText: "Xóa",
                  cancelButtonText: "Hủy",
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(adminDeleteUserAction(user.taiKhoan));
                    Swal.fire({
                      title: "Xóa thành công",
                      icon: "success",
                      showConfirmButton: false,
                    });
                  }
                });
              }}
              key={user.taiKhoan + "2"}
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </React.Fragment>
        );
      },
    },
  ];

  let { userList } = useSelector((a) => a.quanLyNguoiDungReducer);
  let { selectedRowKeys } = useSelector((a) => a.adminTemplateReducer);
  useEffect(() => {
    dispatch(adminGetUserListAction());
    let dataSource = userList
      ?.map((item) => {
        return { ...item, key: item.taiKhoan };
      })
      .reverse();
    dispatch({
      type: LOAD_COMPONENT,
      payload: {
        title: "Quản lý người dùng",
        buttons,
        columns,
        dataSource,
        selectedRowKeys: [],
      },
    });
  }, []);
  useEffect(() => {
    let dataSource = userList
      ?.map((item) => {
        return { ...item, key: item.taiKhoan };
      })
      .reverse();
    dispatch({
      type: LOAD_COMPONENT,
      payload: {
        dataSource,
      },
    });
  }, [userList]);
  // const prevFilter = usePrevious(filter);

  const onSearch = (value) => {
    // setFilter(value);
    dispatch(adminGetUserListAction(value));
  };

  return (
    <React.Fragment>
      <div className="">
        <div className="card-body filter-wrapper bg-white my-3">
          <Search
            placeholder="Tên Người Dùng"
            onSearch={onSearch}
            enterButton
          />
        </div>
      </div>
    </React.Fragment>
  );
}
