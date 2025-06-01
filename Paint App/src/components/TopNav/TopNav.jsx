import React, { useContext } from "react";
import "./TopNav.css";
import { IoExitOutline } from "react-icons/io5";
import { globalStore } from "../../StoreContext/StoreContext";
import { PiPaintBrushFill } from "react-icons/pi";
import { extraShapes } from "../../Actions/Action";
import BottomNav from "../BottomNav/BottomNav";

const TopNav = () => {
  const { stageVisible, handleExit } = useContext(globalStore);

  return (
    <>
      <div className="top-container">
        <div className="top-content">
          <div className="left-head">
            <h1>Paint App</h1>{" "}
            <span style={{ width: "30px", height: "30px" }}>
              <PiPaintBrushFill fill="white" fontSize={20} />
            </span>
          </div>
          {stageVisible && (
            <div className="exit-content">
              <div className="exit" onClick={() => handleExit()}>
                <p>Exit</p>
                <IoExitOutline className="ext-btn" />
              </div>
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default TopNav;
