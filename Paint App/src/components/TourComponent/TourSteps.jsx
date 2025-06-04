import ToolTour from "./ToolsTour/ToolTour";

const step = [
  {
    target: "#icon-group",
    content: <ToolTour />,
    disableBeacon: true,
    // offset: 300,
    placement: "right",
    hideCloseButton: true,
    hideBackButton: true,
  },
];

export default step;
