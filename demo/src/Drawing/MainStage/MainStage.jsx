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
    stageRef
  } = useContext(globalStore);
  
  return (
    <Stage
      ref={stageRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={onStageMouseDown}
      onMouseMove={onStageMouseMove}
      onMouseUp={onStageMouseOut}
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
