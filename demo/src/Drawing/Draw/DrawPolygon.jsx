import React, { useContext } from "react";
import { Line } from "react-konva";
import { globalStore } from "../../StoreContext/StoreContext.jsx";

const DrawPolygon = () => {
  const { polygons } = useContext(globalStore);
  return (
    <>
      {Object.values(polygons) && (
        <Line
          points={polygons?.points}
          fill={polygons?.fill}
          stroke={polygons?.stroke}
          strokeWidth={polygons?.strokeWidth}
          closed={false}
        />
      )}
    </>
  );
};

export default DrawPolygon;
