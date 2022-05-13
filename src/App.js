import { Router, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import ModalHOC from "./pages/ModalHOC/ModalHOC";
import { HomeTemplate } from "./templates/homeTemplate";
import { history } from "./util/setting";
import "./App.css";
import "./assets/styles/Variable.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Detail from "./pages/Detail/Detail";
import TrailerModal from "./pages/ModalHOC/TrailerModal";
import { CheckoutTemplate } from "./templates/checkoutTemplate";
import Checkout from "./pages/Checkout/Checkout";
import Loading from "./Components/Loading/Loading";
import { AdminTemplate } from "./templates/adminTemplate";
import DashBoard from "./pages/Admin/DashBoard/DashBoard";
import Movie from "./pages/Admin/Movie/Movie";
import User from "./pages/Admin/User/User";
import Showtimes from "./Components/Admin/Showtimes/Showtimes";
import Search from "./Components/Search/Search";

function App() {
  return (
    <Router history={history}>
      <Loading />
      <Switch>
        <HomeTemplate path={"/home"} component={Home} />
        <HomeTemplate path={"/detail/:id"} component={Detail} />
        <HomeTemplate path={"/search/:tenPhim"} component={Search} />
        <CheckoutTemplate path={"/checkout/:id"} component={Checkout} />

        {/* Admin */}
        <AdminTemplate path={"/admin/user"} component={User} />
        <AdminTemplate path={"/admin/movie"} component={Movie} />
        <AdminTemplate path={"/admin/showtimes/:id"} component={Showtimes} />
        <AdminTemplate path={"/admin"} component={DashBoard} />

        {/* Default Page */}
        <HomeTemplate path={"/"} component={Home} />
      </Switch>
      <ModalHOC />
      <TrailerModal />
    </Router>
  );
}

export default App;
