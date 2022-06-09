import React, { useEffect } from "react";
import { List, Avatar, Space } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getMovieListAction } from "../../redux/actions/quanLyPhimAction";
import moment from "moment";
import { NavLink } from "react-router-dom";

export default function Search(props) {
  const dispatch = useDispatch();
  let { movieList } = useSelector((a) => a.quanLyPhimReducer);

  useEffect(() => {
    dispatch(getMovieListAction(props.match.params.tenPhim));
  }, [props.match.params.tenPhim]);

  return (
    <div className="container pb-5">
      <h2
        style={{
          color: "var(--primary_color)",
          padding: "25px 25px 0 25px",
          fontSize: "3rem",
        }}
      >
        Kết quả tìm kiếm cho: {props.match.params.tenPhim}
      </h2>
      <h3
        style={{
          padding: "0px 25px 25px 25px",
          fontSize: "1.5rem",
          color: "grey",
        }}
      >
        Có ({movieList?.length}) Kết Quả
      </h3>
      <hr />
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            // console.log(page);
          },
          pageSize: 5,
        }}
        dataSource={movieList}
        renderItem={(item) => (
          <List.Item
            key={item.tenPhim}
            actions={[]}
            extra={<img width={150} alt="logo" src={item.hinhAnh} />}
          >
            <List.Item.Meta
              title={
                <NavLink to={`/detail/${item.maPhim}`}>{item.tenPhim}</NavLink>
              }
              description={
                "Ngày Khởi Chiếu: " +
                moment(item.ngayKhoiChieu).format("DD/MM/YYYY hh:mm A")
              }
            />
            {item?.moTa.length > 300
              ? item?.moTa.substr(0, 300) + "..."
              : item?.moTa}
          </List.Item>
        )}
      />
    </div>
  );
}
