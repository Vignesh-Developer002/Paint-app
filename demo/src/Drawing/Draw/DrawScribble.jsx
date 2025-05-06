import React, { useContext } from "react";
import { Line } from "react-konva";
import { globalStore } from "../../StoreContext/StoreContext";

const DrawScribble = () => {
  const { scribble } = useContext(globalStore);
  return (
    <>
      {Object.values(scribble) && (
        <Line
          points={scribble?.points}
          stroke={scribble?.stroke}
          strokeWidth={scribble?.strokeWidth}
          lineCap={scribble?.lineCap || "round"}
          lineJoin={scribble?.lineJoin || "round"}
        />
      )}
    </>
  );
};

export default DrawScribble;
