import React, { useContext, useEffect, useState, useRef } from "react";
import { Circle } from "react-konva";
import { circle } from "../../components/Schemas/Schemas";
import { globalStore } from "../../StoreContext/StoreContext.jsx";

const ShowCircle = () => {
  const { handleTransformetMouseDown, drawCircle, setDrawCircle,btnEnablen } =
    useContext(globalStore);

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
      {Array.isArray(drawCircle) &&
        drawCircle.map((c, idx) => (
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
            draggable={btnEnablen}
            rotation={c.rotation || 0}
            onMouseDown={(e) => handleTransformetMouseDown(e, c.id, c.name)}
          />
        ))}
    </>
  );
};

export default ShowCircle;
