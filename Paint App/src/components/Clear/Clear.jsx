import { RiDeleteBinLine } from "react-icons/ri";

const Clear = () => {
  return (
    <>
      <RiDeleteBinLine
        data-tooltip-id="color"
        data-tooltip-content="Reset the canvas"
        data-tooltip-place="right"
        style={{
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
