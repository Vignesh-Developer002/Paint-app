import React, { useContext } from "react";
import { globalStore } from "../../StoreContext/StoreContext";
import { Line } from "react-konva";

const ShowStage2Poly = () => {
  const {
    showObPoly,
    nextStage2Points,
    Stage2ShapeColor,
    setShowObpoly,
    handleTransformetMouseDown,
  } = useContext(globalStore);

  //function for handle the handel drag
  function handlePolygonDrag(e, id) {
    let x = e.target.x();
    let y = e.target.y();
    setShowObpoly((prev) =>
      prev.map((p) => (p.id === id ? { ...p, x: x, y: y } : p))
    );
  }

  //function for handletransformEnd i.e) rotation
  function handletransformEnd(e, id) {
    console.log("rotation happens");
    let x = e.target.x();
    let y = e.target.y();
    let rotate = e.target.rotation();
    setShowObpoly((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, x: x, y: y, rotation: rotate } : d
      )
    );
  }
  console.log("showObPoly", showObPoly);

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
            draggable={Stage2ShapeColor === false ? true : false}
            rotation={d?.rotation || 0}
            onDragEnd={(e) => handlePolygonDrag(e, d.id)}
            onTransformEnd={(e) => handletransformEnd(e, d.id, d.name)}
            onMouseDown={(e) => handleTransformetMouseDown(e, d.id, d.name)}
          />
        ))}
    </>
  );
};

export default ShowStage2Poly;
