import { Layer, Stage, Transformer } from "react-konva";
import React, { useContext, useRef } from "react";
import ShowComponent from "./ShowComponent";
import { globalStore } from "../../StoreContext/StoreContext";
import DrawingComponent from "./DrawingComponent";

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
  } = useContext(globalStore);

  let stage = document.getElementById("stageClass");
  if (stage) {
    if (btn === "grab") {
      stage.style.cursor = "grab";
    } else if (mouseDown) {
      stage.style.cursor = "grabbing";
    } else {
      stage.style.cursor = "default";
    }
  }
  return (
    <Stage
      id="stageClass"
      ref={stageRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={onStageMouseDown}
      onMouseMove={onStageMouseMove}
      onMouseUp={onStageMouseOut}
      onClick={(e) =>
        e.target === stageRef.current ? transformerRef.current.nodes([]) : <></>
      }
      draggable={draggable}
    >
      <Layer>
        {/* parent show component  array*/}
        <ShowComponent />
        {/*parent drawing component object */}
        <DrawingComponent />
        <Transformer ref={transformerRef} resizeEnabled={false} />
      </Layer>
    </Stage>
  );
};

export default MainStage;
