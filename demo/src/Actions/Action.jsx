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
import { FaUpload } from "react-icons/fa";
import { MdTextIncrease } from "react-icons/md";

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
  upload: "image",
  text: "text",
};

const StrokeColor = () => {
  const { sideBar, handleInputValue } = useContext(globalStore);
  return (
    <>
      <input
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
          fontSize: "25px",
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
          fontSize: "25px",
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
          fontSize: "25px",
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
          fontSize: "25px",
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
          fontSize: "25px",
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
          fontSize: "25px",
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
          fontSize: "25px",
        }}
      />
    ),
  },
  {
    id: actions.drag,
    icons: <Drag />,
  },
  {
    id: actions.Clear,
    icons: (
      <Clear
        data-tooltip-id="color"
        data-tooltip-content="Clear"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          outline: "none",
          fontSize: "25px",
        }}
      />
    ),
  },
  {
    id: actions.upload,
    icons: (
      <FaUpload
        data-tooltip-id="color"
        data-tooltip-content="Upload"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          outline: "none",
          fontSize: "25px",
        }}
      />
    ),
  },
  {
    id: actions.text,
    icons: (
      <MdTextIncrease
        data-tooltip-id="color"
        data-tooltip-content="Text"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          fontSize: "25px",
          outline: "none",
        }}
      />
    ),
  },
];
