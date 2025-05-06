import React, { useContext, useEffect, useState } from "react";
import { Circle } from "react-konva";
import { circle } from "../../components/Schemas/Schemas";
import { globalStore } from "../../StoreContext/StoreContext.jsx";

const ShowCircle = () => {
  const {
    handleTransformetMouseDown,
    drawCircle,
    setCurrentlyDrawnCircle,
    setDrawCircle,
  } = useContext(globalStore);
  // const lStorageCircle = localStorage.getItem("circle");
  // let result;
  // result = JSON.parse(lStorageCircle);

  function handleDragEnd(e, id) {
    let x = e.target.x();
    let y = e.target.y();
    // let data = drawCircle.map((d) => (d.id === id ? { ...d, x: x, y: y } : d));
    setDrawCircle((prev) =>
      prev.map((d) => (d.id === id ? { ...d, x: x, y: y } : d))
    );
    // localStorage.setItem("circle", JSON.stringify(data));
  }

  // if (!localStorage.getItem("circle")) {
  //   useEffect(() => {
  //     localStorage.setItem("circle", JSON.stringify(circle));
  //   }, []);
  // }

  //function for handle the transform end
  function handleTransformEnd(e, id, name) {
    let x = e.target.x();
    let y = e.target.y();
    let rotate = e.target.rotation();
    // const localData = JSON.parse(localStorage.getItem(name));
    // let result = drawCircle.map((d) =>
    //   d.id === id ? { ...d, x: x, y: y, rotation: rotate } : d
    // );
    setDrawCircle((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, x: x, y: y, rotation: rotate } : d
      )
    );

    // localStorage.setItem(name, JSON.stringify(result));
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
            draggable={true}
            rotation={c.rotation || 0}
            onMouseDown={(e) => handleTransformetMouseDown(e, c.id, c.name)}
          />
        ))}
    </>
  );
};

export default ShowCircle;
