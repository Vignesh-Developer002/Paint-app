import React, { useContext } from "react";
import { globalStore } from "../../StoreContext/StoreContext";
import { Line } from "react-konva";

const ShowStage2Poly = () => {
  const { showObPoly, nextStage2Points } = useContext(globalStore);
  console.log("stage2 polygonarray", showObPoly);
  return (
    <>
      {Array.isArray(showObPoly) &&
        showObPoly.map((d) => (
          <Line
            key={d?.id}
            id={d?.id}
            points={d?.points}
            fill={d?.fill}
            stroke={d?.stroke}
            strokeWidth={d?.strokeWidth}
            closed={d?.closed}
            name={d?.name}
          />
        ))}
    </>
  );
};

export default ShowStage2Poly;
