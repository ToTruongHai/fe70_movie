import React, { useEffect } from "react";
import DetailInfo from "../../Components/DetailInfo/DetailInfo";
import PageWrapper from "../../templates/pageWrapper";
import DetailTab from "../../Components/DetailTab/DetailTab";

export default function Detail() {
  const arrDetail = [DetailInfo, DetailTab];
 

  return (
    <React.Fragment>
      {/* Movie Img And Movie Info */}
      <PageWrapper arrComponent={arrDetail} />

      {/* <DetailInfo /> */}
    </React.Fragment>
  );
}
