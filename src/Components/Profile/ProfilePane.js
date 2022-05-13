import React, { useState } from "react";
import styles from "../../assets/styles/HomeMovieList/HomeMovieList.module.css";
import { Tabs, Radio, Space } from "antd";
import ProfileForm from "../../Components/Profile/ProfileForm";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { USER_LOGIN } from "../../util/setting";

const { TabPane } = Tabs;

export default function ProfilePane() {
  const [tabPosition, setTabPosition] = useState("left");

  return (
    <div className="row">
      <div className="col">
        {/* <div className="tab-movies my-3">
          <div>
            <ul
              className={`nav nav-tabs ${styles.movie_home}`}
              id="pills-tab"
              role="tablist"
            >
              <li className={`${styles.nav_item_home} mr-4`}>
                <a
                  className="nav-link active text-uppercase"
                  id="pills-home-tab"
                  data-toggle="pill"
                  href="#pills-home"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  Thông tin cá nhân
                </a>
              </li>
              <li className={`${styles.nav_item_home}`}>
                <a
                  className="nav-link text-uppercase"
                  id="pills-profile-tab"
                  data-toggle="pill"
                  href="#pills-profile"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  Lịch sử đặt vé
                </a>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active py-5"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                123
              </div>
              <div
                className="tab-pane fade py-5"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                456
              </div>
            </div>
          </div>
        </div> */}
        <Tabs tabPosition={tabPosition} className="mt-5">
          <TabPane tab="Thông tin cá nhân" key="1">
            <ProfileForm />
          </TabPane>
          <TabPane tab="Lịch sử đặt vé" key="2">
            Content of Tab 2
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
