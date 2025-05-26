import React from "react";
import ShowStage2Rect from "../Show/ShowStage2Rect";
import ShowStage2Circle from "../Show/ShowStage2Circle";
import ShowStage2Poly from "../Show/ShowStage2Poly";
import ShowStage2Line from "../Show/ShowStage2Line";

const ShowSingleComonent = () => {
  return (
    <>
      <ShowStage2Poly />
      <ShowStage2Rect />
      <ShowStage2Circle />
      <ShowStage2Line />
    </>
  );
};

export default ShowSingleComonent;
