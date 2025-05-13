import React, { useContext } from "react";
import { globalStore } from "../../StoreContext/StoreContext";
import { Text } from "react-konva";

const ShowText = () => {
  const { drawText, setDrawText, handleTransformetMouseDown } =
    useContext(globalStore);
  console.log(Array.isArray(drawText));
  return (
    <>
      {Array.isArray(drawText) &&
        drawText.map((d) => (
          <Text
            key={d.id}
            x={d?.x}
            y={d?.y}
            text={d?.text}
            fontSize={d?.fontSize}
            fontStyle={d?.fontStyle}
            fill={d?.fill}
            width={d?.width}
            onMouseDown={(e) => handleTransformetMouseDown(e, d.id, d.name)}
            draggable={true}
          />
        ))}
    </>
  );
};

export default ShowText;
