import React, { useContext, useEffect } from "react";
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
import DrawingComponent from "./DrawingComponent";
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
    showObRect,
    setShowObRect,
    stageRef,
    obCir,
    setObCir,
    showObCircle,
    setShowObCirlce,
  } = useContext(globalStore);

  console.log("circle array", showObCircle);
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
        fill: "lightGrey",
        stroke: "black",
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
        fill: "lightGrey",
        stroke: "black",
        strokeWidth: 1,
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
    }
  }

  function onStageMouseOut(e) {
    if (btnName === "rectangle") {
      setShowObRect((p) => [...p, obRect]);
      setObRect({});
    } else if (btnName === "circle") {
      setShowObCirlce((d) => [...d, obCir]);
      setObCir({});
    }
  }
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
                x={x}
                y={y}
                fill="white"
                stroke={"skyblue"}
                strokeWidth={4}
              />

              <DrawSingleComponent />
              <ShowSingleComonent />
            </Group>
            <Transformer ref={transformerRef} resizeEnabled={false} />
          </Layer>
        </Stage>
      )}
    </>
  );
};

export default SubStage;
