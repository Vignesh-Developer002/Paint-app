import React, { useContext, useEffect, useState } from "react";
import "../BottomNav/BottomNav.css";
import { MdOutlineCancel } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { TbBrightnessUpFilled } from "react-icons/tb";
// import { extraShapes } from "../../Actions/Action";
import { globalStore } from "../../StoreContext/StoreContext";
import { MdNightlightRound } from "react-icons/md";
import PlayTutorial from "../playTutorial/PlayTutorial";

const BottomNav = () => {
  const {
    handleBottomNavBtn,
    idName,
    preview,
    setPreview,
    cancelIconColor,
    setCancelIconColor,
    setEyeColor,
    darkMode,
    setDarkMode,
    setCloseBottomNav,
    extraShapes,
  } = useContext(globalStore);

  //function for handle the preview setup
  function handlePreviewColor() {
    setEyeColor((prev) => !prev);
    setPreview((pre) => !pre);
  }

  //function for handle the dark mode
  function handleDarkMode() {
    setDarkMode((prev) => !prev);
  }

  //function for handle the navBar close
  function handleBottomNavClose() {
    console.log("close");
    setCloseBottomNav(false);
  }

  // useEffect for set the darkmode state
  useEffect(() => {
    console.log("useEffect runs local storage value setted");
    localStorage.setItem("darkmode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div
      className="bottomNav_main"
      style={{ backgroundColor: darkMode ? "#232628" : "#ebebeb" }}
    >
      <div className="sub-content" id="TopNavCancel">
        <div className="left-side-cancel-content">
          <MdOutlineCancel
            fill={cancelIconColor === "blue" ? "#1f8de3" : "black"}
            className="cancel"
            size={25}
            title="Exit"
            onMouseDown={() => setCancelIconColor("blue")}
            onMouseUp={() => setCancelIconColor("")}
            onClick={() => handleBottomNavClose()}
          />
          <p className="fullscreen">Full Screen</p>
        </div>
        <div className="left-side-prev">
          <button
            className="btn"
            style={{
              backgroundColor: preview === true ? "#3d4042" : "#ffffff",
            }}
            onClick={handlePreviewColor}
          >
            <IoMdEye
              size={20}
              fill={preview === true ? "#1f8de3" : "black"}
              className="eye"
              title="preview"
            />
          </button>
          <button
            className="btn"
            style={{ backgroundColor: darkMode ? "#3d4042" : "#ffffff" }}
            onClick={() => handleDarkMode()}
          >
            {!darkMode && (
              <TbBrightnessUpFilled
                size={20}
                fill={darkMode === true ? "#1f8de3" : "black"}
                title="Toggle color Scheme"
              />
            )}
            {darkMode && (
              <MdNightlightRound
                fill={darkMode === true ? "#1f8de3" : "black"}
                size={20}
                title="Toggle color Scheme"
              />
            )}
          </button>
        </div>
      </div>
      {/* New shapes */}
      <div className="additionalShape">
        <div className="bottom-right-side-content" id="copyPaste">
          {extraShapes().map((d) => (
            <button
              id={d.id}
              key={d.id}
              onClick={() => handleBottomNavBtn(d.id, idName)}
              className="bottom-icon-btn"
              style={{
                backgroundColor: darkMode ? "#232628" : "#ffffff",
                border: darkMode ? "1px solid #ffffff" : "none",
              }}
            >
              {d.icons}
            </button>
          ))}
        </div>
        <PlayTutorial />
      </div>
    </div>
  );
};

export default BottomNav;
