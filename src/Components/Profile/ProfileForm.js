import { Form, Input } from "antd";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminGetUserInfoAction,
  getUserSeatHistory,
} from "../../redux/actions/quanLyNguoiDungAction";
import { GP } from "../../util/setting";
import UserForm from "../Admin/User/UserForm";

export default function ProfileForm() {
  let { userSeatHistory } = useSelector((a) => a.quanLyNguoiDungReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserSeatHistory());
  }, []);
  console.log(userSeatHistory);

  // const formik = useFormik({
  //   enableReinitialize: true,
  //   initialValues: {
  //     taiKhoan: userSeatHistory.taiKhoan,
  //     matKhau: userSeatHistory.matKhau,
  //     email: userSeatHistory.email,
  //     soDt: userSeatHistory.soDT,
  //     maLoaiNguoiDung: userSeatHistory.maLoaiNguoiDung,
  //     hoTen: userSeatHistory?.hoTen,
  //   },

  //   onSubmit: (values) => {
  //     console.log(values);
  //     // let formData = new FormData();
  //     // for (let key in values) {
  //     //   formData.append(key, values[key]);
  //     // }
  //     // for (var data of formData.entries()) {
  //     //   console.log(data[0] + ", " + data[1]);
  //     // }
  //     // if (edit) {
  //     //   dispatch(adminEditUserInfoAction(formData));
  //     // } else {
  //     //   dispatch(adminAddUserAction(formData));
  //     // }
  //   },
  // });
  return (
    <div className="container">
      <div className="row">
        <h2 className="text-center">THÔNG TIN NGƯỜI DÙNG</h2>
        <div className="container">
          {/* <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            size="large"
            onSubmitCapture={formik.handleSubmit}
          >
            <Form.Item
              label="Tài khoản"
              required
              rules={[
                {
                  required: true,
                  message: "Tài khoản không được để trống!",
                },
              ]}
            >
              <Input
                name="taiKhoan"
                onChange={formik.handleChange}
                value={formik.values.taiKhoan}
                disabled={false}
              />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              required
              rules={[
                {
                  required: true,
                  message: "Mật khẩu không được để trống!",
                },
              ]}
            >
              <Input.Password
                name="matKhau"
                onChange={formik.handleChange}
                value={formik.values.matKhau}
              />
            </Form.Item>

            <Form.Item
              label="Họ tên"
              tooltip="Tên mọi người thường gọi bạn là gì?"
              required
              rules={[
                {
                  required: true,
                  message: "Họ tên không được để trống!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                name="hoTen"
                onChange={formik.handleChange}
                value={formik.values.hoTen}
              />
            </Form.Item>
            <Form.Item
              label="E-mail"
              required
              rules={[
                {
                  type: "email",
                  message: "E-mail không hợp lệ!",
                },
                {
                  required: true,
                  message: "E-mail không được để trống!",
                },
              ]}
            >
              <Input
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </Form.Item>

            <Form.Item label="Số điện thoại">
              <Input
                name="soDt"
                onChange={formik.handleChange}
                value={formik.values.soDt}
              />
            </Form.Item>
          </Form> */}
        </div>
      </div>
    </div>
  );
}
