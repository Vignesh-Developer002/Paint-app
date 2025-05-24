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
  } = useContext(globalStore);

  // function for handle transform
  function handleTransform(e) {
    const transformerNode = e.currentTarget;
    transformerRef.current.nodes([transformerNode]);
  }

  // function for handle the drag
  function handleRectDrag(e, id) {
    let x = e.target.x();
    let y = e.target.y();
    console.log(x, y);
    setShowSingleRect((p) =>
      p.map((d) => (d.id === id ? { ...d, x: x, y: y } : d))
    );
  }

  return (
    <>
      {Array.isArray(showSingleRect) &&
        showSingleRect.map((d, idx) => (
          <Group
            key={idx}
            onDblClick={(e) => handleStageVisble(e)}
            onMouseDown={(e) => handleTransformetMouseDown(e)}
            onClick={(e) => handleTransform(e, idx)}
            draggable={true}
            rotation={d.rotation}
          >
            <Rect
              x={d.x}
              y={d.y}
              id={d.id}
              rotation={d?.rotation || 0}
              ref={singleRectRef}
              key={idx}
              width={d?.width || 0}
              height={d?.height || 0}
              fill="lightGrey"
              stroke="black"
              strokeWidth={2}
              onDragEnd={(e) => handleRectDrag(e, d.id)}
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
                  key={idx}
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
