import React, { useContext } from "react";
import { Line } from "react-konva";
import { globalStore } from "../../StoreContext/StoreContext.jsx";

const DrawLine = () => {
  const { lines } = useContext(globalStore);
  console.log("line", lines);

  return (
    <>
      {Object.values(lines) && (
        <Line
          name={lines?.name}
          rotation={lines?.rotation}
          points={lines?.points}
          stroke={lines?.stroke}
          strokeWidth={lines?.strokeWidth}
          lineJoin={lines?.lineJoin}
        />
      )}
    </>
  );
};

export default DrawLine;
