import React, { useContext } from "react";
import { globalStore } from "../../StoreContext/StoreContext";
import { Line } from "react-konva";

const ShowStage2Line = () => {
  const {
    showObLine,
    setShowObLine,
    handleTransformetMouseDown,
    Stage2ShapeColor,
  } = useContext(globalStore);

  // function for handle Drag end
  function handleDrag(e, id) {
    let x = e.target.x();
    let y = e.target.y();
    setShowObLine((prev) =>
      prev.map((l) => (l.id === id ? { ...l, x: x, y: y } : l))
    );
  }

  // function for handle trasform end
  function handleTranfomEnd(e, id, name) {
    let x = e.target.x();
    let y = e.target.y();
    let rotate = e.target.rotation();
    setShowObLine((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, x: x, y: y, rotation: rotate } : d
      )
    );
  }
  return (
    <>
      {Array.isArray(showObLine) &&
        showObLine.map((d) => (
          <Line
            key={d?.id}
            id={d?.id}
            x={d?.x}
            y={d?.y}
            name={d?.name}
            points={d?.points}
            stroke={Stage2ShapeColor === false ? "black" : ""}
            lineJoin={d?.lineJoin}
            rotation={d?.rotation}
            draggable={Stage2ShapeColor === false ? true : false}
            onDragEnd={(e) => handleDrag(e, d.id)}
            onTransformEnd={(e) => handleTranfomEnd(e, d.id, d.name)}
            onMouseDown={(e) => handleTransformetMouseDown(e, d.id, d.name)}
            listening={Stage2ShapeColor === false ? true : false}
          />
        ))}
    </>
  );
};

export default ShowStage2Line;
