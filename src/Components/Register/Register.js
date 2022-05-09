import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import "../../assets/styles/Login/Login.css";
import ButtonPrimary from "../Elements/ButtonPrimary/ButtonPrimary.js";
import "../../assets/styles/Layout.css";
import { useDispatch } from "react-redux";
import { GP } from "../../util/setting";
import { registerAction } from "../../redux/actions/quanLyNguoiDungAction";

export default function Register() {
  let dispatch = useDispatch();
  let [values, setValues] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: GP,
    hoTen: "",
  });
  let [errors, setErrors] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    hoTen: "",
  });
  const handleChangeInput = (event) => {
    let { name, value, placeholder } = event.target;
    validate(name, value, placeholder);
    setValues({
      ...values,
      [name]: value,
    });
  };
  const validate = async (name, value, placeholder) => {
    let errorMess = "";
    if (value === "") {
      errorMess = placeholder + " không được để trống";
    }
    if (name === "taiKhoan") {
      if (value.length < 3 || value.length > 12) {
        errorMess = placeholder + " phải từ 3 đến 12 ký tự";
      }
    }
    if (name === "email") {
      let regexEmail =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (!value.toLowerCase().match(regexEmail)) {
        errorMess = placeholder + " không đúng định dạng";
      }
    }
    if (name === "soDt") {
      let regexPhone = /((09|03|07|08|05)+([0-9]{8})\b)/g;
      if (!value.toLowerCase().match(regexPhone)) {
        errorMess = placeholder + " không đúng định dạng";
      }
    }
    setErrors(
      {
        ...errors,
        [name]: errorMess,
      }
      // console.log(errors)
    );
  };
  let handleRegister = async () => {
    let flag = false;
    for (let key in errors) {
      console.log(errors[key]);
      if (errors[key]) {
        flag = true;
      }
    }
    if (!flag) {
      dispatch(registerAction(values));
    }
  };
  return (
    <form
      className="loginForm"
      onSubmit={(event) => {
        event.preventDefault();
        handleRegister();
      }}
    >
      <div className="bodyForm px-5 py-2">
        <div className="row">
          <div className="px-lg-5 col-12">
            <div className=" overflow-hidden position-relative mb-3">
              <input
                className="input"
                placeholder="Tài khoản"
                type="text"
                name="taiKhoan"
                // onChange={formik.handleChange}
                onChange={handleChangeInput}
                value={values.taiKhoan}
              />
              <span className="underline" />
            </div>
            <p className="textPrimary">{errors.taiKhoan}</p>
          </div>
          <div className="px-lg-5 col-12">
            <div className=" overflow-hidden position-relative mb-3">
              <input
                className="input"
                placeholder="Mật khẩu"
                type="password"
                name="matKhau"
                onChange={handleChangeInput}
                value={values.matKhau}
              />
              <span className="underline" />
            </div>
            <p className="textPrimary">{errors.matKhau}</p>
          </div>
        </div>
        <div className="row">
          <div className="px-lg-5 col-12">
            <div className=" overflow-hidden position-relative mb-3">
              <input
                className="input"
                placeholder="Họ tên"
                type="text"
                name="hoTen"
                // onChange={formik.handleChange}
                onChange={handleChangeInput}
                value={values.hoTen}
              />
              <span className="underline" />
            </div>
            <p className="textPrimary">{errors.hoTen}</p>
          </div>
          <div className="px-lg-5 col-12">
            <div className=" overflow-hidden position-relative mb-3">
              <input
                className="input"
                placeholder="Email"
                type="text"
                name="email"
                onChange={handleChangeInput}
                value={values.email}
              />
              <span className="underline" />
            </div>
            <p className="textPrimary">{errors.email}</p>
          </div>
        </div>
        <div className="row">
          <div className="px-lg-5 col-12">
            <div className=" overflow-hidden position-relative mb-3">
              <input
                className="input"
                placeholder="Số điện thoại"
                type="text"
                name="soDt"
                // onChange={formik.handleChange}
                onChange={handleChangeInput}
                value={values.soDt}
              />
              <span className="underline" />
            </div>
            <p className="textPrimary">{errors.soDt}</p>
          </div>
        </div>
        <div className="text-center">
          <ButtonPrimary
            className="font-weight-bold"
            // handleClick={handleRegister}
          >
            Đăng ký
          </ButtonPrimary>
        </div>
      </div>
    </form>
  );
}
