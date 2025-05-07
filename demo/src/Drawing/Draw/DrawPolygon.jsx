import React, { useContext } from "react";
import { Circle, Line } from "react-konva";
import { globalStore } from "../../StoreContext/StoreContext.jsx";

const DrawPolygon = () => {
  const { polygons, nextPoint, handleAnchorClick } = useContext(globalStore);
  return (
    <>
      {Object.values(polygons) && (
        <Line
          id={polygons?.id}
          points={polygons?.points?.concat([nextPoint.x, nextPoint.y])}
          fill={polygons?.fill}
          stroke={polygons?.stroke}
          strokeWidth={polygons?.strokeWidth}
          closed={polygons?.closed}
        />
      )}
      {polygons.closed === false && (
        <Circle
          x={polygons?.points[0] || null}
          y={polygons?.points[1] || null}
          fill={"red"}
          radius={5}
          onClick={() => handleAnchorClick()}
        />
      )}
    </>
  );
};

export default DrawPolygon;
