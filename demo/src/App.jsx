import React, { useContext, useRef, useState } from "react";
import IconGroup from "./components/rectangle/IconGroup/IconGroup.jsx";
import "../src/App.css";
import { Layer, Stage } from "react-konva";
import { globalStore } from "./StoreContext/StoreContext.jsx";
import { actions } from "./Actions/Action.jsx";
import MainStage from "./Drawing/MainStage/MainStage.jsx";
import RightSideShape from "./components/RightSideShapeDt/RightSideShape.jsx";

const App = () => {
  return (
    <div className="app-container">
      <div className="top-nav">
        <IconGroup />
        <RightSideShape/>
      </div>
      <MainStage />
    </div>
  );
};

export default App;
