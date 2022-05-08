import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, Route } from "react-router-dom";
import { USER_LOGIN } from "../util/setting";

import { Layout, Menu, Button, PageHeader, Table, Input } from "antd";
import logo from "../assets/images/logo.png";
import "../assets/styles/adminTemplate/adminTemplate.css";

const { Header, Content, Sider } = Layout;
const { Search } = Input;

export const AdminTemplate = (props) => {
  // Làm phần table antd
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];
  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }
  let [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (selectedRowKeys) => {
    // console.log(selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
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

  let { tenPhim, soTrang, soPhanTuTrenTrang } = useSelector(
    (a) => a.quanLyPhimReducer
  );

  const dispatch = useDispatch();

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
                <Menu.Item key="1" className="nav-admin">
                  <NavLink className="navbar-brand" to="/admin">
                    DashBoard
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="2" className="nav-admin">
                  <NavLink className="navbar-brand" to="/admin/movie">
                    Movie
                  </NavLink>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Header
                className="site-layout-sub-header-background"
                style={{ padding: 0 }}
              />
              {/* <props.component {...propsRoute} /> */}

              {/* <PageHeader
                ghost={false}
                title={title}
                extra={buttons}
              ></PageHeader>
              <div className="col-12">
                {hasFilter && (
                  <div className="card-body filter-wrapper bg-white my-3">
                    <Search
                      placeholder="input search text"
                      onSearch={onSearch}
                      enterButton
                    />
                  </div>
                )}
                <Table
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={data}
                  pagination={{ current: soTrang, pageSize: soPhanTuTrenTrang }}
                />
              </div> */}

              <Content style={{ margin: "24px 16px 0" }}>
                <div
                  className="site-layout-background"
                  style={{ minHeight: 360 }}
                >
                  <props.component {...propsRoute} />
                </div>
              </Content>
            </Layout>
          </Layout>
        );
      }}
    />
  );
};
