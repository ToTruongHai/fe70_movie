import React from "react";
import HomeBanner from "../../Components/HomeBanner/HomeBanner";
import HomeMovieList from "../../Components/HomeMovieList/HomeMovieList";
import HomeMovieTheater from "../../Components/HomeMovieTheater/HomeMovieTheater";
import PageWrapper from "../../templates/pageWrapper";

export default function Home() {
  return (
    <React.Fragment>
      <HomeBanner />

      {/* <PageWrapper arrComponent={arrComponent} /> */}
      <div className="container">
        <HomeMovieList />
        <HomeMovieTheater />
        {/* <div className="row"> */}
        {/* <div className="w-auto d-none d-md-inline-block">
          <HomeMovieTheater />
        </div> */}
        {/* </div> */}
      </div>
    </React.Fragment>
  );
}
