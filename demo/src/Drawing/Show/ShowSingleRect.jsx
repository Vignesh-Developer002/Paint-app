import React, { useContext, useRef } from "react";
import { Group, Rect, Circle, Line } from "react-konva";
import { globalStore } from "../../StoreContext/StoreContext";

const ShowSingleRect = () => {
  const {
    showSingleRect,
    handleShapeClick,
    handleStageVisble,
    drawCircle,
    btnEnablen,
    rectMouseDown,
    handleTransformetMouseDown,
    setRectMouseDown,
    singleRectRef,
    drawing,
    drawPolygon,
    drawLine,
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
          </Group>
        ))}
    </>
  );
};

export default ShowSingleRect;
