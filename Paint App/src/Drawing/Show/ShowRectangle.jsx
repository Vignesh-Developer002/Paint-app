import React, { useContext, useEffect } from "react";
import { Rect, Image as KonvaImage, Group } from "react-konva";
import { globalStore } from "../../StoreContext/StoreContext";
import useImage from "use-image";

const ShowRectangle = () => {
  const {
    handleTransformetMouseDown,
    drawing,
    setDrawing,
    btnName,
    isFlipped,
    currentlyDrawnShap,
    angle,
    setAngle,
    oppositAngle,
    xy,
    setXy,
    shapes,
  } = useContext(globalStore);

  let res = shapes.filter((d) => d.name === "rectangle");
  
  // function for handle rectangle drag
  function handleRectDrag(e, id) {
    let x = e.target.x();
    let y = e.target.y();
    setDrawing((prev) =>
      prev.map((r) => (r.id === id ? { ...r, x: x, y: y } : r))
    );
  }

  //function for tranformend
  function handleTransformEnd(e, id, name) {
    console.log("transform");
    let x = e.target.x();
    let y = e.target.y();
    console.log("xy inside the tranform function", "x", x, "y", y);
    let rotate = e.target.rotation();
    setAngle(rotate);
    setDrawing((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, x: x, y: y, rotation: rotate } : d
      )
    );
  }

  return (
    <>
      {Array.isArray(res) &&
        res.map((r, idx) => {
          return (
            <Rect
              key={idx}
              x={r.x}
              y={r.y}
              width={r.width}
              height={r.height}
              fill={r.fill}
              stroke={r.stroke}
              name={r.name}
              strokeWidth={r.strokeWidth}
              draggable={btnName === "select" ? true : false}
              rotation={r.rotation || 0}
              onDragEnd={(e) => handleRectDrag(e, r.id)}
              onMouseDown={(e) => handleTransformetMouseDown(e, r.id, r.name)}
              onTransformEnd={(e) => handleTransformEnd(e, r.id, r.name)}
            />
          );
        })}
    </>
  );
};

export default ShowRectangle;
