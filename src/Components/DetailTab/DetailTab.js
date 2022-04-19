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
      <div className={`${styles.tab_content} mt-5`}>
        <h3 className="mt-5 mb-5">Lịch Chiếu</h3>
        <DetailTabSchedule />
      </div>
    </React.Fragment>
  );
}
