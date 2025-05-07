import { FaMousePointer } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { RiRectangleLine } from "react-icons/ri";
import { PiScribbleLight } from "react-icons/pi";
import { FaArrowTrendDown } from "react-icons/fa6";
import { FaDrawPolygon } from "react-icons/fa";
import { FaArrowPointer } from "react-icons/fa6";
import { useContext } from "react";
import { globalStore } from "../StoreContext/StoreContext";

export const actions = {
  select: "select",
  circle: "circle",
  rectangle: "rectangle",
  scribble: "scrible",
  line: "line",
  polygon: "polygon",
  StrokeColor: "Stroke",
  fillColor: "fill",
};

const StrokeColor = () => {
  const { strokeColor, setStrokeColor } = useContext(globalStore);
  //function for handle the color changes

  function handleColorChanges(e) {
    setStrokeColor(e.target.value);
  }
  return (
    <>
      <input
        data-tooltip-id="color"
        data-tooltip-content="Stroke Color"
        type="color"
        value={strokeColor}
        onChange={(e) => handleColorChanges(e)}
        style={{
          width: "30px",
          height: "27px",
          border: "none",
          cursor: "pointer",
        }}
      />
    </>
  );
};

export default StrokeColor;

const FillColor = () => {
  const { fillColor, setFillColor } = useContext(globalStore);

  // function for handle fill color logic
  function handleFillColor(e) {
    setFillColor(e.target.value);
  }
  return (
    <>
      <input
        data-tooltip-id="color"
        data-tooltip-content="Fill Color"
        type="color"
        value={fillColor}
        onChange={(e) => handleFillColor(e)}
        style={{
          width: "30px",
          height: "27px",
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
        style={{ width: "100%", height: "100%" }}
      />
    ),
  },
  {
    id: actions.circle,
    icons: (
      <FaRegCircle
        data-tooltip-id="color"
        data-tooltip-content="Circle"
        style={{ width: "100%", height: "100%" }}
      />
    ),
  },
  {
    id: actions.rectangle,
    icons: (
      <RiRectangleLine
        data-tooltip-id="color"
        data-tooltip-content="Rectangle"
        style={{ width: "100%", height: "100%" }}
      />
    ),
  },
  {
    id: actions.scribble,
    icons: (
      <PiScribbleLight
        data-tooltip-id="color"
        data-tooltip-content="Scribble"
        style={{ width: "100%", height: "100%" }}
      />
    ),
  },
  {
    id: actions.line,
    icons: (
      <FaArrowTrendDown
        data-tooltip-id="color"
        data-tooltip-content="Line"
        style={{ width: "100%", height: "100%" }}
      />
    ),
  },
  {
    id: actions.polygon,
    icons: (
      <FaDrawPolygon
        data-tooltip-id="color"
        data-tooltip-content="Polygon"
        style={{ width: "100%", height: "100%" }}
      />
    ),
  },
  {
    id: actions.StrokeColor,
    icons: <StrokeColor />,
  },
  { id: actions.fillColor, icons: <FillColor /> },
];
