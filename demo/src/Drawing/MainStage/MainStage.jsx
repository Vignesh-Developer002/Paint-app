import { Layer, Stage, Transformer, Group, Shape } from "react-konva";
import React, { useContext, useRef } from "react";
import ShowComponent from "./ShowComponent";
import { globalStore } from "../../StoreContext/StoreContext";
import DrawingComponent from "./DrawingComponent";
import SubStage from "./SubStage";
import ShapeComponent from "../../components/ShapeComponent/ShapeComponent.jsx";

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
    scale,
    shape,
    setShape,
  } = useContext(globalStore);

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
          x={offset.x}
          y={offset.y}
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
            // x={joystickBtnClick === false ? 0 : offset.x}
            // y={joystickBtnClick === false ? 0 : offset.y}
            >
              {shape.map((d, idx) => (
                <ShapeComponent
                  key={idx}
                  closed={true}
                  draggable={true}
                  shape={d}
                  id={d.id}
                  name={d.name}
                />
              ))}
              <ShowComponent />
              <DrawingComponent />
              <Transformer ref={transformerRef} resizeEnabled={false} />
            </Layer>
          )}
          {joystickBtnClick === true && (
            <Layer>
              {/* x={offset.x} y={offset.y} */}
              <Group>
                {shape.map((d, idx) => (
                  <ShapeComponent
                    key={idx}
                    closed={true}
                    draggable={true}
                    shape={d}
                    id={d.id}
                    name={d.name}
                  />
                ))}
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
