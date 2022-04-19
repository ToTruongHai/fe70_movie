import React, { useEffect } from "react";
import styles from "../../assets/styles/DetailTab/DetailTab.module.css";

import { Tabs } from "antd";
import { getMovieSchedule } from "../../redux/actions/quanLyRapAction";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import DetailTabSchedule from "../DetailTabSchedule/DetailTabSchedule";

const { TabPane } = Tabs;

export default function DetailTab() {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(async () => {
    let action = getMovieSchedule(params.id);
    dispatch(action);
  }, []);

  return (
    <React.Fragment>
      <div className={`${styles.tab_content} mt-5 detail-tabHai`}>
        <h3>Lịch Chiếu</h3>
        <DetailTabSchedule />

        {/* <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Lịch Chiếu" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Thông Tin" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Đánh Giá" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs> */}
      </div>
    </React.Fragment>
  );
}
