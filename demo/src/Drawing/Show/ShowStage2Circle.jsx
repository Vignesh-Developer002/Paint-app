import React, { useContext } from "react";
import { globalStore } from "../../StoreContext/StoreContext";
import { Circle } from "react-konva";

const ShowStage2Circle = () => {
  const {
    showObCircle,
    setShowObCirlce,
    Stage2ShapeColor,
    handleTransformetMouseDown,
  } = useContext(globalStore);

  // Function for handle drageEnd
  function handleDragEnd(e, id) {
    let x = e.target.x();
    let y = e.target.y();
    setShowObCirlce((prev) =>
      prev.map((d) => (d.id === id ? { ...d, x: x, y: y } : d))
    );
  }

  // Function for handle TransformEnd
  function handleTransformEnd(e, id, name) {
    let x = e.target.x();
    let y = e.target.y();
    let rotate = e.target.rotation();
    setShowObCirlce((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, x: x, y: y, rotation: rotate } : d
      )
    );
  }
  return (
    <>
      {Array.isArray(showObCircle) &&
        showObCircle.map((d, idx) => (
          <Circle
            key={d?.id}
            id={d?.id}
            x={d?.x}
            y={d?.y}
            name={d?.name}
            radius={d?.radius}
            fill={d?.fill}
            stroke={d?.stroke}
            strokeWidth={d?.strokeWidth}
            rotation={d?.rotation}
            draggable={Stage2ShapeColor === false ? true : false}
            onDragEnd={(e) => handleDragEnd(e, d.id)}
            onTransformEnd={(e) => handleTransformEnd(e, d.id, d.name)}
            onMouseDown={(e) => handleTransformetMouseDown(e, d.id, d.name)}
          />
        ))}
    </>
  );
};

export default ShowStage2Circle;
