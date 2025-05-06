import React, { useContext } from "react";
import "../IconGroup/IconGroup.css";
import { drawData } from "../../../Actions/Action.jsx";
import { globalStore } from "../../../StoreContext/StoreContext.jsx";

const IconGroup = () => {
  const { btnName, setBtnName } = useContext(globalStore);
  console.log(btnName);
  //function for findinfd the name of the perticular clicked button
  function handleAction(id) {
    setBtnName(id);
  }
  return (
    <div className="icon-group">
      {drawData.map((icon, idx) => (
        <button
          key={idx}
          className={btnName === icon.id ? "bg-blue" : "icon"}
          onClick={() => handleAction(icon.id)}
        >
          {icon.icons}
        </button>
      ))}
    </div>
  );
};

export default IconGroup;
