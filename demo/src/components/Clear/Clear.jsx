import { RiDeleteBinLine } from "react-icons/ri";

const Clear = () => {
  return (
    <>
      <RiDeleteBinLine
        data-tooltip-id="color"
        data-tooltip-content="clear"
        data-tooltip-place="right"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          fontSize: "25px",
          outline: "none",
        }}
      />
    </>
  );
};

export default Clear;
