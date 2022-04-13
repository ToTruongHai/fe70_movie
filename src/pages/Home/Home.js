import React from "react";
import HomeBanner from "../../Components/HomeBanner/HomeBanner";
import HomeMovieList from "../../Components/HomeMovieList/HomeMovieList";
import PageWrapper from "../../templates/pageWrapper";

export default function Home() {
  let arrComponent = [HomeMovieList];
  return (
    <div>
      <HomeBanner />
      <PageWrapper arrComponent={arrComponent} />
    </div>
  );
}
