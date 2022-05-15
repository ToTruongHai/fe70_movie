import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import loadingGif from "../../assets/images/loading.gif";

export default function Loading(props) {
  const { isLoading } = useSelector(
    (rootReducer) => rootReducer.loadingReducer
  );
  const antIcon = <LoadingOutlined style={{ fontSize: 64 }} spin />;
  return (
    <React.Fragment>
      {isLoading ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,.5)",
            display: "flex",
            zIndex: "99",
            color: "white",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "4rem",
          }}
        >
          <div>
            <Spin indicator={antIcon} size="large" />
            {/* <img src={loadingGif} alt="" width={100} height={100} /> */}
          </div>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}
