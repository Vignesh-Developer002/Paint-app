import React, { useContext } from "react";
import { Group, Rect, Circle } from "react-konva";
import { globalStore } from "../../StoreContext/StoreContext";

const ShowSingleRect = () => {
  const { showSingleRect, handleShapeClick, handleStageVisble, drawCircle } =
    useContext(globalStore);

  return (
    <>
      {Array.isArray(showSingleRect) &&
        showSingleRect.map((d, idx) => (
          //   <Group>
          <Rect
            key={idx}
            x={d.x}
            y={d.y}
            width={d?.width || 0}
            height={d?.height || 0}
            fill="Grey"
            stroke="black"
            strokeWidth={5}
            rotation={d?.rotation || 0}
            onDblClick={() => handleStageVisble()}
          />
          //   </Group>
        ))}
    </>
  );
};

export default ShowSingleRect;
