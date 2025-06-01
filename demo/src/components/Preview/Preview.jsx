import React from "react";
import { ImCancelCircle } from "react-icons/im";
import assets from "../../assets/assets.js"
import "./preview.css"

const Preview = () => {
  return (
    <div className="preview-container">
      <div className="preview-head">
        <ImCancelCircle className="prev-cancel"/>
        <p className="prev-title">Preview</p>
      </div>
      <img src={assets.down} alt="" />
    </div>
  );
};

export default Preview;
