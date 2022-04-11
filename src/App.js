import { Router, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import ModalHOC from "./pages/ModalHOC/ModalHOC";
import { HomeTemplate } from "./templates/homeTemplate";
import { history } from "./util/setting";
import './App.css';
import './assets/styles/Variable.css';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <HomeTemplate path={"/home"} component={Home} />

        {/* Default Page */}
        <HomeTemplate path={"/"} component={Home} />
      </Switch>
      <ModalHOC />
    </Router>
  );
}

export default App;
