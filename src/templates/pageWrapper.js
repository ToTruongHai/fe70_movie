import React from "react";

export default function PageWrapper(props) {
  let renderArrComponent = () => {
    return props.arrComponent.map((Item, index) => {
      return <Item key={index} />;
    });
  };
  return <div className="container">{renderArrComponent()}</div>;
}
