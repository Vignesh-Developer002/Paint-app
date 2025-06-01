import React, { useContext } from "react";
import { Rect } from "react-konva";
import { globalStore } from "../../StoreContext/StoreContext";

const DrawStage2Rect = () => {
  const { obRect } = useContext(globalStore);
  return (
    <>
      {Object.values(obRect) && (
        <Rect
          x={obRect?.x || 0}
          y={obRect?.y || 0}
          width={obRect?.width || 0}
          height={obRect?.height || 0}
          fill={obRect?.fill || "red"}
          stroke={obRect?.stroke || "red"}
          strokeWidth={obRect?.strokeWidth || 4}
          rotation={obRect?.rotation || 0}
        />
      )}
    </>
  );
};

export default DrawStage2Rect;
