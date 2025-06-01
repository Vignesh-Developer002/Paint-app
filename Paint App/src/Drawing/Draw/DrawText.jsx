import React, { useContext } from "react";
import { Text } from "react-konva";
import { globalStore } from "../../StoreContext/StoreContext";

const DrawText = () => {
  const { text, setText } = useContext(globalStore);
  return (
    <>
      {Object.values(text) && (
        <Text
          x={text?.x}
          y={text?.y}
          text={text?.text}
          fontSize={text?.fontSize}
          fontStyle={text?.fontStyle}
          fill={text?.fill}
          width={text?.width}
        />
      )}
    </>
  );
};

export default DrawText;
