import React, { useContext } from "react";
import { globalStore } from "../../StoreContext/StoreContext";
import { Rect } from "react-konva";

const DrawRectangle = () => {
  const { currentlyDrawnShap } = useContext(globalStore);

  return (
    <>
      {Object.values(currentlyDrawnShap) && (
        <Rect
          x={currentlyDrawnShap?.x || 0}
          y={currentlyDrawnShap?.y || 0}
          width={currentlyDrawnShap?.width || 0}
          height={currentlyDrawnShap?.height || 0}
          fill={currentlyDrawnShap?.fill || "red"}
          stroke={currentlyDrawnShap?.stroke || "red"}
          strokeWidth={currentlyDrawnShap?.strokeWidth || 4}
          rotation={currentlyDrawnShap?.rotation || 0}
        />
      )}
    </>
  );
};

export default DrawRectangle;
