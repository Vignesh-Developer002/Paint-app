import React, { useContext } from "react";
import { Circle } from "react-konva";
import { globalStore } from "../../StoreContext/StoreContext";

const DrawCircle = () => {
  const { currentlyDrawnCircle } = useContext(globalStore);
  let rad = currentlyDrawnCircle["radius"];
  return (
    <>
      {rad > 5 && Object.values(currentlyDrawnCircle) && (
        <Circle
          x={currentlyDrawnCircle?.x}
          y={currentlyDrawnCircle?.y}
          radius={currentlyDrawnCircle?.radius}
          fill={currentlyDrawnCircle?.fill}
          stroke={currentlyDrawnCircle?.stroke}
          strokeWidth={currentlyDrawnCircle?.strokeWidth}
          rotation={currentlyDrawnCircle?.rotation}
        />
      )}
    </>
  );
};

export default DrawCircle;
