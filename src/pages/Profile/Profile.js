import React, { useEffect } from "react";
import PageWrapper from "../../templates/pageWrapper";
import ProfilePane from "../../Components/Profile/ProfilePane";
import HomeBanner from "../../Components/HomeBanner/HomeBanner";
import { Redirect } from "react-router-dom";
import { USER_LOGIN } from "../../util/setting";
import { useDispatch } from "react-redux";
import { getUserSeatHistory } from "../../redux/actions/quanLyNguoiDungAction";

export default function Profile() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem(USER_LOGIN)) {
      dispatch(getUserSeatHistory());
    }
  }, []);
  if (!localStorage.getItem(USER_LOGIN)) {
    return <Redirect to="/" />;
  }
  return (
    <React.Fragment>
      <HomeBanner />
      <PageWrapper arrComponent={[ProfilePane]} />
    </React.Fragment>
  );
}
