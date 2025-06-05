import ToolTour from "./ToolsTour/ToolTour";

const step = [
  {
    target: "#TopNavCancel",
    content: <ToolTour />,
    placement: "left",
    disableBeacon: true,
    type: 1,
    offset: 0,
  },
  {
    target: "#copyPaste",
    content: <ToolTour />,
    placement: "right",
    disableBeacon: true,
    type: 2,
  },
  {
    target: "#icon-group",
    content: <ToolTour />,
    placement: "right",
    disableBeacon: true,
    type: 3,
  },

  {
    target: "#rightSideContent",
    content: <ToolTour />,
    placement: "left",
    disableBeacon: true,
    type: 4,
  },
  {
    target: "#resetButton",
    content: <ToolTour />,
    placement: "left",
    disableBeacon: true,
    type: 5,
    offset:0
  },
];

export default step;
