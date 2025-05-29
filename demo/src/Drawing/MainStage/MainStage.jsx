import { Layer, Stage, Transformer, Group } from "react-konva";
import React, { useContext, useRef } from "react";
import ShowComponent from "./ShowComponent";
import { globalStore } from "../../StoreContext/StoreContext";
import DrawingComponent from "./DrawingComponent";
import SubStage from "./SubStage";

const MainStage = () => {
  const {
    transformerRef,
    onStageMouseDown,
    onStageMouseMove,
    onStageMouseOut,
    stageRef,
    draggable,
    mouseDown,
    btn,
    transformUnSelect,
    handleCircleWheel,
    stageVisible,
    position,
    joystickBtnClick,
    setJoystickBtnClick,
    offset,
    setOffset,
  } = useContext(globalStore);

  console.log("joystickBtnClick", joystickBtnClick);

  let stage = document.getElementById("stageClass");
  if (stage) {
    if (btn === "grab") {
      stage.style.cursor = "grab";
    }
    if (mouseDown) {
      stage.style.cursor = "grabbing";
    }
    if (btn === "default") {
      stage.style.cursor = "default";
    }
  }

  return (
    <>
      {stageVisible === false ? (
        <Stage
          id="stageClass"
          ref={stageRef}
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={onStageMouseDown}
          onMouseMove={onStageMouseMove}
          onMouseUp={onStageMouseOut}
          onClick={(e) => transformUnSelect(e)}
          draggable={draggable || joystickBtnClick === true}
          onWheel={(e) => handleCircleWheel(e)}
        >
          {joystickBtnClick === false && (
            <Layer
              x={joystickBtnClick === false ? 0 : offset.x}
              y={joystickBtnClick === false ? 0 : offset.y}
            >
              <ShowComponent />
              <DrawingComponent />
              <Transformer ref={transformerRef} resizeEnabled={false} />
            </Layer>
          )}
          {joystickBtnClick === true && (
            <Layer>
              <Group x={offset.x} y={offset.y}>
                <ShowComponent />
                <DrawingComponent />
                <Transformer ref={transformerRef} resizeEnabled={false} />
              </Group>
            </Layer>
          )}
        </Stage>
      ) : (
        <SubStage />
      )}
    </>
  );
};

export default MainStage;
