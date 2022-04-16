import React from "react";

export default function Trailer(props) {
  const style = {
    width: "100%",
    height: "720px",
  };
  const renderIframe = () => {
    console.log("aaaa" + props.path);
    if (props.path.includes("embed")) {
      return (
        <iframe
          width={style.width}
          height={style.height}
          src={props.path}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      );
    } else {
      return <h1 style={{ textAlign: "center" , fontSize:'30px'}}>No Trailer Available</h1>;
    }
  };
  return <React.Fragment>{renderIframe()}</React.Fragment>;
}
