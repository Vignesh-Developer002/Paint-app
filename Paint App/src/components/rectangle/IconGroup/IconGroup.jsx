import React, { useContext } from "react";
import "../IconGroup/IconGroup.css";
// import { drawData } from "../../../Actions/Action.jsx";
import { globalStore } from "../../../StoreContext/StoreContext.jsx";

const IconGroup = () => {
  const {
    btnName,
    setBtnName,
    setDraggable,
    setBtn,
    handleClear,
    setCurrentShape,
    darkMode,
    shapeCollection
  } = useContext(globalStore);

  
  //function for findinfd the name of the perticular clicked button
  function handleAction(id, e) {
    setBtnName(id);
    if (
      id === "select" ||
      id === "circle" ||
      id === "rectangle" ||
      id === "scrible" ||
      id === "line" ||
      id === "polygon" ||
      id === "clear"
    ) {
      setDraggable(false);
      setBtn("default");
      setCurrentShape(id);
    }
    if (id === "drag") {
      setDraggable(true);
      setBtn("grab");
    }
    if (id === "clear") {
      handleClear();
    }
    if (id === "image") {
      setCurrentShape(id);
    }
  }
 

  return (
    <div
      className="icon-group"
      style={{ backgroundColor: darkMode ? "#232628" : "#ebebeb" }}
    >
      {shapeCollection().map((icon, idx) => (
        <button
        // #ffffff
          style={{ backgroundColor: darkMode ? "#181a1b" : "" }}
          id="btn"
          key={idx}
          className={btnName === icon.id  ? "bg-blue" : "icon"}
          onClick={(e) => handleAction(icon.id, e)}
        >
          {icon.icons}
        </button>
      ))}
    </div>
  );
};

export default IconGroup;
