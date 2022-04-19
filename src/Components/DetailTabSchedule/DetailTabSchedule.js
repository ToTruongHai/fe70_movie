import React from "react";
import { Tabs } from "antd";
import { useSelector } from "react-redux";

const { TabPane } = Tabs;
export default function DetailTabSchedule() {
  const { movieSchedule } = useSelector(
    (rootReducer) => rootReducer.quanLyRapReducer
  );
  return (
    <Tabs tabPosition="left">
      {movieSchedule.heThongRapChieu?.map((rap, index) => {
        return (
          <TabPane
            tab={
              <div>
                <img
                  src={rap.logo}
                  alt="..."
                  width={50}
                  height={50}
                  className="mr-3"
                />
                {rap.tenHeThongRap}
              </div>
            }
            key={index}
          >
            Content of Tab {index}
          </TabPane>
        );
      })}
      
    </Tabs>
  );
}
