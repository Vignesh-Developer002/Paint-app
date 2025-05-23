import React, { useContext } from "react";
import { globalStore } from "../../StoreContext/StoreContext";
import { Line } from "react-konva";

const ShowStage2Line = () => {
  const { showObLine } = useContext(globalStore);
  return (
    <>
      {Array.isArray(showObLine) &&
        showObLine.map((d) => (
          <Line
            key={d?.id}
            id={d?.id}
            x={d?.x}
            y={d?.y}
            name={d?.name}
            points={d?.points}
            stroke={d?.stroke}
            fill={d?.fill}
            strokeWidth={d?.strokeWidth}
            lineJoin={d?.lineJoin}
            rotation={d?.rotation}
          />
        ))}
    </>
  );
};

export default ShowStage2Line;
