import React, { useEffect } from "react";
import PageWrapper from "../../templates/pageWrapper";
import ProfilePane from "../../Components/Profile/ProfilePane";
import HomeBanner from "../../Components/HomeBanner/HomeBanner";
import { Redirect } from "react-router-dom";
import { USER_LOGIN } from "../../util/setting";
import { useDispatch, useSelector } from "react-redux";
import { getUserSeatHistory } from "../../redux/actions/quanLyNguoiDungAction";

export default function Profile() {
  let { userSeatHistory } = useSelector((a) => a.quanLyNguoiDungReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserSeatHistory());
    if (!localStorage.getItem(USER_LOGIN)) {
      return <Redirect to="/" />;
    }
  }, []);
  console.log(userSeatHistory);
  return (
    <React.Fragment>
      <HomeBanner />
      <PageWrapper arrComponent={[ProfilePane]} />
    </React.Fragment>
  );
}
