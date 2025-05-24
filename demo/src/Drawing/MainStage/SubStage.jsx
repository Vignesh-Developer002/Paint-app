import React, { useContext, useEffect, useState } from "react";
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

  const [rotation, setRotation] = useState(0);
  const [drag, setDrag] = useState({
    x: 0,
    y: 0,
  });

  let rectArr = [...showSingleRect];
  let stageHeight = window.innerHeight;
  let stageWidth = window.innerWidth;
  let width, height, x, y;
  let res = showSingleRect.map((d) => {
    if (d.width > 0 && d.height > 0) {
      height = d.height;
      width = d.width;
      x = d.x;
      y = d.y;
    }
  });

  function onStageMouseDown(e) {
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
      const stage = e.target.getStage();
      const pointer = stage.getPointerPosition();
      let x = pointer.x;
      let y = pointer.y;
      setObLine({
        id: uuidv4(),
        x: 1,
        y: 1,
        name: btnName,
        points: [x, y, x, y],
        stroke: Stage2ShapeColor === false ? "Black" : "",
        strokeWidth: 2,
        lineJoin: "round",
        rotation: 0,
      });
    }
  }

  function onStageMouseMove(e) {
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
      const stage = e.target.getStage();
      const pointer = stage.getPointerPosition();
      let x = pointer.x;
      let y = pointer.y;

      setObLine((p) => ({
        ...p,
        points: [p?.points?.[0] || 0, p?.points?.[1] || 0, x, y],
      }));
    }
  }

  function onStageMouseOut(e) {
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

  // function for handle the transform end
  function handleTransformEnd(e, id, name) {
    let rotate = e.target.rotation();
    localStorage.setItem("rotation", JSON.stringify(rotate));
    setRotation(rotate);
  }

  // function for handle the drag
  function handleRectDrag(e, id) {
    let x = e.target.x();
    let y = e.target.y();
    setDrag((prev) => ({ ...prev, x: x, y: y }));
    localStorage.setItem("dragxy", JSON.stringify({ x: x, y: y }));
  }

  useEffect(() => {
    if (localStorage.getItem("rotation")) {
      let res = JSON.parse(localStorage.getItem("rotation"));
      setRotation(res);
    }
  }, [rotation]);

  useEffect(() => {
    if (localStorage.getItem("dragxy")) {
      let res2 = JSON.parse(localStorage.getItem("dragxy"));
      setDrag({ x: res2?.x, y: res2?.y });
    }
  }, [drag]);

  console.log("btnName", btnName);
  return (
    <>
      {stageVisible && (
        <Stage
          style={{ backgroundColor: "grey" }}
          ref={stageRef}
          width={stageWidth}
          height={stageHeight}
          onMouseDown={(e) => onStageMouseDown(e)}
          onMouseMove={(e) => onStageMouseMove(e)}
          onMouseUp={(e) => onStageMouseOut(e)}
          onClick={(e) => transformUnSelect(e)}
          onWheel={(e) => handleCircleWheel(e)}
        >
          <Layer>
            <Group>
              <Rect
                id={uuidv4()}
                height={height}
                width={width}
                x={x ? x : drag?.x ? drag?.x : x}
                y={y ? y : drag?.y ? drag?.y : y}
                name="rectangle"
                fill="white"
                stroke={"skyblue"}
                strokeWidth={4}
                // draggable={
                //   btnName === "circle" ||
                //   btnName === "rectangle" ||
                //   btnName === "line" ||
                //   btnName === "polygon"
                //     ? false
                //     : true
                // }
                // rotation={rotation}
                // onMouseDown={(e) => handleTransformetMouseDown(e)}
                // onTransformEnd={(e) => handleTransformEnd(e)}
                // onDragEnd={(e) => handleRectDrag(e)}
              />
              <DrawSingleComponent />
              <ShowSingleComonent />
              <Transformer ref={transformerRef} resizeEnabled={false} />
            </Group>
          </Layer>
        </Stage>
      )}
    </>
  );
};

export default SubStage;
