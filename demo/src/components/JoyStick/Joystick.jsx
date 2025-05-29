import React, { useRef } from "react";
import "./joystick.css";
import {
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { Layer, Stage } from "react-konva";

// function for add the arrow color
function handleArrowMoseDown(e) {
  let res = e.target?.id === "1";
  console.log("mouse down happen", e.target);
}

// function handleRemoveColor() {}
const Joystick = () => {
  const nodeRef = useRef(null);
  return (
    <div className="main-joystick">
      {/* <Layer> */}
      <Layer className="first-layer">
        <ChevronUp className="up" onClick={(e) => handleArrowMoseDown(e)} />
        <ChevronLeft className="left" onClick={(e) => handleArrowMoseDown(e)} />
        <ChevronRight
          className="right"
          onClick={(e) => handleArrowMoseDown(e)}
        />
        <ChevronDown className="down" onClick={(e) => handleArrowMoseDown(e)} />

        <div className="center-btn">
          <circle  fill="green"/>
        </div>
      </Layer>
      {/* </Layer> */}
    </div>
  );
};

// export default Joystick;
