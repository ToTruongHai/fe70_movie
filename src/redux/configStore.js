import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import reduxThunk from "redux-thunk";
import { quanLyPhimReducer } from "./reducers/quanLyPhimReducer";

import { modalReducer } from "./reducers/modalReducer";
import { quanLyRapReducer } from "./reducers/quanLyRapReducer";

const rootReducer = combineReducers({
  modalReducer,
  quanLyPhimReducer,
  quanLyRapReducer,
});

let middleWare = applyMiddleware(reduxThunk);
let composeCustom = compose(
  middleWare,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const store = createStore(rootReducer, composeCustom);
