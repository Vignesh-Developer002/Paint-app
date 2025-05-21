import React, { useContext } from "react";
import { Rect } from "react-konva";
import { globalStore } from "../../StoreContext/StoreContext";

const ShowSingleRect = () => {
  const { showSingleRect, handleShapeClick, handleStageVisble } =
    useContext(globalStore);

  return (
    <>
      {Array.isArray(showSingleRect) &&
        showSingleRect.map((d) => (
          <Rect
            x={d.x}
            y={d.y}
            width={d?.width || 0}
            height={d?.height || 0}
            fill={d?.fill || "red"}
            stroke={d?.stroke || "red"}
            strokeWidth={d?.strokeWidth || 4}
            rotation={d?.rotation || 0}
            onDblClick={() => handleStageVisble()}
          />
        ))}
    </>
  );
};

export default ShowSingleRect;
