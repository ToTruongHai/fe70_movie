import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getScheduleTheater } from "../../redux/actions/quanLyRapAction";

function HomeTheaterCluster() {
  let { thongTinLichChieu } = useSelector((a) => a.quanLyRapReducer);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getScheduleTheater());
  }, []);
  console.log(thongTinLichChieu);
  return <div>HomeTheaterCluster</div>;
}

export default memo(HomeTheaterCluster);
