import React, { useContext, useRef } from "react";
import { Group, Rect, Circle, Line } from "react-konva";
import { globalStore } from "../../StoreContext/StoreContext";

const ShowSingleRect = () => {
  const {
    showSingleRect,
    handleStageVisble,
    singleRectRef,
    showObRect,
    showObCircle,
  } = useContext(globalStore);

  return (
    <>
      {Array.isArray(showSingleRect) &&
        showSingleRect.map((d, idx) => (
          <Group key={idx}>
            <Rect
              ref={singleRectRef}
              key={idx}
              x={d.x}
              y={d.y}
              width={d?.width || 0}
              height={d?.height || 0}
              fill="lightGrey"
              stroke="black"
              strokeWidth={2}
              rotation={d?.rotation || 0}
              onDblClick={(e) => handleStageVisble(e)}
            />

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

            {Array.isArray(showObCircle) &&
              showObCircle.map((d) => (
                <Circle
                  key={d?.id}
                  id={d?.id}
                  x={d?.x}
                  y={d?.y}
                  name={d?.name}
                  radius={d?.radius}
                  fill={d?.fill}
                  stroke={d?.stroke}
                  strokeWidth={d?.strokeWidth}
                  rotation={d?.rotation}
                />
              ))}
          </Group>
        ))}
    </>
  );
};

export default ShowSingleRect;
