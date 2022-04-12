import React from "react";
import HomeBanner from "../../Components/HomeBanner/HomeBanner";
import HomeMovieList from "../../Components/HomeMovieList/HomeMovieList";

export default function Home() {
  return (
    <div>
      <HomeBanner />
      <HomeMovieList />
    </div>
  );
}
