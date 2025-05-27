import React, { useContext } from "react";
import { globalStore } from "../../StoreContext/StoreContext";
import { Line } from "react-konva";

const ShowScribble = () => {
  const {
    drawScribble,
    handleTransformetMouseDown,
    setDrawScribble,
    handleShapeClick,
    btnName,
  } = useContext(globalStore);

  function handleRectDrag(e, id) {
    const x = e.target.x();
    const y = e.target.y();
    setDrawScribble((prev) =>
      prev.map((d) => (d.id === id ? { ...d, x: x, y: y } : d))
    );
  }

  function handleTransformEnd(e, id) {
    const x = e.target.x();
    const y = e.target.y();
    const rotate = e.target.rotation();
    setDrawScribble((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, x: x, y: y, rotation: rotate } : d
      )
    );
  }

  return (
    <>
      {Array.isArray(drawScribble) &&
        drawScribble.map((d, idx) => (
          <Line
            x={d?.x}
            y={d?.y}
            key={idx}
            points={d.points}
            stroke={d.stroke}
            strokeWidth={d.strokeWidth}
            lineCap={d.lineCap}
            lineJoin={d.lineJoin}
            draggable={btnName === "select" ? true : false}
            onDragEnd={(e) => handleRectDrag(e, d.id)}
            onMouseDown={(e) => handleTransformetMouseDown(e, d.id, d.name)}
            onTransformEnd={(e) => handleTransformEnd(e, d.id, d.name)}
          />
        ))}
    </>
  );
};

export default ShowScribble;
