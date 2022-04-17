import React from "react";
import HomeBanner from "../../Components/HomeBanner/HomeBanner";
import HomeMovieList from "../../Components/HomeMovieList/HomeMovieList";
import HomeMovieTheater from "../../Components/HomeMovieTheater/HomeMovieTheater";
import PageWrapper from "../../templates/pageWrapper";

export default function Home() {
  // let MovieTheaterList = (
  //   <div className="row">
  //     <div className="col-12">
  //       <HomeMovieTheater />
  //     </div>
  //   </div>
  // );
  // let arrComponent = [HomeMovieList];
  return (
    <React.Fragment>
      <HomeBanner />
      {/* <PageWrapper arrComponent={arrComponent} /> */}
      <div className="container">
        <HomeMovieList />
        {/* <div className="row"> */}
        <div className="w-auto d-none d-md-inline-block">
          <HomeMovieTheater />
        </div>
        {/* </div> */}
      </div>
    </React.Fragment>
  );
}
