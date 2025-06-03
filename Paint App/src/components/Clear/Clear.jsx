import { RiDeleteBinLine } from "react-icons/ri";
import { globalStore } from "../../StoreContext/StoreContext";
import { useContext } from "react";
const Clear = () => {
  const { darkMode } = useContext(globalStore);

  return (
    <>
      <RiDeleteBinLine
        fill={darkMode ? "#ada69c" : "#5d5d5d"}
        data-tooltip-id="color"
        data-tooltip-content="Reset the canvas"
        data-tooltip-place="right"
        style={{
          // color: darkMode ? "#ada69c" : "#5d5d5d",
          width: "80%",
          height: "80%",
          border: "none",
          fontSize: "25px",
          outline: "none",
        }}
      />
    </>
  );
};

export default Clear;
