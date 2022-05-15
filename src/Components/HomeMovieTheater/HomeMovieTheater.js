import React, { memo, useEffect, useState } from "react";
import { Alert, Menu, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getScheduleTheater } from "../../redux/actions/quanLyRapAction";
import BookingItem from "../Elements/BookingItem";
import "../../assets/styles/HomeMovieTheater/HomeMovieTheater.css";
const { TabPane } = Tabs;
const { SubMenu } = Menu;
function HomeMovieTheater() {
  let { thongTinLichChieu } = useSelector((a) => a.quanLyRapReducer);
  let dispatch = useDispatch();
  const [windowSize, setWindowSize] = useState({
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
  });
  const changeSizeWindow = () => {
    let { innerHeight, innerWidth } = window;
    setWindowSize({
      innerHeight,
      innerWidth,
    });
  };
  useEffect(() => {
    window.addEventListener("resize", changeSizeWindow);
    window.addEventListener("load", changeSizeWindow);
    let action = getScheduleTheater();
    dispatch(action);
    return () => {
      window.removeEventListener("resize", changeSizeWindow);
      window.removeEventListener("load", changeSizeWindow);
    };
  }, []);
  let renderMovieTheaterList = () => {
    if (windowSize.innerWidth > 991) {
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
                                <div className="row mx-0">
                                  {item.lstLichChieuTheoPhim
                                    .slice(0, 12)
                                    .map((item, index) => {
                                      return (
                                        <BookingItem
                                          className="col-xl-2 col-lg-3 col-md-4 mb-4 px-0"
                                          item={item}
                                          key={index}
                                        />
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
    } else if (windowSize.innerWidth < 992) {
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
          <TabPane tab={icon()} key={index} className="tabIpad">
            {item?.lstCumRap?.slice(0, 7).map((rap, index) => {
              return (
                <React.Fragment key={index}>
                  <Alert
                    message={
                      <a
                        className="d-block"
                        data-toggle="collapse"
                        href={"#" + rap.maCumRap}
                        role="button"
                        aria-expanded="false"
                        aria-controls={rap.maCumRap}
                      >
                        {rap.tenCumRap}
                      </a>
                    }
                    className="d-block mt-3"
                    type="info"
                  />
                  <div
                    className="collapse pt-3"
                    id={rap.maCumRap}
                    style={{ maxHeight: "300px", overflowY: "auto" }}
                  >
                    {rap.danhSachPhim.map((item, index) => {
                      return (
                        <a
                          className="d-block"
                          data-toggle="collapse"
                          href={`#mp${item.maPhim}`}
                          role="button"
                          aria-expanded="false"
                          aria-controls={`mp${item.maPhim}`}
                          key={index}
                        >
                          <div className="d-flex w-100">
                            <div className="d-flex align-items-center w-100">
                              <img
                                src={item.hinhAnh}
                                width={25}
                                height={25}
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
                              </div>
                            </div>
                          </div>
                          <hr />
                          <div
                            className="collapse card py-0 mb-3 container"
                            id={`mp${item.maPhim}`}
                            key={index}
                          >
                            <div
                              className="row pt-3 mx-0 text-center"
                              style={{
                                paddingLeft: "unset",
                                paddingRight: "unset",
                              }}
                            >
                              {item.lstLichChieuTheoPhim
                                .slice(0, 12)
                                .map((item, index) => {
                                  return (
                                    <BookingItem
                                      className="col-xl-2 col-3 mb-4 px-0"
                                      item={item}
                                      key={index}
                                    />
                                  );
                                })}
                            </div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </React.Fragment>
              );
            })}
          </TabPane>
        );
      });
    }
  };
  return (
    <Tabs tabPosition={windowSize.innerWidth > 576 ? "left" : "top"}>
      {renderMovieTheaterList()}
    </Tabs>
  );
}
export default memo(HomeMovieTheater);
