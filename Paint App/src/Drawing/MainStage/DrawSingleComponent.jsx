import React, { useContext } from "react";
import { globalStore } from "../../StoreContext/StoreContext";
import DrawStage2Rect from "../Draw/DrawStage2Rect";
import DrawStage2Circle from "../Draw/DrawStage2Circle";
import DrawStage2Poly from "../Draw/DrawStage2Poly";
import DrawStage2Line from "../Draw/DrawStage2Line";

const DrawSingleComponent = () => {
  const { btnName} = useContext(globalStore);
  return (
    <>
      {btnName === "rectangle" ? <DrawStage2Rect /> : <></>}
      {btnName === "circle" ? <DrawStage2Circle /> : <></>}
      {btnName === "polygon" ? <DrawStage2Poly /> : <></>}
      {btnName === "line" ? <DrawStage2Line /> : <></>}
    </>
  );
};

export default DrawSingleComponent;
