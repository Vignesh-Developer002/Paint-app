import React, { useContext } from "react";
import { globalStore } from "../../StoreContext/StoreContext";
import { Line, Circle } from "react-konva";

const DrawStage2Poly = () => {
  const {
    obPoly,
    nextStage2Points,
    PolyStage2Complete,
    initialRadius,
    handleCircleClick,
  } = useContext(globalStore);
  return (
    <>
      {Object.values(obPoly) && (
        <Line
          id={obPoly?.id}
          points={obPoly?.points?.concat([
            nextStage2Points.x,
            nextStage2Points.y,
          ])}
          fill={obPoly?.fill}
          stroke={obPoly?.stroke}
          strokeWidth={obPoly?.strokeWidth}
          closed={obPoly?.closed}
          name={obPoly?.name}
        />
      )}

      {!PolyStage2Complete ? (
        <Circle
          x={obPoly?.points?.[0] ?? ""}
          y={obPoly?.points?.[1] ?? ""}
          fill="red"
          radius={!PolyStage2Complete ? initialRadius : 0}
          onClick={handleCircleClick}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default DrawStage2Poly;
