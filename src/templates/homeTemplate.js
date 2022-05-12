import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import HomeFooter from "../Components/HomeFooter/HomeFooter";
import HomeHeader from "../Components/HomeHeader/HomeHeader";

export const HomeTemplate = (props) => {
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

    return () => {
      //Hủy 2 sự kiện này khi component mất khỏi giao diện
      //(Chuyển template hoặc reload)
      window.removeEventListener("onload", null);
      window.removeEventListener("onresize", null);

      document
        .getElementById("trailerModal")
        .removeEventListener("onhide", null);
    };
  }, []);

  let Component = props.component;

  if (props.mobileComponent) {
    if (windowSize.innerWidth < 768) {
      Component = props.mobileComponent;
    }
  }

  return (
    <Route
      exact
      path={props.path}
      render={(propsRoute) => {
        return (
          <div>
            <HomeHeader />
            <Component {...propsRoute} />
            <HomeFooter />
          </div>
        );
      }}
    />
  );
};
