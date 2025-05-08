import React, { useContext } from "react";
import { Circle, Line } from "react-konva";
import { globalStore } from "../../StoreContext/StoreContext.jsx";

const DrawPolygon = () => {
  const { polygons, nextPoint, handleAnchorClick, isComplete } =
    useContext(globalStore);
  return (
    <>
      {Object.keys(polygons) && (
        <Line
          id={polygons?.id}
          points={polygons?.points?.concat([nextPoint.x, nextPoint.y])}
          fill={polygons?.fill}
          stroke={polygons?.stroke}
          strokeWidth={polygons?.strokeWidth}
          closed={polygons?.closed}
        />
      )}
      {/* isComplete */}
      {!isComplete ? (
        <Circle
          x={polygons?.points?.[0] ?? 0}
          y={polygons?.points?.[1] ?? 0}
          fill="red"
          radius={5}
          onClick={handleAnchorClick}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default DrawPolygon;
