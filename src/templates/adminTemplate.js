import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Redirect, Route } from "react-router-dom";
import { USER_LOGIN } from "../util/setting";

import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export const AdminTemplate = (props) => {
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

  let Component = props.component;

  if (props.mobileComponent) {
    if (windowSize.innerWidth < 768) {
      Component = props.mobileComponent;
    }
  }

  //   if (!localStorage.getItem(USER_LOGIN)) {
  //     return <Redirect to="/" />;
  //   }

  //   if (userLogin.maLoaiNguoiDung !== 'QuanTri') {
  //     return <Redirect to="/" />;
  //   }

  return (
    <Route
      exact
      path={props.path}
      render={(propsRoute) => {
        return (
          <Layout
            style={{
              minHeight: "100vh",
            }}
          >
            <Header className="header">
              <div className="logo" />
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
              </Menu>
            </Header>
            <Layout>
              <Sider width={200} className="site-layout-background">
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  style={{ height: "100%", borderRight: 0 }}
                >
                  <Menu.Item key="1">
                    <NavLink className="navbar-brand" to="/admin">
                      DashBoard
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="2"><NavLink className="navbar-brand" to="/admin/movie">
                      Movie
                    </NavLink></Menu.Item>
                </Menu>
              </Sider>
              <Layout style={{ padding: "0 24px 24px" }}>
                {/* <Breadcrumb style={{ margin: "16px 0" }}>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>List</Breadcrumb.Item>
                  <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}
                <Content
                  className="site-layout-background"
                  style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                  }}
                >
                  <props.component {...propsRoute} />
                </Content>
              </Layout>
            </Layout>
          </Layout>
        );
      }}
    />
  );
};
