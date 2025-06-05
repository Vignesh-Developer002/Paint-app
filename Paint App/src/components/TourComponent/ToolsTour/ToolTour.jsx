import React from "react";
import "./toolTour.css";
import { FaChevronRight } from "react-icons/fa6";

const ToolTour = () => {
  return (
    <div className="tool-tour-container">
      <div className="title">
        <h1>Main toolbar</h1>
      </div>
      <div className="para">
        <p>
         Exit the top nav bar
        </p>
      </div>
      {/* <div className="nxt-btn">
        <div className="next-btn-main">
          <button className="next">Next </button>
          <FaChevronRight className="right-arrow" />{" "}
        </div>
      </div> */}
    </div>
  );
};

export default ToolTour;
