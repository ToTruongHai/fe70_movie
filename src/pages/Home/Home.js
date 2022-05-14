import React from "react";
import HomeBanner from "../../Components/HomeBanner/HomeBanner";
import HomeMovieList from "../../Components/HomeMovieList/HomeMovieList";
import HomeMovieTheater from "../../Components/HomeMovieTheater/HomeMovieTheater";
import PageWrapper from "../../templates/pageWrapper";

export default function Home() {
  const arrComponent = [HomeMovieList, HomeMovieTheater];
  return (
    <React.Fragment>
      <HomeBanner />

      <PageWrapper arrComponent={arrComponent} />
      {/* <div className="container">
        <HomeMovieList />
        <HomeMovieTheater />
      </div> */}
    </React.Fragment>
  );
}
