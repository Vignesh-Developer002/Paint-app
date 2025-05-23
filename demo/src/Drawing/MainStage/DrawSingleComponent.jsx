import React, { useContext } from "react";
import { globalStore } from "../../StoreContext/StoreContext";
import DrawStage2Rect from "../Draw/DrawStage2Rect";
import DrawStage2Circle from "../Draw/DrawStage2Circle";

const DrawSingleComponent = () => {
  const { btnName } = useContext(globalStore);
  return (
    <>
      {btnName === "rectangle" ? <DrawStage2Rect /> : <></>}
      {btnName === "circle" ? <DrawStage2Circle /> : <></>}
    </>
  );
};

export default DrawSingleComponent;
