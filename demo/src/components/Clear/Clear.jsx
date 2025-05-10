import React, { useContext } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { globalStore } from "../../StoreContext/StoreContext";

const Clear = () => {
  const { handleClear } = useContext(globalStore);
  return (
    <>
      <RiDeleteBinLine
        data-tooltip-id="color"
        data-tooltip-content="clear"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          outline: "none",
        }}
        onClick={() => handleClear()}
      />
    </>
  );
};

export default Clear;
