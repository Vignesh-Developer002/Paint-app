import React, { useContext } from "react";
import { globalStore } from "../../StoreContext/StoreContext";
import { Line } from "react-konva";

const DrawStage2Line = () => {
  const { obLine } = useContext(globalStore);

  return (
    <>
      {Object.values(obLine) && (
        <Line
          id={obLine?.id}
          x={obLine?.x}
          y={obLine?.y}
          name={obLine?.name}
          points={obLine?.points}
          stroke={obLine?.stroke}
          fill={obLine?.fill}
          strokeWidth={obLine?.strokeWidth}
          lineJoin={obLine?.lineJoin}
          rotation={obLine?.rotation}
        />
      )}
    </>
  );
};

export default DrawStage2Line;
