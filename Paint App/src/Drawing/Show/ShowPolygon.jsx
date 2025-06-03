import React, { useContext, useEffect } from "react";
import { polygon } from "../../components/Schemas/Schemas";
import { Circle, Line } from "react-konva";
import { globalStore } from "../../StoreContext/StoreContext";

const ShowPolygon = () => {
  const {
    handleTransformetMouseDown,
    drawPolygon,
    setDrawPolygon,
    btnName,
    isFlipped,
  } = useContext(globalStore);

  function handlePolygonDrag(e, id) {
    let x = e.target.x();
    let y = e.target.y();
    console.log(x, y, "normal polygon drag", id);
    setDrawPolygon((prev) =>
      prev.map((p) => (p.id === id ? { ...p, x: x, y: y } : p))
    );
  }

  //function for handletransformEnd i.e) rotation
  function handletransformEnd(e, id) {
    let x = e.target.x();
    let y = e.target.y();
    let rotate = e.target.rotation();

    setDrawPolygon((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, x: x, y: y, rotation: rotate } : d
      )
    );
  }

  return (
    <>
      {Array.isArray(drawPolygon) &&
        drawPolygon.map((p, idx) => (
          <Line
            x={p?.x}
            y={p?.y}
            key={idx}
            id={p.id}
            points={p.points}
            fill={p.fill}
            name={p.name}
            stroke={p.stroke}
            strokeWidth={p.strokeWidth}
            closed={p.closed}
            draggable={btnName === "select" ? true : false}
            rotation={p.rotation}
            onDragEnd={(e) => handlePolygonDrag(e, p.id)}
            onTransformEnd={(e) => handletransformEnd(e, p.id, p.name)}
            onMouseDown={(e) => handleTransformetMouseDown(e, p.id, p.name)}
            // scaleY={isFlipped ? -1 : 1}
            // offsetY={50} // offset to flip around center
          />
        ))}
    </>
  );
};

export default ShowPolygon;
