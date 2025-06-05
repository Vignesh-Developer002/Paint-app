import React, { useContext, useRef, useState, createRef } from "react";
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
import { Toaster } from "react-hot-toast";
import Draggable from "react-draggable";
import Joyride from "react-joyride";
import step from "./components/TourComponent/TourSteps.jsx";
import { IoMdPlay } from "react-icons/io";
import JoyRide from "./components/JoyRide/JoyRide.jsx";

const App = () => {
  const {
    handleZoom,
    scale,
    inc,
    preview,
    tutorialClick,
    setTutorialClick,
    startTour,
    setStartTour,
  } = useContext(globalStore);
  const nodeRef = createRef();

  function handleChanges() {
    setTutorialClick(false);
    setStartTour(true);
  }

  return (
    //  style={{backgroundColor:"#e6e6e6"}}
    <div className="app-container">
      <JoyRide />
      <div id="drag-container">
        <TopNav />
        <div className="top-nav">
          <IconGroup />
          <RightSideShape />
        </div>

        {preview && (
          <Draggable
            bounds="#drag-container"
            nodeRef={nodeRef}
            defaultPosition={{ x: 1010, y: 120 }}
            handle={".preview-head"}
          >
            <div ref={nodeRef} className="prev">
              <Preview />
            </div>
          </Draggable>
        )}

        <MainStage />
        {/* dropDown container */}
        {tutorialClick && (
          <div className="drop-down-container">
            <div className="tutorial-play">
              <IoMdPlay size={20} className="playlogo" />
              <p className="PlayText" onClick={() => handleChanges()}>
                Play tutorial
              </p>
            </div>
          </div>
        )}
        <div className="joystick-content">
          <div className="zoomer-content">
            <Joystick2 />
            {/* --- */}
            <div className="bottomzoom" onSelect={(e) => e.preventDefault()}>
              <div className="main-zoom">
                <button
                  title="Zoom out"
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
                {/* <p className="zoomlevel">{inc}%</p> */}
                <button
                  title="Zoom in"
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
        <Toaster />
      </div>
    </div>
  );
};

export default App;
