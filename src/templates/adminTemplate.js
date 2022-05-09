import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, Route } from "react-router-dom";
import { USER_LOGIN } from "../util/setting";

import { Layout, Menu, PageHeader, Table, Input } from "antd";
import logo from "../assets/images/logo.png";
import "../assets/styles/adminTemplate/adminTemplate.css";
import { LOAD_COMPONENT } from "../redux/actions/types/adminTemplateType";

const { Header, Content, Sider } = Layout;

export const AdminTemplate = React.memo((props) => {
  let { title, buttons, columns, dataSource, selectedRowKeys } = useSelector(
    (a) => a.adminTemplateReducer
  );
  // Làm phần table antd
  const dispatch = useDispatch();
  const onSelectChange = (selectedRowKeys) => {
    console.log(selectedRowKeys);
    dispatch({
      type: LOAD_COMPONENT,
      payload: {
        selectedRowKeys,
      },
    });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };
  // End làm phần table antd

  const { userLogin } = useSelector(
    (rootReducer) => rootReducer.quanLyNguoiDungReducer
  );

  const [windowSize, setWindowSize] = useState({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
  });

  const changeSizeWindow = () => {
    let { innerHeight, innerWidth } = window;
    setWindowSize({
      innerHeight: innerHeight,
      innerWidth: innerWidth,
    });
  };

  useEffect(() => {
    window.onresize = changeSizeWindow;
    window.onload = changeSizeWindow;

    // return () => {
    //   //Hủy 2 sự kiện này khi component mất khỏi giao diện
    //   //(Chuyển template hoặc reload)
    //   window.removeEventListener("onload");
    //   window.removeEventListener("onresize");

    //   document
    //     .getElementById("trailerModal")
    //     .removeEventListener("onhide", null);
    // };
  }, []);
  console.log(dataSource);
  let Component = props.component;

  if (props.mobileComponent) {
    if (windowSize.innerWidth < 768) {
      Component = props.mobileComponent;
    }
  }

  if (!localStorage.getItem(USER_LOGIN)) {
    return <Redirect to="/" />;
  }

  if (userLogin.maLoaiNguoiDung !== "QuanTri") {
    return <Redirect to="/" />;
  }

  return (
    <Route
      exact
      path={props.path}
      render={(propsRoute) => {
        return (
          <Layout>
            <Sider breakpoint="lg" collapsedWidth="0">
              <div
                style={{
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  height: "60px",
                  textAlign: "center",
                }}
              >
                <NavLink className="navbar-brand" to="/admin">
                  <img className="logo" src={logo} alt="" />{" "}
                  <span
                    className="text-white text-center"
                    style={{
                      fontSize: "18px",
                      marginLeft: "10px",
                      verticalAlign: "center",
                      textAlign: "center",
                    }}
                  >
                    Tix
                  </span>
                </NavLink>
              </div>
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{
                  height: "100%",
                  borderRight: 0,
                }}
                theme="dark"
              >
                <Menu.Item key="2" className="nav-admin">
                  <NavLink className="navbar-brand" to="/admin/movie">
                    Movie
                  </NavLink>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout className="site-layout">
              <Header
                className="site-layout-background"
                style={{ padding: 0, background: "#fff" }}
                theme="light"
              />

              <Content style={{ margin: "24px 16px 0" }}>
                <div
                  className="site-layout-background"
                  style={{ minHeight: 360 }}
                >
                  <PageHeader
                    ghost={false}
                    title={title}
                    extra={buttons}
                  ></PageHeader>
                  <props.component {...propsRoute} />
                  <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={dataSource}
                    // pagination={{
                    //   current: soTrang,
                    //   pageSize: soPhanTuTrenTrang,
                    //   total: totalCount,
                    // }}
                    // onChange={handleTableChange}
                  />
                </div>
              </Content>
            </Layout>
          </Layout>
        );
      }}
    />
  );
});
