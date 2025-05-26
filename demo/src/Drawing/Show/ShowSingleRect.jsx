import React, { useContext, useRef, useState } from "react";
import { Group, Rect, Circle, Line } from "react-konva";
import { globalStore } from "../../StoreContext/StoreContext";
import DrawSingleComponent from "../MainStage/DrawSingleComponent";
import ShowSingleComonent from "../MainStage/ShowSingleComonent";

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
    listern,
    setListern,
    groupRef,
    polyRef,
    rectRef,
    cirRef,
    lineRef,
  } = useContext(globalStore);

  //----------------------------   outside single rectangle -----------------------------
  // stageShapeColor -true
  return (
    <>
      {Array.isArray(showSingleRect) &&
        showSingleRect.map((d) => (
          <Group
            ref={groupRef}
            key={d.id}
            onDblClick={(e) => handleStageVisble(e)}
          >
            <Rect
              key={d?.id}
              x={d?.x || 0}
              y={d?.y || 0}
              width={d?.width || 0}
              height={d?.height || 0}
              fill={d?.fill || "red"}
              stroke={d?.stroke || "red"}
              strokeWidth={d?.strokeWidth || 4}
              rotation={d?.rotation || 0}
            />
            {Array.isArray(showObPoly) &&
              showObPoly.map((a) => (
                <Line
                  key={a?.id}
                  id={a?.id}
                  points={a?.points}
                  // fill={"lightblue"}
                  // stroke={"lightgrey"}
                  strokeWidth={a?.strokeWidth}
                  closed={a?.closed}
                  name={a?.name}
                  draggable={Stage2ShapeColor === true ? false : true}
                  rotation={a?.rotation || 0}
                  ref={polyRef}
                  listening={Stage2ShapeColor === true ? false : true}
                />
              ))}

            {Array.isArray(showObRect) &&
              showObRect.map((b) => (
                <Rect
                  key={b.id}
                  x={b?.x || 0}
                  y={b?.y || 0}
                  width={b?.width || 0}
                  height={b?.height || 0}
                  strokeWidth={b?.strokeWidth || 4}
                  rotation={b?.rotation || 0}
                  draggable={Stage2ShapeColor === true ? false : true}
                  listening={Stage2ShapeColor === true ? false : true}
                  ref={rectRef}
                />
              ))}
            {Array.isArray(showObCircle) &&
              showObCircle.map((d, idx) => (
                <Circle
                  key={d?.id}
                  id={d?.id}
                  x={d?.x}
                  y={d?.y}
                  name={d?.name}
                  radius={d?.radius}
                  // fill={Stage2ShapeColor === true ? "lightBlue" : ""}
                  // stroke={Stage2ShapeColor === true ? "lightgrey" : ""}
                  strokeWidth={d?.strokeWidth}
                  rotation={d?.rotation}
                  draggable={Stage2ShapeColor === true ? false : true}
                  ref={cirRef}
                  listening={Stage2ShapeColor === true ? false : true}
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
                  // stroke={Stage2ShapeColor === true ? "lightBlue" : ""}
                  strokeWidth={d?.strokeWidth}
                  lineJoin={d?.lineJoin}
                  rotation={d?.rotation}
                  ref={lineRef}
                  listening={Stage2ShapeColor === true ? false : true}
                />
              ))}
            <DrawSingleComponent />
            <ShowSingleComonent />
          </Group>
        ))}
    </>
  );
};

export default ShowSingleRect;
