import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../assets/styles/HomeHeader/HomeHeader.module.css";
import React, { useEffect, useRef, useState } from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { logoutAction } from "../../redux/actions/quanLyNguoiDungAction";
import Swal from "sweetalert2";
import { history, USER_LOGIN } from "../../util/setting";
import logo from "../../assets/images/logo.png";
import { OPEN_FORM } from "../../redux/actions/types/modalType";
import Search from "antd/lib/input/Search";
import { Avatar, Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Header } from "antd/lib/layout/layout";

export default function HomeHeader() {
  const dispatch = useDispatch();

  let { userLogin } = useSelector((a) => a.quanLyNguoiDungReducer);
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <NavLink to="/profile">Thông tin cá nhân</NavLink>
      </Menu.Item>
      {userLogin.maLoaiNguoiDung == "QuanTri" && (
        <Menu.Item key="2">
          <NavLink to="/admin/movie">Trang quản trị</NavLink>
        </Menu.Item>
      )}

      <Menu.Item key="3">
        <NavLink
          to="/"
          onClick={(event) => {
            event.preventDefault();
            Swal.fire({
              title: "Bạn chắc chắn muốn đăng xuất?",
              icon: "warning",
              showCancelButton: true,
              showConfirmButton: true,
              confirmButtonText: "Đăng xuất",
              cancelButtonText: "Hủy",
            }).then((result) => {
              if (result.isConfirmed) {
                dispatch(logoutAction());
                Swal.fire({
                  title: "Đăng xuất thành công",
                  icon: "success",
                  showConfirmButton: false,
                });
              }
            });
          }}
        >
          Đăng xuất
        </NavLink>
      </Menu.Item>
    </Menu>
  );

  const renderLogin = () => {
    if (userLogin) {
      if (window.innerWidth < 768) {
        return (
          <React.Fragment>
            <li className="nav-item active">
              <NavLink exact className="nav-link" to="/profile">
                {userLogin.hoTen}
              </NavLink>
            </li>
            {userLogin.maLoaiNguoiDung == "QuanTri" && (
              <li className={`nav-item `}>
                <NavLink exact className="nav-link" to="/admin/movie">
                  Trang quản trị
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink
                exact
                className="nav-link"
                to=""
                onClick={(e) => {
                  e.preventDefault();
                  Swal.fire({
                    title: "Bạn chắc chắn muốn đăng xuất?",
                    icon: "warning",
                    showCancelButton: true,
                    showConfirmButton: true,
                    confirmButtonText: "Đăng xuất",
                    cancelButtonText: "Hủy",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      dispatch(logoutAction());
                      Swal.fire({
                        title: "Đăng xuất thành công",
                        icon: "success",
                        showConfirmButton: false,
                      });
                    }
                  });
                }}
              >
                Đăng xuất
              </NavLink>
            </li>
          </React.Fragment>
        );
      } else {
        return (
          <Header
            className="site-layout-background d-flex justify-content-end align-items-center"
            style={{ padding: 0, background: "#fff" }}
            theme="light"
          >
            <Avatar
              style={{
                backgroundColor: "#f26b38",
              }}
              icon={<UserOutlined />}
              className="mr-2"
            />
            <Dropdown placement="bottomRight" className="mr-4" overlay={menu}>
              <span className="btn btn-lg">{userLogin.hoTen}</span>
            </Dropdown>
          </Header>
        );
      }
    } else {
      return (
        <React.Fragment>
          <button
            className={`btn ${styles.btnHeader}`}
            data-toggle="modal"
            data-target="#modelId"
            onClick={() => {
              const action = {
                type: OPEN_FORM,
                component: <Login />,
                // Component: Login,
                titleModal: "Đăng nhập",
                typeModal: "column",
              };
              dispatch(action);
            }}
          >
            Đăng nhập
          </button>
          <button
            className="btn btn-outline-success"
            data-toggle="modal"
            data-target="#modelId"
            onClick={() => {
              const action = {
                type: OPEN_FORM,
                component: <Register />,
                typeModal: true,
                titleModal: "Đăng ký",
                typeModal: "column",
                // maxWidth: 80,
                handleSubmit: () => {
                  console.log("register sumbit");
                },
              };
              dispatch(action);
            }}
          >
            Đăng ký
          </button>
        </React.Fragment>
      );
    }
  };
  const onSearch = (value) => {
    history.push(`/search/${value}`);
  };

  const renderLink = () => {
    if (window.innerWidth < 768) {
      return (
        <React.Fragment>
          <li className="nav-item">
            <a
              onClick={() => {
                document.querySelector("#movieList").scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              Lịch Chiếu
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick={() => {
                document.querySelector("#movieTheater").scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              Cụm Rạp
            </a>
          </li>
        </React.Fragment>
      );
    } else {
      return (
        <div className={`${styles.navBar_link}`}>
          <li className="nav-item">
            <a
              onClick={() => {
                document.querySelector("#movieList").scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              Lịch Chiếu
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick={() => {
                document.querySelector("#movieTheater").scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              Cụm Rạp
            </a>
          </li>
        </div>
      );
    }
  };
  return (
    <React.Fragment>
      {/* Home Navbar */}
      <nav className={`navbar navbar-expand-md p-0 ${styles.navBar_shadowBox}`}>
        {/* Logo */}
        <NavLink className="navbar-brand" to="/">
          <img
            src={logo}
            alt=""
            className={styles.logo}
            style={{ margin: "0 0 0 10px" }}
          />
        </NavLink>
        {/* Search */}
        <div className={`${styles.navBar_search}`}>
          <div
            className=""
            style={{ minWidth: "100px", maxWidth: "300px", width: "100%" }}
          >
            <Search
              placeholder="Nhập tên phim"
              enterButton
              onSearch={onSearch}
            />
          </div>
        </div>

        {/* collapse button */}
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{
            lineHeight: "2",
            border: "1px solid black",
            marginRight: "10px",
          }}
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="collapsibleNavId"
        >
          <ul className={`navbar-nav ${styles.navHome}`}>
            {/* Home Link */}
            {renderLink()}

            {/* Login */}
            {renderLogin()}
            {/* {userLogin.maLoaiNguoiDung == "QuanTri" && (
              <li className={`nav-item active ${styles.quanTri_li}`}>
                <NavLink exact className="nav-link" to="/admin/movie">
                  Trang quản trị
                </NavLink>
              </li>
            )} */}
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
}
