import React, { useContext, useState } from "react";
import { Circle, Line } from "react-konva";
import { globalStore } from "../../StoreContext/StoreContext.jsx";

const DrawPolygon = () => {
  const { polygons, nextPoint, handleAnchorClick, isComplete, initialRadius } =
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
          name={polygons?.name}
        />
      )}
      {/* isComplete */}
      {!isComplete ? (
        <Circle
          x={polygons?.points?.[0] ?? ""}
          y={polygons?.points?.[1] ?? ""}
          fill="red"
          radius={!isComplete ? initialRadius : 0}
          onClick={handleAnchorClick}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default DrawPolygon;
