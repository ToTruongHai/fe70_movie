import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, Route } from "react-router-dom";
import { USER_LOGIN } from "../util/setting";

import { Layout, Menu, PageHeader, Table, Avatar, Dropdown, Space } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import logo from "../assets/images/logo.png";
import "../assets/styles/adminTemplate/adminTemplate.css";
import { LOAD_COMPONENT } from "../redux/actions/types/adminTemplateType";
import { logoutAction } from "../redux/actions/quanLyNguoiDungAction";
import Swal from "sweetalert2";

const { Header, Content, Sider } = Layout;

export const AdminTemplate = React.memo((props) => {
  let { title, buttons, columns, dataSource, selectedRowKeys } = useSelector(
    (a) => a.adminTemplateReducer
  );
  // Làm phần table antd
  const dispatch = useDispatch();
  const onSelectChange = (selectedRowKeys) => {
    // console.log(selectedRowKeys);
    dispatch({
      type: LOAD_COMPONENT,
      payload: {
        selectedRowKeys,
      },
    });
  };
  // console.log("load lại");

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

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <NavLink
          to="/"
          onClick={(event) => {
            event.preventDefault();
            Swal.fire({
              title: "Bạn chắc chắn muốn đăng xuất?",
              icon: "warning",
              showCancelButton: true,
              showConfirmButton: true,
              confirmButtonText: "Đăng xuất",
              cancelButtonText: "Hủy",
            }).then((result) => {
              if (result.isConfirmed) {
                dispatch(logoutAction());
                Swal.fire({
                  title: "Đăng xuất thành công",
                  icon: "success",
                  showConfirmButton: false,
                });
              }
            });
          }}
        >
          Đăng xuất
        </NavLink>
      </Menu.Item>
    </Menu>
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
    console.log(menu);

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
  // console.log("load lại trang admin");
  let Component = props.component;

  if (props.mobileComponent) {
    if (windowSize.innerWidth < 768) {
      Component = props.mobileComponent;
      return;
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
            <Sider breakpoint="lg" collapsedWidth="0" className="mb-3">
              <div
                style={{
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  height: "60px",
                  textAlign: "center",
                }}
              >
                <NavLink className="navbar-brand mt-3" to="/admin">
                  <img
                    className="logo"
                    src={logo}
                    alt=""
                    style={{ height: "70px" }}
                  />
                  <span
                    className="text-white font-weight-semi-bold text-center text-uppercase"
                    style={{
                      fontSize: "32px",
                      marginLeft: "10px",
                      verticalAlign: "middle",
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
                className="mt-5"
              >
                <Menu.Item key="2" className="nav-admin">
                  <NavLink className="navbar-brand" to="/admin/movie">
                    <i className="fa-solid fa-video"></i>{" "}
                    <span className="ml-3">Quản lý phim</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="3" className="nav-admin">
                  <NavLink className="navbar-brand" to="/admin/user">
                    <i className="fa-solid fa-user"></i>{" "}
                    <span className="ml-3">Quản lý người dùng</span>
                  </NavLink>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout className="site-layout">
              <Header
                className="site-layout-background d-flex justify-content-end align-items-center"
                style={{ padding: 0, background: "#fff" }}
                theme="light"
              >
                <Avatar
                  style={{
                    backgroundColor: "#87d068",
                  }}
                  icon={<UserOutlined />}
                  className="mr-2"
                />
                <Dropdown
                  placement="bottomRight"
                  className="mr-4"
                  overlay={menu}
                >
                  <span className="btn btn-lg">{userLogin.hoTen}</span>
                </Dropdown>
              </Header>

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
