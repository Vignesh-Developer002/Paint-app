import React, { useContext } from "react";
import { globalStore } from "../../StoreContext/StoreContext";
import { Rect } from "react-konva";

const ShowStage2Rect = () => {
  const { showObRect } = useContext(globalStore);
  return (
    <>
      {Array.isArray(showObRect) &&
        showObRect.map((d, idx) => (
          <Rect
            key={idx}
            x={d?.x || 0}
            y={d?.y || 0}
            width={d?.width || 0}
            height={d?.height || 0}
            fill={d?.fill || "red"}
            stroke={d?.stroke || "red"}
            strokeWidth={d?.strokeWidth || 4}
            rotation={d?.rotation || 0}
          />
        ))}
    </>
  );
};

export default ShowStage2Rect;
