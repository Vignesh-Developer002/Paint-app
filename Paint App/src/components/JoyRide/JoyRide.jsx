import React, { useContext } from "react";
import Joyride from "react-joyride";

import { globalStore } from "../../StoreContext/StoreContext.jsx";
import step from "../TourComponent/TourSteps.jsx";

const JoyRide = () => {
  const { startTour, setStartTour } = useContext(globalStore);

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
      locale={{back: 'Back', close: 'Close', last: 'Get started', next: 'Next'}}
      styles={{
        options: {
          arrowColor: "#ffffff",
          overlayColor: "rgba(11, 11, 11, 0.45)",
          primaryColor: "#000",
          textColor: "#004a14",
          width: 350,
          zIndex: 1000,
        },
      }}
      callback={(data) => {
        if (data?.action === "reset") {
          setStartTour(false);
        }
        console.log("data", data);
      }}
    />
  );
};

export default JoyRide;
