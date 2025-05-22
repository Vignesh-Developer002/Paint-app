import React, { useContext } from "react";
import { globalStore } from "../../StoreContext/StoreContext";
import DrawStage2Rect from "../Draw/DrawStage2Rect";

const DrawSingleComponent = () => {
  const { btnName } = useContext(globalStore);
  return <>{btnName === "rectangle" ? <DrawStage2Rect /> : <></>}</>;
};

export default DrawSingleComponent;
