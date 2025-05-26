import React, { useContext } from "react";
import { globalStore } from "../../StoreContext/StoreContext";
import { Rect } from "react-konva";

const ShowStage2Rect = () => {
  const {
    showObRect,
    setShowObRect,
    handleTransformetMouseDown,
    Stage2ShapeColor,
  } = useContext(globalStore);

  // function for handle the handleRectDrag

  function handleRectDrag(e, id) {
    let x = e.target.x();
    let y = e.target.y();
    setShowObRect((prev) =>
      prev.map((r) => (r.id === id ? { ...r, x: x, y: y } : r))
    );
  }

  // function for handle the transform end

  function handleTransformEnd(e, id, name) {
    let x = e.target.x();
    let y = e.target.y();
    let rotate = e.target.rotation();
    setShowObRect((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, x: x, y: y, rotation: rotate } : d
      )
    );
  }
  return (
    <>
      {Array.isArray(showObRect) &&
        showObRect.map((d, idx) => (
          <Rect
            key={idx}
            x={d?.x || 0}
            y={d?.y || 0}
            width={d?.width || 0}
            height={d?.height || 0}
            fill={Stage2ShapeColor === false ? "lightgrey" : ""}
            stroke={Stage2ShapeColor === false ? "black" : ""}
            strokeWidth={d?.strokeWidth || 4}
            rotation={d?.rotation || 0}
            draggable={Stage2ShapeColor === false ? true : false}
            onDragEnd={(e) => handleRectDrag(e, d.id)}
            onMouseDown={(e) => handleTransformetMouseDown(e, d.id, d.name)}
            onTransformEnd={(e) => handleTransformEnd(e, d.id, d.name)}
            listening={Stage2ShapeColor === false ? true : false}
          />
        ))}
    </>
  );
};

export default ShowStage2Rect;
