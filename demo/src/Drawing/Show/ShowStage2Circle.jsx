import React, { useContext } from "react";
import { globalStore } from "../../StoreContext/StoreContext";
import { Circle } from "react-konva";

const ShowStage2Circle = () => {
  const { showObCircle, setShowObCirlce } = useContext(globalStore);
  return (
    <>
      {Array.isArray(showObCircle) &&
        showObCircle.map((d, idx) => (
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
    </>
  );
};

export default ShowStage2Circle;
