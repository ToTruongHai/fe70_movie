import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as signalR from "@aspnet/signalr";

// setup redux
import { Provider } from "react-redux";
import { store } from "./redux/configStore";

//import ant.design css
import "antd/dist/antd.css";
import { DOMAIN } from "./util/setting";

//import signalr realtime
// export const connection = new signalR.HubConnectionBuilder()
//   .withUrl(`${DOMAIN}/DatVeHub`)
//   .configureLogging(signalR.LogLevel.Information)
//   .build();

// connection
//   .start()
//   .then(() => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById("root")
    );
  // })
  // .catch((error) => {
  //   console.log(error);
  // });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
