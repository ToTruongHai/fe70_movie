import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Upload,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { SET_FUNCTION } from "../../../redux/actions/types/modalType";
import moment from "moment";

const MovieForm = () => {
  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };
  // let [fileList, setFileList] = useState([]);
  // const uploadButton = !fileList.length ? (
  //   <div>
  //     <PlusOutlined />
  //     <div style={{ marginTop: 8 }}>Upload</div>
  //   </div>
  // ) : (
  //   ""
  // );

  const formik = useFormik({
    initialValues: {
      maPhim: 0,
      tenPhim: "",
      biDanh: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      sapChieu: false,
      dangChieu: true,
      hot: true,
      hinhAnh: {},
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };
  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: SET_FUNCTION,
      handleSubmit: () => {
        formik.handleSubmit();
      },
    });
  }, []);
  return (
    <div className="px-5 container">
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
        <div className="row">
          <div className="col-md-6">
            <Form.Item label="Tên phim" labelAlign="left" required>
              <Input
                placeholder="Tên phim"
                name="tenPhim"
                onChange={formik.handleChange}
              />
            </Form.Item>

            <Form.Item label="Trailer" labelAlign="left">
              <Input
                placeholder="Trailer"
                name="trailer"
                onChange={formik.handleChange}
              />
            </Form.Item>
            <Form.Item
              name="hinhAnh"
              label="Hình ảnh"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              labelAlign="left"
              required
            >
              <Upload
                name="logo"
                maxCount="1"
                // action={(value) => {
                //   console.log(value);
                // }}
                listType="picture"
                onPreview={false}
                onRemove={() => {
                  formik.setFieldValue("hinhAnh", {});
                }}
                onChange={(file) => {
                  formik.setFieldValue("hinhAnh", file);
                }}
              >
                {/* {uploadButton} */}
                {/* {fileList.length ? null : uploadButton} */}
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item label="Bí danh" labelAlign="left">
              <Input
                placeholder="Bí danh"
                name="biDanh"
                onChange={formik.handleChange}
              />
            </Form.Item>
            <Form.Item label="Ngày khởi chiếu" labelAlign="left" required>
              <DatePicker
                placeholder="Ngày khởi chiếu"
                format={"DD/MM/YYYY"}
                // name="ngayKhoiChieu"
                onChange={handleChangeDatePicker}
              />
            </Form.Item>
            <Form.Item label="Mô tả" labelAlign="left">
              <Input.TextArea
                placeholder="Mô tả"
                allowClear
                name="moTa"
                onChange={formik.handleChange}
              />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-sm-6">
            <Form.Item label="Hot" labelAlign="left">
              <Switch onChange={handleChangeSwitch("hot")} />
            </Form.Item>
          </div>
          <div className="col-md-3 col-sm-6">
            <Form.Item label="Đang chiếu" labelAlign="left">
              <Switch onChange={handleChangeSwitch("dangChieu")} />
            </Form.Item>
          </div>
          <div className="col-md-3 col-sm-6">
            <Form.Item label="Sắp chiếu" labelAlign="left">
              <Switch onChange={handleChangeSwitch("sapChieu")} />
            </Form.Item>
          </div>
          {/* <div
            className="col-12 py-3 text-center  border-top"
            style={{
              borderColor: "#e9ecef !important",
            }}
          >
            <ButtonPrimary className="font-weight-bold">Lưu</ButtonPrimary>
          </div> */}
        </div>
      </Form>
    </div>
  );
};

export default MovieForm;
