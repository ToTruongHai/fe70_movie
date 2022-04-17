import React, { useEffect } from "react";
import { Tabs } from "antd";
// import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovieTheaterAction } from "../../redux/actions/quanLyRapAction";
import { NavLink } from "react-router-dom";
const { TabPane } = Tabs;

export default function HomeMovieTheater() {
  let { movieTheaterList } = useSelector((a) => a.quanLyRapReducer);
  let dispatch = useDispatch();
  useEffect(() => {
    let action = getAllMovieTheaterAction();
    dispatch(action);
  }, []);
  let renderMovieTheaterList = () => {
    // console.log(movieTheaterList);
    return movieTheaterList.map((item, index) => {
      //   let icon = () => {
      //     return (
      //       <img
      //         style={{ borderRadius: "50%" }}
      //         width={50}
      //         height={50}
      //         src={item.logo}
      //       />
      //     );
      //   };
      //   return <TabPane tab={icon()} key={index}></TabPane>;
      return (
        <li key={index} className="d-inline-block border p-3 w-auto">
          <NavLink to="/">
            <img
              style={{ borderRadius: "50%" }}
              width={80}
              height={80}
              src={item.logo}
            />
            <h3 className="d-inline ml-3 text-uppercase">
              {item.tenHeThongRap}
            </h3>
          </NavLink>
        </li>
      );
    });
  };
  //   return <Tabs tabPosition="left">{renderMovieTheaterList()}</Tabs>;
  return <ul className="d-flex flex-column">{renderMovieTheaterList()}</ul>;
}
