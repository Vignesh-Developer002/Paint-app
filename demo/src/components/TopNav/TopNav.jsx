import React, { useContext } from "react";
import "./TopNav.css";
import { IoExitOutline } from "react-icons/io5";
import { globalStore } from "../../StoreContext/StoreContext";
import { PiPaintBrushFill } from "react-icons/pi";

const TopNav = () => {
  const { handleStageVisble, stageVisible, handleExit } =
    useContext(globalStore);

  return (
    <>
      <div className="top-container">
        <div className="top-content">
          <div className="left-head">
            <h1>Paint App</h1>{" "}
            <span style={{ width: "40px", height: "40px" }}>
              <PiPaintBrushFill fill="white" fontSize={30} />
            </span>
          </div>
          {stageVisible && (
            <div className="exit-content">
              {/* handleStageVisble() */}
              <div className="exit" onClick={() => handleExit()}>
                <p>Exit</p>
                <IoExitOutline className="ext-btn" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TopNav;
