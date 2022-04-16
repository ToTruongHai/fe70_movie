import { Router, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import ModalHOC from "./pages/ModalHOC/ModalHOC";
import { HomeTemplate } from "./templates/homeTemplate";
import { history } from "./util/setting";
import './App.css';
import './assets/styles/Variable.css';
import Detail from "./pages/Detail/Detail";
import TrailerModal from "./pages/ModalHOC/TrailerModal";

function App() {
  return (
    <Router history={history}>
      <Switch>
        <HomeTemplate path={"/home"} component={Home} />
        <HomeTemplate path={"/detail/:id"} component={Detail} />

        {/* Default Page */}
        <HomeTemplate path={"/"} component={Home} />
      </Switch>
      <ModalHOC />
      <TrailerModal />
    </Router>
  );
}

export default App;
