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
import { FaObjectGroup } from "react-icons/fa";
import { RiRectangleFill } from "react-icons/ri";
import { MdLibraryAdd } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import { FaPaste } from "react-icons/fa";

export const actions = {
  select: "select",
  circle: "circle",
  rectangle: "rectangle",
  rectLayer: "rectLayer",
  scribble: "scrible",
  line: "line",
  polygon: "polygon",
  StrokeColor: "Stroke",
  fillColor: "fill",
  Clear: "clear",
  drag: "drag",
  upload: "image",
  text: "text",
  group: "group",
  duplicate: "duplicate",
  copy: "copy",
  paste: "paste",
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
        data-tooltip-place="right"
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
        data-tooltip-place="right"
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
        data-tooltip-place="right"
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
        data-tooltip-place="right"
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
    id: actions.rectLayer,
    icons: (
      <RiRectangleFill
        data-tooltip-id="color"
        data-tooltip-content="Rectangle layer"
        data-tooltip-place="right"
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
        data-tooltip-place="right"
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
        data-tooltip-place="right"
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
        data-tooltip-content="Reset the canvas"
        data-tooltip-place="right"
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
        data-tooltip-place="right"
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
        data-tooltip-place="right"
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
  {
    id: actions.group,
    icons: (
      <FaObjectGroup
        data-tooltip-id="color"
        data-tooltip-content="Group"
        data-tooltip-place="right"
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

export const extraShapes = [
  {
    id: actions.duplicate,
    icons: (
      <MdLibraryAdd
      title="duplicate"
        fill="#242424"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          fontSize: "20px",
          outline: "none",
        }}
      />
    ),
  },
  {
    id: actions.copy,
    icons: (
      <FaCopy
        title="copy"
        fill="#242424"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          fontSize: "20px",
          outline: "none",
        }}
      />
    ),
  },
  {
    id: actions.paste,
    icons: (
      <FaPaste
        title="paste"
        fill="#242424"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          fontSize: "20px",
          outline: "none",
        }}
      />
    ),
  },
];
