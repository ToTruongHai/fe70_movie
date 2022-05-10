import { Form, Input, Select } from "antd";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminAddUserAction,
  adminEditUserInfoAction,
  adminGetUserInfoAction,
  adminGetUserTypeAction,
} from "../../../redux/actions/quanLyNguoiDungAction";
import { SET_FUNCTION } from "../../../redux/actions/types/modalType";

const UserForm = (props) => {
  const edit = props.edit;
  const dispatch = useDispatch();
  let { userForm, userType } = useSelector(
    (rootReducer) => rootReducer.quanLyNguoiDungReducer
  );

  useEffect(() => {
    dispatch({
      type: SET_FUNCTION,
      handleSubmit: () => {
        formik.handleSubmit();
      },
    });
    dispatch(adminGetUserTypeAction());
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: edit ? userForm.taiKhoan : "",
      matKhau: edit ? userForm.matKhau : "",
      email: edit ? userForm.email : "",
      soDt: edit ? userForm.soDT : "",
      maNhom: "GP01",
      maLoaiNguoiDung: edit ? userForm.maLoaiNguoiDung : "KhachHang",
      hoTen: edit ? userForm?.hoTen : "",
    },

    onSubmit: (values) => {
      let formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }
      for (var data of formData.entries()) {
        console.log(data[0] + ", " + data[1]);
      }
      if (edit) {
        dispatch(adminEditUserInfoAction(formData));
      } else {
        dispatch(adminAddUserAction(formData));
      }
    },
  });

  const handleUserTypeChange = (name, e) => {
    // console.log("name", name);
    // console.log("e", e);
    console.log("asdajsdkljaskl", name);

    formik.setFieldValue("maLoaiNguoiDung", name);
  };

  return (
    <div className="container">
      <Form
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
            disabled={edit}
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

        <Form.Item
          label="Loại người dùng"
          required
          rules={[
            {
              required: true,
              message: "Loại người dùng không được để trống!",
            },
          ]}
        >
          <Select
            onSelect={(name, event) => handleUserTypeChange(name, event)}
            value={formik.values.maLoaiNguoiDung}
            placeholder="Chọn loại người dùng"
          >
            {userType?.map((type, index) => {
              return (
                <Select.Option key={index} value={type.maLoaiNguoiDung}>
                  {type.tenLoai}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserForm;
