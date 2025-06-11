import React, { useContext, useState } from "react";
import Joyride from "react-joyride";

import { globalStore } from "../../StoreContext/StoreContext.jsx";
// import step from "../TourComponent/TourSteps.jsx";

const JoyRide = ({ step }) => {
  const { startTour, setStartTour } = useContext(globalStore);
  const [joyRideState, setJoyRideState] = useState("");
  for (let i = 0; i < step.length; i++) {

  }
  return (
    <Joyride
      steps={step}
      continuous
      run={startTour}
      spotlightClicks={false}
      disableCloseOnEsc={false}
      disableOverlayClose={false}
      spotlightPadding={0}
      hideCloseButton={true}
      locale={{
        back: "Back",
        close: "Close",
        last: "Get started",
        next: "Next",
      }}
      styles={{
        options: {
          arrowColor: "transperant",
          overlayColor: "rgb(0, 0, 0)",
          primaryColor: " #eca41a",
          textColor: "black",
          zIndex: 1000,
        },
        tooltip: {
          backgroundColor: "white",
          height:150,
        },
        arrow: {
          display: "none", // 👈 fully removes the arrow
        },
      }}
      callback={(data) => {
        setJoyRideState(data?.action);
        console.log(data);
        if (data?.action === "reset") {
          setStartTour(false);
        }
      }}
    />
  );
};

export default JoyRide;
