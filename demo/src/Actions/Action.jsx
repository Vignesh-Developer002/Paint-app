import { FaMousePointer } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { RiRectangleLine } from "react-icons/ri";
import { PiScribbleLight } from "react-icons/pi";
import { FaArrowTrendDown } from "react-icons/fa6";
import { FaDrawPolygon } from "react-icons/fa";
import { FaArrowPointer } from "react-icons/fa6";

export const actions = {
  select: "select",
  circle: "circle",
  rectangle: "rectangle",
  scribble: "scrible",
  line: "line",
  polygon: "polygon",
};

export const drawData = [
  {
    id: actions.select,
    icons: <FaArrowPointer />,
  },
  { id: actions.circle, icons: <FaRegCircle /> },
  { id: actions.rectangle, icons: <RiRectangleLine /> },
  { id: actions.scribble, icons: <PiScribbleLight /> },
  { id: actions.line, icons: <FaArrowTrendDown /> },
  { id: actions.polygon, icons: <FaDrawPolygon /> },
];
