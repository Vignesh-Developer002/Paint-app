import React from "react";
import "./RightSideTour.css";

const RightSideTour = () => {
  return (
    <div className="right-side-tour">
      <div className="right-side-title">
        <h1 className="rightSideTitle">Object Inspector</h1>
        <div className="right-side-para">
          <p className="rightSidePara">
            Allows to change properties for selected object, when nothing is
            selected the object inspector is disable
          </p>
        </div>
      </div>
    </div>
  );
};

export default RightSideTour;
