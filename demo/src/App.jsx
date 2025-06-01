import React, { useContext, useRef, useState } from "react";
import IconGroup from "./components/rectangle/IconGroup/IconGroup.jsx";
import "../src/App.css";
import { Layer, Stage } from "react-konva";
import { globalStore } from "./StoreContext/StoreContext.jsx";
import { actions } from "./Actions/Action.jsx";
import MainStage from "./Drawing/MainStage/MainStage.jsx";
import RightSideShape from "./components/RightSideShapeDt/RightSideShape.jsx";
import TopNav from "./components/TopNav/TopNav.jsx";
import Joystick2 from "./components/JoyStick/Joystick2.jsx";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import Preview from "./components/Preview/Preview.jsx";

const App = () => {
  const { handleZoom, scale, inc } = useContext(globalStore);

  return (
    <div className="app-container">
      <TopNav />
      <div className="top-nav">
        <IconGroup />
        <RightSideShape />
      </div>
      <div className="prev">
        <Preview />
      </div>
      <MainStage />
      <div className="joystick-content">
        <div className="zoomer-content">
          <Joystick2 />
          {/* --- */}
          <div className="bottomzoom" onSelect={(e) => e.preventDefault()}>
            <div className="main-zoom">
              <button
                className="inc"
                disabled={inc === -200 ? true : false}
                onClick={() => handleZoom(false)}
              >
                <FaMinus
                  size={12}
                  fill={inc === -200 ? "lightGrey" : "#030064"}
                  className="incDec"
                />
              </button>
              <p className="zoomlevel">{inc}%</p>
              <button
                className="dec"
                disabled={inc === 500 ? true : false}
                onClick={() => handleZoom(true)}
              >
                <FaPlus
                  size={12}
                  fill={inc < 500 ? "#030064" : "lightGrey"}
                  className="incDec"
                />
              </button>
            </div>
          </div>
          {/* ----- */}
        </div>
      </div>
    </div>
  );
};

export default App;
