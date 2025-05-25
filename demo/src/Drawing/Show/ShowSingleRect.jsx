import React, { useContext, useRef, useState } from "react";
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
    dragHappen,
    setDragHappens,
    stageRef,
  } = useContext(globalStore);

  const groupRef = useRef(null);
  // function for handle transform
  function handleTransform(e) {
    const transformerNode = e.currentTarget;
    transformerRef.current.nodes([transformerNode]);
  }

  // function for handle the drag
  function handleRectDrag(e, id) {
    let pos = e.target.getStage().getRelativePointerPosition();
    let x = pos.x;
    let y = pos.y;
    console.log("handledrag", x, y);
    setShowSingleRect((p) =>
      p.map((d) => (d.id === id ? { ...d, x: x, y: y } : d))
    );
  }

  console.log(showSingleRect);

  //function for tranformend
  function handleTransformEnd(e, id, name) {
    console.log("rotation happens at transform end");
    let x = e.target.x();
    let y = e.target.y();
    let rotate = e.target.rotation();
    console.log("handleTransformEnd", x, y, rotate);
    console.log("rotation", rotate);
    setShowSingleRect((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, x: x, y: y, rotation: rotate } : d
      )
    );
  }
  //----------------------------   outside single rectangle -----------------------------
  return (
    <>
      {Array.isArray(showSingleRect) &&
        showSingleRect.map((d, idx) => (
          <Group
            ref={groupRef}
            key={d.id}
            onDblClick={(e) => handleStageVisble(e)}
            x={0}
            y={0}
            draggable={btnName === "select" ? true : false}
          >
            <Rect
              fill="lightGrey"
              stroke="black"
              id={d.id}
              ref={singleRectRef}
              key={d.id}
              strokeWidth={2}
              width={d?.width || 0}
              height={d?.height || 0}
              onMouseDown={(e) => handleTransform(e, d.id, d.name)}
              onDragEnd={(e) => handleRectDrag(e, d.id)}
              x={d.x}
              y={d.y}
              // onTransformEnd={(e) => handleTransformEnd(e, d.id, d.name)}
              // rotation={d.rotation}
            />
            {Array.isArray(showObPoly) &&
              showObPoly.map((a) => (
                <Line
                  key={a?.id}
                  id={a?.id}
                  x={a?.x}
                  y={a?.y}
                  points={a?.points}
                  fill={Stage2ShapeColor === true ? "lightBlue" : ""}
                  stroke={Stage2ShapeColor === true ? "lightGrey" : ""}
                  strokeWidth={a?.strokeWidth}
                  closed={a?.closed}
                  name={a?.name}
                  rotation={a?.rotation}
                />
              ))}
            {Array.isArray(showObRect) &&
              showObRect.map((b, idx) => (
                <Rect
                  key={b.id}
                  x={b?.x || 0}
                  y={b?.y || 0}
                  width={b?.width || 0}
                  height={b?.height || 0}
                  fill={Stage2ShapeColor === true ? "lightBlue" : ""}
                  stroke={Stage2ShapeColor === true ? "lightGrey" : ""}
                  strokeWidth={b?.strokeWidth || 4}
                  rotation={b?.rotation || 0}
                />
              ))}
            {Array.isArray(showObCircle) &&
              showObCircle.map((c) => (
                <Circle
                  key={c?.id}
                  id={c?.id}
                  x={c?.x}
                  y={c?.y}
                  name={c?.name}
                  radius={c?.radius}
                  fill={Stage2ShapeColor === true ? "lightBlue" : ""}
                  stroke={Stage2ShapeColor === true ? "lightGrey" : ""}
                  strokeWidth={c?.strokeWidth}
                  rotation={c?.rotation}
                />
              ))}
            {Array.isArray(showObLine) &&
              showObLine.map((e) => (
                <Line
                  key={e?.id}
                  id={e?.id}
                  x={e?.x}
                  y={e?.y}
                  name={e?.name}
                  points={e?.points}
                  stroke={Stage2ShapeColor === true ? "lightBlue" : ""}
                  strokeWidth={e?.strokeWidth}
                  lineJoin={e?.lineJoin}
                  rotation={e?.rotation}
                />
              ))}
          </Group>
        ))}
    </>
  );
};

export default ShowSingleRect;
