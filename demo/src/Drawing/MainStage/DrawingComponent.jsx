import React, { useContext } from "react";
import { globalStore } from "../../StoreContext/StoreContext";
import { actions } from "../../Actions/Action";
import DrawCircle from "../../Drawing/Draw/DrawCircle.jsx";
import DrawLine from "../../Drawing/Draw/DrawLine.jsx";
import DrawPolygon from "../../Drawing/Draw/DrawPolygon.jsx";
import DrawRectangle from "../../Drawing/Draw/DrawRectangle.jsx";
import DrawScribble from "../../Drawing/Draw/DrawScribble.jsx";

const DrawingComponent = () => {
  const { btnName } = useContext(globalStore);
  return (
    <>
      {btnName === actions.circle ? <DrawCircle /> : <></>}
      {btnName === actions.rectangle ? <DrawRectangle /> : <></>}
      {btnName === actions.scribble ? <DrawScribble /> : <></>}
      {btnName === actions.line ? <DrawLine /> : <></>}
      {btnName === actions.polygon ? <DrawPolygon /> : <></>}
    </>
  );
};

export default DrawingComponent;
