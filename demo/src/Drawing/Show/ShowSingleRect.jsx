import React, { useContext, useRef } from "react";
import { Group, Rect, Circle, Line } from "react-konva";
import { globalStore } from "../../StoreContext/StoreContext";

const ShowSingleRect = () => {
  const {
    showSingleRect,
    setShowSingleRect,
    handleStageVisble,
    singleRectRef,
    showObRect,
    showObCircle,
    showObPoly,
    showObLine,
    Stage2ShapeColor,
    handleTransformetMouseDown,
    transformerRef,
    btnName,
  } = useContext(globalStore);

  // function for handle transform
  function handleTransform(e) {
    console.log("transform happens");
    const transformerNode = e.currentTarget;
    transformerRef.current.nodes([transformerNode]);
  }

  // function for handle the drag
  function handleDrag(e, id) {
    console.log("drag happens");
    let x = e.target.x();
    let y = e.target.y();
    setShowSingleRect((p) =>
      p.map((d) => (d.id === id ? { ...d, x: x, y: y } : d))
    );
  }

  //function for tranformend
  function handleTransformEnd(e, id, name) {
    let x = e.target.x();
    let y = e.target.y();
    let rotate = e.target.rotation();
    setShowSingleRect((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, x: x, y: y, rotation: rotate } : d
      )
    );
  }

  return (
    <>
      {Array.isArray(showSingleRect) &&
        showSingleRect.map((d, idx) => (
          <Group
            key={d.id}
            onClick={(e) => handleTransform(e, idx)}
            onMouseDown={(e) => handleTransformetMouseDown(e)}
            onDblClick={(e) => handleStageVisble(e)}
            draggable={btnName === "select" ? true : false}
            // rotation={d?.rotation || 0}
          >
            <Rect
              x={d.x}
              onTransformEnd={(e) => handleTransformEnd(e, d.id, d.name)}
              // rotation={d?.rotation}
              y={d.y}
              id={d.id}
              ref={singleRectRef}
              key={d.id}
              width={d?.width || 0}
              height={d?.height || 0}
              fill="lightGrey"
              stroke="black"
              strokeWidth={2}
              onDragEnd={(e) => handleDrag(e, d.id)}
            />

            {Array.isArray(showObPoly) &&
              showObPoly.map((d) => (
                <Line
                  key={d?.id}
                  id={d?.id}
                  x={d?.x}
                  y={d?.y}
                  points={d?.points}
                  fill={Stage2ShapeColor === true ? "lightBlue" : ""}
                  stroke={Stage2ShapeColor === true ? "lightGrey" : ""}
                  strokeWidth={d?.strokeWidth}
                  closed={d?.closed}
                  name={d?.name}
                  rotation={d?.rotation}
                />
              ))}
            {Array.isArray(showObRect) &&
              showObRect.map((d, idx) => (
                <Rect
                  key={d.id}
                  x={d?.x || 0}
                  y={d?.y || 0}
                  width={d?.width || 0}
                  height={d?.height || 0}
                  fill={Stage2ShapeColor === true ? "lightBlue" : ""}
                  stroke={Stage2ShapeColor === true ? "lightGrey" : ""}
                  strokeWidth={d?.strokeWidth || 4}
                  rotation={d?.rotation || 0}
                />
              ))}

            {Array.isArray(showObCircle) &&
              showObCircle.map((d) => (
                <Circle
                  key={d?.id}
                  id={d?.id}
                  x={d?.x}
                  y={d?.y}
                  name={d?.name}
                  radius={d?.radius}
                  fill={Stage2ShapeColor === true ? "lightBlue" : ""}
                  stroke={Stage2ShapeColor === true ? "lightGrey" : ""}
                  strokeWidth={d?.strokeWidth}
                  rotation={d?.rotation}
                />
              ))}

            {Array.isArray(showObLine) &&
              showObLine.map((d) => (
                <Line
                  key={d?.id}
                  id={d?.id}
                  x={d?.x}
                  y={d?.y}
                  name={d?.name}
                  points={d?.points}
                  stroke={Stage2ShapeColor === true ? "lightBlue" : ""}
                  strokeWidth={d?.strokeWidth}
                  lineJoin={d?.lineJoin}
                  rotation={d?.rotation}
                />
              ))}
          </Group>
        ))}
    </>
  );
};

export default ShowSingleRect;
