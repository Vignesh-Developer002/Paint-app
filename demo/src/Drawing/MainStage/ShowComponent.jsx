import React from "react";
import ShowCircle from "../Show/ShowCircle";
import ShowLine from "../Show/ShowLine";
import ShowPolygon from "../Show/ShowPolygon";
import ShowRectangle from "../Show/ShowRectangle";
import ShowScribble from "../Show/ShowScribble";

const ShowComponent = () => {
  return (
    <>
      <ShowCircle />
      <ShowRectangle />
      <ShowScribble />
      <ShowLine/>
      <ShowPolygon/> 
    </>
  );
};

export default ShowComponent;
