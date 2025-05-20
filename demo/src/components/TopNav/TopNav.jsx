import React, { useContext } from "react";
import "./TopNav.css";
import { IoExitOutline } from "react-icons/io5";
import { LuPaintbrush } from "react-icons/lu";
import { globalStore } from "../../StoreContext/StoreContext";

const TopNav = () => {
  const { handleStageVisble, stageVisible } = useContext(globalStore);
  return (
    <>
      <div className="top-container">
        <div className="top-content">
          <div className="left-head">
            <h1>Paint App</h1> <span></span>
          </div>
          {stageVisible && (
            <div className="exit-content">
              <div className="exit" onClick={() => handleStageVisble()}>
                <p>Exit</p> <IoExitOutline className="ext-btn" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TopNav;
