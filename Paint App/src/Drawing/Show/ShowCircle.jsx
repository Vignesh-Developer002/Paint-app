import React, { useContext, useEffect, useState, useRef } from "react";
import { Circle } from "react-konva";
import { globalStore } from "../../StoreContext/StoreContext.jsx";

const ShowCircle = () => {
  const {
    handleTransformetMouseDown,
    drawCircle,
    setDrawCircle,
    btnName,
    isFlipped,
    shapes,
    setShapes,
  } = useContext(globalStore);

  let res = shapes.filter((d) => d.name === "circle");

  function handleDragEnd(e, id) {
    let x = e.target.x();
    let y = e.target.y();
    setDrawCircle((prev) =>
      prev.map((d) => (d.id === id ? { ...d, x: x, y: y } : d))
    );
  }

  //function for handle the transform end
  function handleTransformEnd(e, id, name) {
    let x = e.target.x();
    let y = e.target.y();
    let rotate = e.target.rotation();
    setDrawCircle((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, x: x, y: y, rotation: rotate } : d
      )
    );
  }

  return (
    <>
      {Array.isArray(res) &&
        res.map((c, idx) => (
          <Circle
            key={idx}
            id={c.id}
            x={c.x}
            y={c.y}
            name={c.name}
            radius={c.radius}
            fill={c.fill}
            stroke={c.stroke}
            strokeWidth={c.strokeWidth}
            onDragEnd={(e) => handleDragEnd(e, c.id)}
            onTransformEnd={(e) => handleTransformEnd(e, c.id, c.name)}
            draggable={btnName === "select" ? true : false}
            rotation={c.rotation || 0}
            onMouseDown={(e) => handleTransformetMouseDown(e, c.id, c.name)}
            scaleY={isFlipped ? -1 : 1}
            offsetY={0} // offset to flip around center
          />
        ))}
    </>
  );
};

export default ShowCircle;
