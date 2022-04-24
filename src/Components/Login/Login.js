import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import "../../assets/styles/Login/Login.css";
import ButtonPrimary from "../Elements/ButtonPrimary/ButtonPrimary";
import "../../assets/styles/Layout.css";
import { useDispatch } from "react-redux";
import Register from "../Register/Register";
import { loginAction } from "../../redux/actions/quanLyNguoiDungAction";

export default function Login() {
  let [values, setValues] = useState({ taiKhoan: "", matKhau: "" });
  let [errors, setErrors] = useState({ taiKhoan: "", matKhau: "" });
  const dispatch = useDispatch();
  const handleChangeInput = (event) => {
    let { name, value, placeholder } = event.target;
    let errorMess = "";
    if (value === "") {
      errorMess = placeholder + " không được để trống";
    }
    if (name === "taiKhoan") {
      if (value.length < 3 || value.length > 12) {
        errorMess = placeholder + " phải từ 3 đến 12 ký tự";
      }
    }
    setErrors({
      ...errors,
      [name]: errorMess,
    });
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleLogin = () => {
    const action = loginAction(values);
    dispatch(action);
  };
  useEffect(() => {}, []);
  return (
    <form
      className="loginForm"
      onSubmit={(event) => {
        event.preventDefault();
        handleLogin();
      }}
    >
      <div className="headerForm d-flex flex-column align-items-center">
        <img src={logo} alt="" width={75} height={75} className="mt-5 mb-5" />
        <h2 className="text-uppercase font-weight-bold display-4">đăng nhập</h2>
      </div>
      <div className="bodyForm px-5 py-2">
        <div>
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
        <div>
          <div className=" overflow-hidden position-relative mb-3">
            <input
              className="input"
              placeholder="Mật khẩu"
              type="password"
              name="matKhau"
              // onChange={formik.handleChange}
              onChange={handleChangeInput}
              value={values.matKhau}
            />
            <span className="underline" />
          </div>
          <p className="textPrimary">{errors.matKhau}</p>
        </div>
        <div className="text-center">
          <ButtonPrimary className="font-weight-bold">Đăng nhập</ButtonPrimary>
          <p className="mt-4">
            Chưa có tài khoản?{" "}
            <span
              className="textPrimary"
              style={{ cursor: "pointer" }}
              onClick={() => {
                const action = {
                  type: "OPEN_FORM",
                  component: <Register />,
                  titleModal: "Đăng ký",
                  // maxWidth: 80,
                  handleSubmit: () => {
                    console.log("đăng ký sumbit");
                  },
                };
                dispatch(action);
              }}
            >
              Đăng ký ngay!
            </span>
          </p>
        </div>
      </div>
    </form>
  );
}
