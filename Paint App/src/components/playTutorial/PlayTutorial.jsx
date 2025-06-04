import React, { useContext, useState } from "react";
import { FaQuestion } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./playTutorial.css";
import { globalStore } from "../../StoreContext/StoreContext";

// state for clicking the tutorial butto

const PlayTutorial = () => {
  const { tutorialClick, setTutorialClick } = useContext(globalStore);

  function handleTutorialToggle() {
    console.log("click");
    setTutorialClick((prev) => !prev);
  }

  console.log("tutorial click", tutorialClick);
  return (
    <>
      {" "}
      <div
        title="Help"
        className="play-tutorial-content"
        onClick={() => handleTutorialToggle()}
      >
        <FaQuestion className="questionMark" />
        <RiArrowDropDownLine className="DropDown" fontSize={35} />
      </div>
    </>
  );
};

export default PlayTutorial;
