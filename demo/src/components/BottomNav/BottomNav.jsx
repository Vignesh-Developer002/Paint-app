import React, { useContext } from "react";
import "../BottomNav/BottomNav.css";
import { MdOutlineCancel } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { TbBrightnessUpFilled } from "react-icons/tb";
import { extraShapes } from "../../Actions/Action";
import { globalStore } from "../../StoreContext/StoreContext";

const BottomNav = () => {
  const { handleBottomNavBtn, idName } = useContext(globalStore);

  return (
    <div className="bottomNav_main">
      <div className="sub-content">
        <div className="left-side-cancel-content">
          <MdOutlineCancel
            fill="black"
            className="cancel"
            size={25}
            title="Exit"
          />
          <p className="fullscreen">Full Screen</p>
        </div>
        <div className="left-side-prev">
          <button className="btn">
            <IoMdEye size={20} className="eye" title="preview" />
          </button>
          <button className="btn">
            <TbBrightnessUpFilled size={20} title="Toggle color Scheme" />
          </button>
        </div>
      </div>
      {/* New shapes */}
      <div className="additionalShape">
        {extraShapes.map((d) => (
          <button
            id={d.id}
            key={d.id}
            onClick={() => handleBottomNavBtn(d.id, idName)}
            className="bottom-icon-btn"
          >
            {d.icons}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
