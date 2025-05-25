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
  } = useContext(globalStore);

  // function for handle transform
  function handleTransform(e) {
    const transformerNode = e.currentTarget;
    transformerRef.current.nodes([transformerNode]);
  }

  // function for handle the drag
  function handleDrag(e, id) {
    // localStorage.setItem("draghappens", JSON.stringify("true"));
    let x = e.target.x();
    let y = e.target.y();
    setShowSingleRect((p) =>
      p.map((d) => (d.id === id ? { ...d, x: x, y: y } : d))
    );
  }

  //function for tranformend
  function handleTransformEnd(e, id, name) {
    // console.log("rotation happens at transform end");
    let x = e.target.x();
    let y = e.target.y();
    let rotate = e.target.rotation();
    // console.log("rotation", rotate);
    setShowSingleRect((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, x: x, y: y, rotation: rotate } : d
      )
    );
  }

  console.log("dragHappens", dragHappen);
  return (
    <>
      {Array.isArray(showSingleRect) &&
        showSingleRect.map((d, idx) => (
          <Group
            key={d.id}
            // onMouseDown={(e) => handleTransformetMouseDown(e)}
            onDblClick={(e) => handleStageVisble(e)}
            draggable={btnName === "select" ? true : false}
            onTransformEnd={(e) => handleTransformEnd(e, d.id, d.name)}
            onDragEnd={(e) => handleDrag(e, d.id)}
            // x={d.x}-default
            // y={d.y}-default
            // x={0}-second logic
            // y={0}-second logic
            x={!dragHappen ? d.x : 0}
            y={!dragHappen ? d.y : 0}
            // rotation={d?.rotation}
            // x={d.x}
            // y={d.y}
          >
            <Rect
              x={!dragHappen ? 0 : d.x}
              y={!dragHappen ? 0 : d.y}
              // x={0}
              // y={0}
              // x={0}-default
              // y={0}-default
              // x={d.x}-second logic
              // y={d.y}-second logic
              rotation={0}
              onClick={(e) => handleTransform(e, idx)}
              fill="lightGrey"
              stroke="black"
              id={d.id}
              ref={singleRectRef}
              key={d.id}
              width={d?.width || 0}
              height={d?.height || 0}
              strokeWidth={2}
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
