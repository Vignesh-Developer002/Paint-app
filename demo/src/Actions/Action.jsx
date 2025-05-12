import { FaRegCircle } from "react-icons/fa";
import { RiRectangleLine } from "react-icons/ri";
import { PiScribbleLight } from "react-icons/pi";
import { FaArrowTrendDown } from "react-icons/fa6";
import { FaDrawPolygon } from "react-icons/fa";
import { FaArrowPointer } from "react-icons/fa6";
import { useContext } from "react";
import { globalStore } from "../StoreContext/StoreContext";
import Clear from "../components/Clear/Clear";
import Drag from "../components/Drag/Drag";
// import { RiDeleteBinLine } from "react-icons/ri";

export const actions = {
  select: "select",
  circle: "circle",
  rectangle: "rectangle",
  scribble: "scrible",
  line: "line",
  polygon: "polygon",
  StrokeColor: "Stroke",
  fillColor: "fill",
  Clear: "clear",
  drag: "drag",
};

const StrokeColor = () => {
  const { sideBar, handleInputValue } = useContext(globalStore);
  return (
    <>
      <input
        // data-tooltip-id="color"
        // data-tooltip-content="Stroke Color"
        type="color"
        value={sideBar.stroke}
        name="stroke"
        onChange={(e) => handleInputValue(e)}
        style={{
          width: "80px",
          height: "50px",
          border: "none",
          cursor: "pointer",
        }}
      />
    </>
  );
};

export default StrokeColor;

export const FillColor = () => {
  const { sideBar, handleInputValue } = useContext(globalStore);

  return (
    <>
      <input
        // data-tooltip-id="color"
        // data-tooltip-content="Fill Color"
        type="color"
        name="fill"
        value={sideBar.fill}
        onChange={(e) => handleInputValue(e)}
        style={{
          width: "80px",
          height: "50px",
          border: "none",
          cursor: "pointer",
        }}
      />
    </>
  );
};

export const drawData = [
  {
    id: actions.select,
    icons: (
      <FaArrowPointer
        data-tooltip-id="color"
        data-tooltip-content="Select"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          outline: "none",
        }}
      />
    ),
  },
  {
    id: actions.circle,
    icons: (
      <FaRegCircle
        data-tooltip-id="color"
        data-tooltip-content="Circle"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          outline: "none",
        }}
      />
    ),
  },
  {
    id: actions.rectangle,
    icons: (
      <RiRectangleLine
        data-tooltip-id="color"
        data-tooltip-content="Rectangle"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          outline: "none",
        }}
      />
    ),
  },
  {
    id: actions.scribble,
    icons: (
      <PiScribbleLight
        data-tooltip-id="color"
        data-tooltip-content="Scribble"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          outline: "none",
        }}
      />
    ),
  },
  {
    id: actions.line,
    icons: (
      <FaArrowTrendDown
        data-tooltip-id="color"
        data-tooltip-content="Line"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          outline: "none",
        }}
      />
    ),
  },
  {
    id: actions.polygon,
    icons: (
      <FaDrawPolygon
        data-tooltip-id="color"
        data-tooltip-content="Polygon"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          outline: "none",
        }}
      />
    ),
  },
  // {
  //   id: actions.drag,
  //   // icons: <Drag />,
  // },
  {
    id: actions.Clear,
    icons: <Clear />,
  },
];
