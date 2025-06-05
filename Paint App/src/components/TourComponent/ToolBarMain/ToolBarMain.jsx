import React from "react";
import "./ToolBarMain.css";

const ToolBarMain = () => {
  return (
    <div className="toolbar-main">
      <h1 className="main-tool-title">Tools</h1>

      <div className="main-para">
        <p className="main-content-para">
          Click an a tool to Switch in order to select, draw, modify, or set a
          focal point.
        </p>
      </div>
    </div>
  );
};

export default ToolBarMain;
