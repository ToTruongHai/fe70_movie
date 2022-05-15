import React from "react";
import { NavLink } from "react-router-dom";
import { OPEN_FORM } from "../../redux/actions/types/modalType";
import Login from "../Login/Login";
import ButtonPrimaryOutline from "../Elements/ButtonPrimaryOutline/ButtonPrimary";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

export default React.memo((props) => {
  const { userLogin } = useSelector((a) => a.quanLyNguoiDungReducer);
  const dispatch = useDispatch();

  if (userLogin) {
    return (
      <NavLink
        to={`/checkout/${props.item.maLichChieu}`}
        className={props.className}
      >
        <ButtonPrimaryOutline className="px-0">
          {moment(props.item.ngayChieuGioChieu).format("hh:mm A")}
        </ButtonPrimaryOutline>
      </NavLink>
    );
  } else {
    return (
      <a
        data-toggle="modal"
        data-target="#modelId"
        className={props.className}
        onClick={(event) => {
          event.preventDefault();
          const action = {
            type: OPEN_FORM,
            component: <Login />,
            titleModal: "Đăng nhập",
            typeModal: "column",
          };
          dispatch(action);
        }}
      >
        <ButtonPrimaryOutline className="px-0">
          {moment(props.item.ngayChieuGioChieu).format("hh:mm A")}
        </ButtonPrimaryOutline>
      </a>
    );
  }
});
