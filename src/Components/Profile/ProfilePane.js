import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import ProfileForm from "../../Components/Profile/ProfileForm";
import HistoryBooking from "./HistoryBooking";
import { KetQuaDatVe } from "../../pages/Checkout/Checkout";

const { TabPane } = Tabs;

export default function ProfilePane() {
  const [widthSize, setWidthSize] = useState(0);
  const changeSizeWindow = () => {
    let { innerWidth } = window;
    setWidthSize(innerWidth);
    console.log(innerWidth);
    // if (innerWidth > 800) {
    //   setTabPosition("left");
    // } else {
    //   setTabPosition("top");
    // }
  };
  useEffect(() => {
    window.addEventListener("resize", changeSizeWindow);
    window.onload = changeSizeWindow();
    return () => {
      window.removeEventListener("onload", null);
      window.removeEventListener("onresize", null);
    };
  }, []);

  return (
    <div className="row">
      <div className="col">
        <Tabs tabPosition={widthSize > 800 ? "left" : "top"} className="mt-5">
          <TabPane tab="Thông tin cá nhân" key="1">
            <ProfileForm />
          </TabPane>
          <TabPane tab="Lịch sử đặt vé" key="2">
            <HistoryBooking />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
