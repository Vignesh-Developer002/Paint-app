import { FaHandRock } from "react-icons/fa";

const Drag = () => {
  return (
    <div>
      <FaHandRock
        data-tooltip-id="color"
        data-tooltip-content="Drag"
        data-tooltip-place="right"
        style={{
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
