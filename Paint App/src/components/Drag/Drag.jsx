import { useContext } from "react";
import { FaHandRock } from "react-icons/fa";
import { globalStore } from "../../StoreContext/StoreContext";

const Drag = () => {
  const { darkMode } = useContext(globalStore);
  return (
    <div>
      <FaHandRock
        data-tooltip-id="color"
        data-tooltip-content="Drag"
        data-tooltip-place="right"
        style={{
          color: darkMode ? "#ada69c" : "#5d5d5d",
          width: "80%",
          height: "80%",
          border: "none",
          outline: "none",
          fontSize: "25px",
        }}
      />
    </div>
  );
};

export default Drag;
