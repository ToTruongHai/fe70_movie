import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../assets/styles/HomeHeader/HomeHeader.module.css";
import React from "react";
import Register from "../../pages/Register/Register";

export default function HomeHeader() {
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <nav className={`navbar navbar-expand-sm`}>
        <NavLink className="navbar-brand" to="/">
          Movie
        </NavLink>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        />
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <NavLink
                // activeStyle={{ color: "orange" }}
                // activeClassName="bg-white"
                exact
                className="nav-link"
                to="/home"
              >
                Home
              </NavLink>
            </li>
            {/* <li className="nav-item">
            <a className="nav-link" href="#">
              Link
            </a>
          </li> */}
          </ul>
          <button
            className="btn btn-outline-success"
            data-toggle="modal"
            data-target="#modelId"
            onClick={() => {
              const action = {
                type: "OPEN_FORM",
                component: <Register />,
                titleModal: "Register",
                handleSubmit: () => {
                  console.log("register sumbit");
                },
              };
              dispatch(action);
            }}
          >
            Register
          </button>
        </div>
      </nav>
      <nav className={`navbar navbar-expand-sm navbar-dark ${styles.bg_black}`}>
        <NavLink className="navbar-brand" to="/">
          Movie
        </NavLink>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        />
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <NavLink
                // activeStyle={{ color: "orange" }}
                // activeClassName="bg-white"
                exact
                className="nav-link"
                to="/home"
              >
                Home
              </NavLink>
            </li>
            {/* <li className="nav-item">
          <a className="nav-link" href="#">
            Link
          </a>
        </li> */}
          </ul>
          <button
            className="btn btn-outline-success text-white"
            data-toggle="modal"
            data-target="#modelId"
            onClick={() => {
              const action = {
                type: "OPEN_FORM",
                component: <Register />,
                titleModal: "Register",
                handleSubmit: () => {
                  console.log("register sumbit");
                },
              };
              dispatch(action);
            }}
          >
            Register
          </button>
        </div>
      </nav>
    </React.Fragment>
  );
}
