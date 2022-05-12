import React, { memo, useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { SET_FUNCTION } from "../../../redux/actions/types/modalType";
import moment from "moment";
import { alertWarning } from "../../../functions/alertFunctions";
import {
  capNhatPhimAction,
  layThongTinPhimAction,
  themPhimAction,
} from "../../../redux/actions/quanLyPhimAction";

const MovieForm = (props) => {
  // console.log("load lại form movie");
  const edit = props.edit;
  const dispatch = useDispatch();
  let { form } = useSelector((a) => a.quanLyPhimReducer);
  let [img, setImg] = useState("");

  useEffect(() => {
    dispatch({
      type: SET_FUNCTION,
      handleSubmit: () => {
        formik.handleSubmit();
      },
    });
  }, []);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: edit ? form.maPhim : 0,
      tenPhim: edit ? form.tenPhim : "",
      biDanh: edit ? form.biDanh : "",
      trailer: edit ? form.trailer : "",
      moTa: edit ? form.moTa : "",
      ngayKhoiChieu: edit ? moment(form.ngayKhoiChieu) : "",
      sapChieu: edit ? form.sapChieu : false,
      dangChieu: edit ? form.dangChieu : true,
      hot: edit ? form.hot : true,
      hinhAnh: edit ? form.hinhAnh : null,
    },

    onSubmit: (values) => {
      let formData = new FormData();
      // console.log(values.hinhAnh);
      for (let key in values) {
        if (key === "hinhAnh" && typeof values.hinhAnh == "Bolb") {
          // formData.append(
          //   key,
          //   values.hinhAnh.originFileObj,
          //   values.hinhAnh.name
          // );
          formData.append(key, values[key], values[key].name);
        } else if (key == "ngayKhoiChieu" && values[key]) {
          // if (values[key])
          formData.append(key, values[key].format("DD/MM/YYYY"));
        } else {
          formData.append(key, values[key]);
        }
      }
      // console.log(formData.get("hinhAnh"));
      if (edit) {
        dispatch(capNhatPhimAction(formData));
      } else {
        dispatch(themPhimAction(formData));
      }
    },
  });
  useEffect(() => {
    // console.log(props.edit);
    // console.log("bị loại lại", formik.values.hinhAnh);
    if (props.edit) {
      setImg(form.hinhAnh);
    } else {
      setImg("");
    }
  }, [formik.values.hinhAnh]);
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleChangeFile = async (e) => {
    let file = e.target.files[0];

    await formik.setFieldValue("hinhAnh", file);
    // console.log(formik.values.hinhAnh);
    if (file.type == "image/png" || file.type == "image/jpeg") {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        // console.log(e.target.result);
        setImg(e.target.result);
      };
    } else {
      alertWarning("Hình không đúng định dạng");
    }
  };

  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value, "DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };
  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

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
                value={formik.values.tenPhim}
              />
            </Form.Item>

            <Form.Item label="Trailer" labelAlign="left">
              <Input
                placeholder="Trailer"
                name="trailer"
                onChange={formik.handleChange}
                value={formik.values.trailer}
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
              <label htmlFor="upload" className="btn btn-primary btn-lg">
                Upload hình
              </label>
              <input
                type="file"
                style={{ display: "none" }}
                id="upload"
                onChange={handleChangeFile}
              />
              {img && (
                <img
                  src={img}
                  alt=""
                  width={100}
                  height={133}
                  className="d-block mt-3"
                />
              )}
              {/* <Upload
                name="logo"
                maxCount="1"
                // action={(value) => {
                // }}
                listType="picture"
                // onPreview={true}
                // fileList={fileList}
                // defaultFileList={[fileList]}
                onRemove={() => {
                  formik.setFieldValue("hinhAnh", null);
                }}
                beforeUpload={(file) => {
                  const isImg =
                    file.type === "image/png" || file.type === "image/jpeg";
                  if (!isImg) {
                    alertWarning("Hình ảnh không đúng dịnh dạng!");
                  }
                  return isImg || Upload.LIST_IGNORE;
                }}
                onChange={async (file) => {
                  await formik.setFieldValue("hinhAnh", file.file);
                  // setFileList(file.fileList);
                  return true;
                }}
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload> */}
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item label="Bí danh" labelAlign="left">
              <Input
                placeholder="Bí danh"
                name="biDanh"
                onChange={formik.handleChange}
                value={formik.values.biDanh}
              />
            </Form.Item>
            <Form.Item label="Ngày khởi chiếu" labelAlign="left" required>
              <DatePicker
                placeholder="Ngày khởi chiếu"
                format={"DD/MM/YYYY"}
                // name="ngayKhoiChieu"
                onChange={handleChangeDatePicker}
                value={
                  formik.values.ngayKhoiChieu
                    ? moment(formik.values.ngayKhoiChieu)
                    : ""
                }
              />
            </Form.Item>
            <Form.Item label="Mô tả" labelAlign="left">
              <Input.TextArea
                placeholder="Mô tả"
                allowClear
                name="moTa"
                onChange={formik.handleChange}
                value={formik.values.moTa}
              />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-sm-6">
            <Form.Item label="Hot" labelAlign="left">
              <Switch
                onChange={handleChangeSwitch("hot")}
                checked={formik.values.hot}
              />
            </Form.Item>
          </div>
          <div className="col-md-3 col-sm-6">
            <Form.Item label="Đang chiếu" labelAlign="left">
              <Switch
                onChange={handleChangeSwitch("dangChieu")}
                checked={formik.values.dangChieu}
              />
            </Form.Item>
          </div>
          <div className="col-md-3 col-sm-6">
            <Form.Item label="Sắp chiếu" labelAlign="left">
              <Switch
                onChange={handleChangeSwitch("sapChieu")}
                checked={formik.values.sapChieu}
              />
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default memo(MovieForm);
