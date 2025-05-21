import React, { useContext } from "react";
import { globalStore } from "../../StoreContext/StoreContext";
import { Rect } from "react-konva";

const DrawSingleRect = () => {
  const {
    drawsingleRect,
    setDrawSingleRect,
    showSingleRect,
    setShowSingleRect,
  } = useContext(globalStore);
  console.log(showSingleRect);
  return (
    <>
      {Object.values(drawsingleRect) && (
        <Rect
          x={drawsingleRect?.x || 0}
          y={drawsingleRect?.y || 0}
          width={drawsingleRect?.width || 0}
          height={drawsingleRect?.height || 0}
          fill={drawsingleRect?.fill || "red"}
          stroke={drawsingleRect?.stroke || "red"}
          strokeWidth={drawsingleRect?.strokeWidth || 4}
          rotation={drawsingleRect?.rotation || 0}
        />
      )}
    </>
  );
};

export default DrawSingleRect;
