import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Stage,
  Layer,
  Rect,
  Transformer,
  Group,
  Circle,
  Line,
} from "react-konva";
import { globalStore } from "../../StoreContext/StoreContext";
import { v4 as uuidv4 } from "uuid";
import DrawSingleComponent from "./DrawSingleComponent";
import ShowSingleComonent from "./ShowSingleComonent";

const SubStage = () => {
  const {
    stageVisible,
    btnName,
    transformUnSelect,
    handleCircleWheel,
    transformerRef,
    showSingleRect,
    singleRectRef,
    obRect,
    setObRect,
    setShowObRect,
    stageRef,
    obCir,
    setObCir,
    setShowObCirlce,
    PolyStage2Complete,
    obPoly,
    setObPoly,
    setStage2Points,
    obLine,
    setObLine,
    setShowObLine,
    Stage2ShapeColor,
    handleTransformetMouseDown,
    sideBar,
  } = useContext(globalStore);
  const groupRef = useRef(null);

  function onStage2MouseDown(e) {
    singleRectRef.current = true;
    if (btnName === "rectangle") {
      let pos = e.target.getStage().getRelativePointerPosition();
      let x = pos.x;
      let y = pos.y;
      setObRect({
        id: uuidv4(),
        x: x,
        y: y,
        width: 0,
        height: 0,
        fill: Stage2ShapeColor === false ? "lightGrey" : "",
        stroke: Stage2ShapeColor === false ? "black" : "lightGrey",
        name: btnName,
        strokeWidth: 1,
      });
    } else if (btnName === "circle") {
      let pos = e.target.getStage().getRelativePointerPosition();
      let x = pos.x;
      let y = pos.y;
      setObCir({
        id: uuidv4(),
        x: x,
        y: y,
        name: btnName,
        radius: 1,
        fill: Stage2ShapeColor === false ? "lightGrey" : "",
        stroke: Stage2ShapeColor === false ? "black" : "lightGrey",
        strokeWidth: 1,
        rotation: 0,
      });
    } else if (btnName === "polygon") {
      if (!PolyStage2Complete) {
        let pos = e.target.getStage().getRelativePointerPosition();
        let x = pos.x;
        let y = pos.y;
        setObPoly((prev) => ({
          ...prev,
          name: btnName,
          id: uuidv4(),
          points: Array.isArray(prev?.points) ? [...prev.points, x, y] : [x, y],
          fill: Stage2ShapeColor === false ? "lightGrey" : "",
          stroke: Stage2ShapeColor === false ? "black" : "lightGrey",
          strokeWidth: 1,
          closed: obPoly?.closed || false,
          rotation: 0,
        }));
      }
    } else if (btnName === "line") {
      // const stage = e.target.getStage();
      const pointer = e.target.getStage().getRelativePointerPosition();
      let x = pointer.x;
      let y = pointer.y;
      setObLine({
        id: uuidv4(),
        x: 1,
        y: 1,
        name: btnName,
        points: [x, y, x, y],
        stroke: Stage2ShapeColor === false ? "Black" : "",
        strokeWidth: 3,
        lineJoin: "round",
        rotation: 0,
      });
    }
  }

  function onStage2MouseMove(e) {
    singleRectRef.current = true;
    if (btnName === "rectangle") {
      let pos = e.target.getStage().getRelativePointerPosition();
      let x = pos.x;
      let y = pos.y;
      setObRect((p) => ({
        ...p,
        width: x - p.x || 0,
        height: y - p.y || 0,
      }));
    } else if (btnName === "circle") {
      let pos = e.target.getStage().getRelativePointerPosition();
      let x = pos.x || 0;
      let y = pos.y || 0;
      setObCir((pre) => ({
        ...pre,
        radius: Math.pow(
          Math.pow(x - (pre.x || 0), 2) + Math.pow(y - (pre.y || 0), 2),
          0.5
        ),
      }));
    } else if (btnName === "polygon") {
      if (!PolyStage2Complete) {
        let pos = e.target.getStage().getRelativePointerPosition();
        let x = pos.x || 0;
        let y = pos.y || 0;
        setStage2Points({ x: x, y: y });
      }
    } else if (btnName === "line") {
      // const stage = e.target.getStage();
      const pointer = e.target.getStage().getRelativePointerPosition();
      let x = pointer.x;
      let y = pointer.y;

      setObLine((p) => ({
        ...p,
        points: [p?.points?.[0] || 0, p?.points?.[1] || 0, x, y],
      }));
    }
  }

  function onStage2MouseOut(e) {
    if (btnName === "rectangle") {
      setShowObRect((p) => [...p, obRect]);
      setObRect({});
    } else if (btnName === "circle") {
      setShowObCirlce((d) => [...d, obCir]);
      setObCir({});
    } else if (btnName === "line") {
      setShowObLine((p) => [...p, obLine]);
      setObLine({});
    }
  }
  // stageShapeColor - false
  return (
    <>
      {stageVisible && (
        <Stage
          style={{ backgroundColor: "grey" }}
          // ref={stageRef}
          width={window.innerWidth}
          height={window.innerHeight}
          onWheel={(e) => handleCircleWheel(e)}
          onMouseDown={(e) => onStage2MouseDown(e)}
          onMouseMove={(e) => onStage2MouseMove(e)}
          onMouseUp={(e) => onStage2MouseOut(e)}
          onClick={(e) => transformUnSelect(e)}
        >
          <Layer>
            {Array.isArray(showSingleRect) &&
              showSingleRect.map((d) => (
                <Group key={d.id}>
                  <Rect
                    key={d?.id}
                    x={d?.x || 0}
                    y={d?.y || 0}
                    width={d?.width || 0}
                    height={d?.height || 0}
                    fill={"white"}
                    stroke={"lightBlue"}
                    strokeWidth={4}
                    rotation={d?.rotation || 0}
                  />
                  <DrawSingleComponent />
                  <ShowSingleComonent />
                  <Transformer ref={transformerRef} resizeEnabled={false} />
                </Group>
              ))}
          </Layer>
        </Stage>
      )}
    </>
  );
};

export default SubStage;
