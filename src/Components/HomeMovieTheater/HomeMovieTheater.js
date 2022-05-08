import React, { memo, useEffect } from "react";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getScheduleTheater } from "../../redux/actions/quanLyRapAction";
import { NavLink } from "react-router-dom";
import moment from "moment";
import ButtonPrimaryOutline from "../Elements/ButtonPrimaryOutline/ButtonPrimary";
const { TabPane } = Tabs;
// import logo from "../../assets/images/logo.png";
function HomeMovieTheater() {
  let { thongTinLichChieu } = useSelector((a) => a.quanLyRapReducer);
  let dispatch = useDispatch();
  useEffect(() => {
    let action = getScheduleTheater();
    dispatch(action);
  }, []);
  let renderMovieTheaterList = () => {
    return thongTinLichChieu.map((item, index) => {
      let icon = () => {
        return (
          <div>
            <img
              style={{ borderRadius: "50%" }}
              width={50}
              height={50}
              src={item.logo}
            />
          </div>
        );
      };
      return (
        <TabPane tab={icon()} key={index}>
          <Tabs tabPosition="left" className="tabFilms">
            {item?.lstCumRap?.slice(0, 7).map((rap, index) => {
              return (
                <TabPane
                  tab={
                    <div
                      style={{ width: "300px", textAlign: "left" }}
                      className="d-flex align-items-center text-dark"
                    >
                      <img src={rap.hinhAnh} width="50" alt="" />
                      <div className="d-inline-block ml-3 text-wrap">
                        <h5 className="mb-0">{rap.tenCumRap}</h5>
                        <p className="mb-0">{rap.diaChi}</p>
                      </div>
                    </div>
                  }
                  key={index}
                >
                  {rap.danhSachPhim.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        <div className="d-flex mb-5 w-100">
                          <div className="d-flex align-items-center w-100">
                            <img
                              src={item.hinhAnh}
                              width={75}
                              height={100}
                              alt=""
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://is1-ssl.mzstatic.com/image/thumb/Purple114/v4/dd/5d/3c/dd5d3cc0-f63b-1ce9-498d-9437ab10795e/source/60x60bb.jpg";
                              }}
                            />
                            <div className="ml-3 w-100 container">
                              <h5 className="font-weight-bold">
                                {item.tenPhim}
                              </h5>
                              <p className="text-secondary font-weight-semi-bold">
                                {rap.diaChi}
                              </p>
                              <div className="row w-100">
                                {item.lstLichChieuTheoPhim
                                  .slice(0, 12)
                                  .map((item, index) => {
                                    return (
                                      <NavLink
                                        to={`/checkout/${item.maLichChieu}`}
                                        key={index}
                                        className="col-xl-2 col-lg-3 col-md-4 mb-4 px-0"
                                      >
                                        <ButtonPrimaryOutline
                                          className="px-0"
                                          // key={index}
                                          // className="col-xl-2 col-lg-3 col-md-4 mb-4"
                                        >
                                          {/* <span
                                            className={`${styles.gio_chieu}`}
                                          > */}
                                          {moment(
                                            item.ngayChieuGioChieu
                                          ).format("hh:mm A")}
                                          {/* </span> */}
                                        </ButtonPrimaryOutline>
                                      </NavLink>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </React.Fragment>
                    );
                  })}
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };
  return <Tabs tabPosition="left">{renderMovieTheaterList()}</Tabs>;
  // return <div>123</div>;
}

export default memo(HomeMovieTheater);
