import React from "react";
import { useContext } from "react";
import { globalStore } from "../../StoreContext/StoreContext";
import { Circle } from "react-konva";

const DrawStage2Circle = () => {
  const { obCir } = useContext(globalStore);
  return (
    <>
      {Object.values(obCir) && (
        <Circle
          id={obCir?.id}
          x={obCir?.x}
          y={obCir?.y}
          name={obCir?.name}
          radius={obCir?.radius}
          fill={obCir?.fill}
          stroke={obCir?.stroke}
          strokeWidth={obCir?.strokeWidth}
          rotation={obCir?.rotation}
        />
      )}
    </>
  );
};

export default DrawStage2Circle;
