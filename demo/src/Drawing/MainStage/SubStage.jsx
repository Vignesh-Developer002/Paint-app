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
import ShowComponent from "./ShowComponent";
import DrawingComponent from "./DrawingComponent";

const SubStage = () => {
  const {
    setDrawPolygon,
    stageRef,
    stageVisible,
    setStageVisible,
    onStageMouseDown,
    onStageMouseMove,
    onStageMouseOut,
    transformUnSelect,
    handleCircleWheel,
    transformerRef,
    drawing,
    drawCircle,
    drawScribble,
    drawLine,
    drawPolygon,
    drawText,
    setDrawCircle,
    handleTransformetMouseDown,
    handleRectDrag,
    setDrawing,
    showSingleRect,
    setDrawLine,
  } = useContext(globalStore);

  let rectArr = [...showSingleRect];
  let stageHeight = window.innerHeight;
  let stageWidth = window.innerWidth;
  let width, height;
  let res = showSingleRect.map((d) => {
    if (d.width > 0 && d.height > 0) {
      height = d.height;
      width = d.width;
    }
  });

  //--------circle-start----------------------------------------------------
  function handleDragEnd(e, id) {
    let x = e.target.x();
    let y = e.target.y();
    setDrawCircle((prev) =>
      prev.map((d) => (d.id === id ? { ...d, x: x, y: y } : d))
    );
  }

  //function for handle the transform end
  function handleTransformEnd(e, id, name) {
    let x = e.target.x();
    let y = e.target.y();
    let rotate = e.target.rotation();
    setDrawCircle((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, x: x, y: y, rotation: rotate } : d
      )
    );
  }
  //--------circle-end---------------------------------------------------------

  //----------------Rectangle-start------------------------------------------

  // function handleRectDrag(e, id) {
  //   let x = e.target.x();
  //   let y = e.target.y();
  //   setDrawing((prev) =>
  //     prev.map((r) => (r.id === id ? { ...r, x: x, y: y } : r))
  //   );
  // }

  //function for tranformend
  function handleTransformEnd(e, id, name) {
    let x = e.target.x();
    let y = e.target.y();
    let rotate = e.target.rotation();
    setDrawing((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, x: x, y: y, rotation: rotate } : d
      )
    );
  }

  //----------------Rectangle-end------------------------------------------

  //---------------polygon --------------------------------------
  //function for handletransformEnd i.e) rotation
  function handletransformEnd(e, id) {
    let x = e.target.x();
    let y = e.target.y();
    let rotate = e.target.rotation();
    setDrawPolygon((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, x: x, y: y, rotation: rotate } : d
      )
    );
  }

  // ---------------------polygon-end-------------------------------

  //-------------------line-start--------------------------
  function handleDrag(e, id) {
    let x = e.target.x();
    let y = e.target.y();
    setDrawLine((prev) =>
      prev.map((l) => (l.id === id ? { ...l, x: x, y: y } : l))
    );
  }

  function handleTranfomEnd(e, id, name) {
    let x = e.target.x();
    let y = e.target.y();
    let rotate = e.target.rotation();
    setDrawLine((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, x: x, y: y, rotation: rotate } : d
      )
    );
  }

  //-------------------line-end------------------

  return (
    <>
      {stageVisible && (
        <Stage
          ref={stageRef}
          width={stageWidth}
          height={stageHeight}
          onMouseDown={onStageMouseDown}
          onMouseMove={onStageMouseMove}
          onMouseUp={onStageMouseOut}
          onClick={(e) => transformUnSelect(e)}
          onWheel={(e) => handleCircleWheel(e)}
        >
          <Layer>
            <Group>
              <Rect
                height={height}
                width={width}
                x={stageWidth / 2 - width / 2}
                y={stageHeight / 2 - height / 2}
                fill="grey"
                listening={false}
              />

              {drawCircle.map((d, idx) => (
                <Circle
                  key={idx}
                  id={d.id}
                  x={d.x}
                  y={d.y}
                  name={d.name}
                  radius={d.radius}
                  fill={d.fill}
                  stroke={d.stroke}
                  strokeWidth={d.strokeWidth}
                  onDragEnd={(e) => handleDragEnd(e, d.id)}
                  onTransformEnd={(e) => handleTransformEnd(e, d.id, d.name)}
                  draggable={true}
                  rotation={d.rotation || 0}
                  onMouseDown={(e) =>
                    handleTransformetMouseDown(e, d.id, d.name)
                  }
                />
              ))}

              {drawing.map((d, idx) => (
                <Rect
                  key={idx}
                  x={d.x}
                  y={d.y}
                  width={d.width}
                  height={d.height}
                  fill={d.fill}
                  name={d.name}
                  stroke={d.stroke}
                  strokeWidth={d.strokeWidth}
                  draggable={true}
                  rotation={d.rotation || 0}
                  onDragEnd={(e) => handleRectDrag(e, d.id)}
                  onMouseDown={(e) =>
                    handleTransformetMouseDown(e, d.id, d.name)
                  }
                  onTransformEnd={(e) => handleTransformEnd(e, d.id, d.name)}
                />
              ))}

              {drawPolygon.map((d, idx) => (
                <Line
                  key={idx}
                  id={d.id}
                  points={d.points}
                  fill={d.fill}
                  name={d.name}
                  stroke={d.stroke}
                  strokeWidth={d.strokeWidth}
                  closed={d.closed}
                  draggable={true}
                  rotation={d.rotation || 0}
                  onDragEnd={(e) => handlePolygonDrag(e, d.id)}
                  onTransformEnd={(e) => handletransformEnd(e, d.id, d.name)}
                  onMouseDown={(e) =>
                    handleTransformetMouseDown(e, d.id, d.name)
                  }
                />
              ))}

              {drawLine.map((d, idx) => (
                <Line
                  key={idx}
                  name={d.name}
                  rotation={d.rotation}
                  points={d.points}
                  stroke={d.stroke}
                  strokeWidth={d.strokeWidth}
                  lineJoin={d.lineJoin}
                  draggable={true}
                  onDragEnd={(e) => handleDrag(e, d.id)}
                  onTransformEnd={(e) => handleTranfomEnd(e, d.id, d.name)}
                  onMouseDown={(e) =>
                    handleTransformetMouseDown(e, d.id, d.name)
                  }
                />
              ))}
            </Group>
            <DrawingComponent />
            <Transformer ref={transformerRef} resizeEnabled={false} />
          </Layer>
        </Stage>
      )}
    </>
  );
};

export default SubStage;
