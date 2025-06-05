import CopyPastTour from "./CopyPastTour/CopyPastTour.JSX";
import JoyStickTour from "./JoyStickTour/JoyStickTour";
import RightSideTour from "./RightSideTour/RightSideTour";
import ToolBarMain from "./ToolBarMain/ToolBarMain";
import ToolTour from "./ToolsTour/ToolTour";

const step = [
  {
    target: "#TopNavCancel",
    content: <ToolTour />,
    placement: "left",
    disableBeacon: true,
    type: 1,
    toolbarHeight: 0,
    backgroundColor: "red",
  },
  {
    target: "#copyPaste",
    content: <CopyPastTour />,
    placement: "right",
    disableBeacon: true,
    type: 2,
  },
  {
    target: "#icon-group",
    content: <ToolBarMain />,
    placement: "right",
    disableBeacon: true,
    type: 3,
  },

  {
    target: "#rightSideContent",
    content: <RightSideTour />,
    placement: "left",
    disableBeacon: true,
    type: 4,
  },
  {
    target: "#resetButton",
    content: <JoyStickTour />,
    placement: "left",
    disableBeacon: true,
    type: 5,
    offset: 0,
  },
];

export default step;
