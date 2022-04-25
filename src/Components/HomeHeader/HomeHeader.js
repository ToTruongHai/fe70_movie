import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../assets/styles/HomeHeader/HomeHeader.module.css";
import React, { useEffect, useRef, useState } from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { logoutAction } from "../../redux/actions/quanLyNguoiDungAction";
import Swal from "sweetalert2";

export default function HomeHeader() {
  const dispatch = useDispatch();

  let { userLogin } = useSelector((a) => a.quanLyNguoiDungReducer);
  const renderLogin = () => {
    if (userLogin) {
      return (
        <React.Fragment>
          <li className="nav-item active">
            <NavLink exact className="nav-link" to="/profile">
              Thông tin người dùng
            </NavLink>
          </li>
          <li className="nav-item active">
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
        <React.Fragment>
          <button
            className="btn btn-outline-success"
            data-toggle="modal"
            data-target="#modelId"
            onClick={() => {
              const action = {
                type: "OPEN_FORM",
                component: <Login />,
                titleModal: "Đăng nhập",
                handleSubmit: () => {
                  console.log("login sumbit");
                },
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
                type: "OPEN_FORM",
                component: <Register />,
                titleModal: "Register",
                // maxWidth: 80,
                handleSubmit: () => {
                  console.log("register sumbit");
                },
              };
              dispatch(action);
            }}
          >
            Register
          </button>
        </React.Fragment>
      );
    }
  };
  return (
    <React.Fragment>
      <nav className={`navbar navbar-expand-sm`}>
        <NavLink className="navbar-brand" to="/">
          Movie
        </NavLink>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        />
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <NavLink
                // activeStyle={{ color: "orange" }}
                // activeClassName="bg-white"
                exact
                className="nav-link"
                to="/home"
              >
                Home
              </NavLink>
            </li>
            {/* <li className="nav-item">
            <a className="nav-link" href="#">
              Link
            </a>
          </li> */}
            {renderLogin()}
          </ul>
        </div>
      </nav>
      <nav className={`navbar navbar-expand-sm navbar-dark ${styles.bg_black}`}>
        <NavLink className="navbar-brand" to="/">
          Movie
        </NavLink>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        />
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <NavLink
                // activeStyle={{ color: "orange" }}
                // activeClassName="bg-white"
                exact
                className="nav-link"
                to="/home"
              >
                Home
              </NavLink>
            </li>
            {/* <li className="nav-item">
          <a className="nav-link" href="#">
            Link
          </a>
        </li> */}
          </ul>
          <button
            className="btn btn-outline-success text-white"
            data-toggle="modal"
            data-target="#modelId"
            onClick={() => {
              const action = {
                type: "OPEN_FORM",
                component: <Register />,
                titleModal: "Register",
                handleSubmit: () => {
                  console.log("register sumbit");
                },
              };
              dispatch(action);
            }}
          >
            Register
          </button>
        </div>
      </nav>
    </React.Fragment>
  );
}
