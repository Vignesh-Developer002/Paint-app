import React, { useContext, useEffect } from "react";
import { Rect } from "react-konva";
import { globalStore } from "../../StoreContext/StoreContext";

const ShowRectangle = () => {
  const {
    handleTransformetMouseDown,
    drawing,
    setDrawing,
    handleShapeClick,
    handleStageVisble,
    btnEnablen,
  } = useContext(globalStore);

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
    let x = e.target.x();
    let y = e.target.y();
    let rotate = e.target.rotation();
    setDrawing((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, x: x, y: y, rotation: rotate } : d
      )
    );
  }
  return (
    <>
      {Array.isArray(drawing) &&
        drawing.map((r, idx) => {
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
              draggable={true}
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
