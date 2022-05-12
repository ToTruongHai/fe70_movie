import { DatePicker, Form, InputNumber, Select } from "antd";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMovieTheaterAction,
  getTheaterCluster,
  taoLichChieuAction,
} from "../../../redux/actions/quanLyRapAction";
import { SET_FUNCTION } from "../../../redux/actions/types/modalType";
import moment from "moment";
const { Option } = Select;
export default function ShowtimesForm(props) {
  const { movieTheaterList, theaterClusters } = useSelector(
    (a) => a.quanLyRapReducer
  );
  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: props.id,
      ngayChieuGioChieu: "",
      maRap: null,
      maCumRap: null,
      giaVe: null,
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(taoLichChieuAction(values));
    },
  });
  useEffect(() => {
    dispatch(getAllMovieTheaterAction());
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
        <Form.Item label="Hệ thống rạp" labelAlign="left" required>
          <Select
            showSearch
            placeholder="Hệ thống rạp"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={(value) => {
              formik.setFieldValue("maRap", null);
              formik.setFieldValue("maCumRap", value);
              dispatch(getTheaterCluster(value));
            }}
            value={formik.values.maCumRap}
          >
            {movieTheaterList.map((item, index) => {
              return (
                <Option key={index} value={item.maHeThongRap}>
                  {item.tenHeThongRap}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="Rạp" labelAlign="left" required>
          <Select
            showSearch
            placeholder="Rạp"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            value={formik.values.maRap}
            onChange={(value) => {
              formik.setFieldValue("maRap", value);
            }}
          >
            {theaterClusters.map((item, index) => {
              return (
                <Option key={index} value={item.maCumRap}>
                  {item.tenCumRap}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="Ngày chiếu giờ chiếu" labelAlign="left" required>
          <DatePicker
            showTime
            placeholder="dd/mm/yyyy hh:mm:ss"
            format="DD/MM/YYYY HH:mm:ss"
            onChange={(value) => {
              formik.setFieldValue(
                "ngayChieuGioChieu",
                value.format("DD/MM/YYYY HH:mm:ss")
              );
            }}
          />
        </Form.Item>
        <Form.Item label="Giá vé" labelAlign="left" required>
          <InputNumber
            min="75000"
            max="200000"
            value={formik.values.giaVe}
            onChange={(value) => {
              formik.setFieldValue("giaVe", value);
            }}
          />
        </Form.Item>
      </Form>
    </div>
  );
}
