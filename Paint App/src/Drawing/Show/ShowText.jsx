import React, { useContext } from "react";
import { globalStore } from "../../StoreContext/StoreContext";
import { Text } from "react-konva";

const ShowText = () => {
  const { drawText, handleTransformetMouseDown, shapes } =
    useContext(globalStore);

  let res = shapes.filter((d) => d.name === "text");
  console.log("text", res);
  return (
    <>
      {Array.isArray(res) &&
        res.map((d) => (
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
