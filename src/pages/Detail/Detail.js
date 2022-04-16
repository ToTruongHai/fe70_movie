import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import DetailInfo from "../../Components/DetailInfo/DetailInfo";
import { getMovieDetailAction } from "../../redux/actions/quanLyPhimAction";
import PageWrapper from "../../templates/pageWrapper";
import { useParams } from "react-router-dom";

export default function Detail() {
  const arrDetail = [DetailInfo];
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(async () => {
    let action = getMovieDetailAction(params.id);
    dispatch(action);
  }, []);

  return (
    <React.Fragment>
      {/* Movie Img And Movie Info */}
      <PageWrapper arrComponent={arrDetail} />
      {/* <DetailInfo /> */}
    </React.Fragment>
  );
}
