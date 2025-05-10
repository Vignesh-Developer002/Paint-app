import React, { useContext } from "react";
import "../RightSideShapeDt/RightSideShape.css";
import StrokeColor, { FillColor } from "../../Actions/Action";
import { globalStore } from "../../StoreContext/StoreContext";

const RightSideShape = () => {
  const {
    strokeColor,
    fillColor,
    sideBar,
    setSideBar,
    handleInputValue,
    currentShap,
  } = useContext(globalStore);

  return (
    <div className="right-side-container">
      <div className="inner-content">
        <h1 className="heading">{currentShap ? currentShap : ""}</h1>
        {/* flex-column */}
        <div className="main-content">
          <div className="stroke-color">
            <p>
              Stroke color :{" "}
              {sideBar["stroke"] ? `(${sideBar["stroke"] })` : "(No Color Selected)"}
            </p>
            <StrokeColor />
          </div>
          <div className="fill-color">
            <p>
              Fill color :{" "}
              {sideBar["fill"] ? `(${sideBar["fill"]})` : "(No Color Selected)"}
            </p>
            <FillColor />
          </div>
          <div className="stroke-width">
            <p>Stroke Width</p>
            <input
              type="number"
              name="strokeWidth"
              value={sideBar.strokeWidth}
              onChange={(e) => handleInputValue(e)}
            />
          </div>
          <div className="circle-radius">
            <p> Radius</p>
            <input
              type="number"
              name="radius"
              value={sideBar.radius}
              onChange={(e) => handleInputValue(e)}
            />
          </div>
          <div className="height">
            <p>Height</p>
            <input
              type="number"
              name="height"
              value={sideBar.height}
              onChange={(e) => handleInputValue(e)}
            />
          </div>
          <div className="width">
            <p>Width</p>
            <input
              type="number"
              name="width"
              value={sideBar.width}
              onChange={(e) => handleInputValue(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSideShape;
