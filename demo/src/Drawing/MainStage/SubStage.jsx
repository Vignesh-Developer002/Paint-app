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

const SubStage = () => {
  const {
    setDrawPolygon,
    stageRef,
    stageVisible,
    onStageMouseDown,
    onStageMouseMove,
    onStageMouseOut,
    transformUnSelect,
    handleCircleWheel,
    transformerRef,
    drawing,
    drawCircle,
    drawLine,
    drawPolygon,
    setDrawCircle,
    handleTransformetMouseDown,
    setDrawing,
    showSingleRect,
    setDrawLine,
    idName,
    btnEnablen,
    setBtnEnable,
  } = useContext(globalStore);

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

  //--------circle-start--------------------------------------
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
  //--------circle-end-----------------------------------------

  //----------------Rectangle-start----------------------------

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

  function handleRectDrag(e, id) {
    let x = e.target.x();
    let y = e.target.y();
    setDrawing((prev) =>
      prev.map((r) => (r.id === id ? { ...r, x: x, y: y } : r))
    );
  }

  //----------------Rectangle-end--------------------------

  //---------------polygon --------------------------------
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

  function handlePolygonDrag(e, id) {
    let x = e.target.x();
    let y = e.target.y();
    setDrawPolygon((prev) =>
      prev.map((p) => (p.id === id ? { ...p, x: x, y: y } : p))
    );
  }

  // ---------------------polygon-end---------------------

  //-------------------line-start-------------------------
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
  //-------------------line-end---------------------------
 console.log(btnEnablen, "btnEnable");
  return (
    <>
      {stageVisible && (
        <Stage
          style={{ backgroundColor: "grey" }}
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
              <Rect height={height} width={width} x={x} y={y} fill="white" />
              {drawCircle.map((d, idx) => (
                <Circle
                  key={idx}
                  id={d.id}
                  x={d.x}
                  y={d.y}
                  name={d.name}
                  radius={d.radius}
                  fill="grey"
                  stroke="black"
                  strokeWidth={d.strokeWidth}
                  onDragEnd={(e) => handleDragEnd(e, d.id)}
                  onTransformEnd={(e) => handleTransformEnd(e, d.id, d.name)}
                  draggable={btnEnablen}
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
                  fill="grey"
                  name={d.name}
                  stroke="black"
                  strokeWidth={d.strokeWidth}
                  draggable={btnEnablen}
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
                  fill="grey"
                  name={d.name}
                  stroke="black"
                  strokeWidth={d.strokeWidth}
                  closed={d.closed}
                  draggable={btnEnablen}
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
                  stroke="black"
                  strokeWidth={d.strokeWidth}
                  lineJoin={d.lineJoin}
                  draggable={btnEnablen}
                  onDragEnd={(e) => handleDrag(e, d.id)}
                  onTransformEnd={(e) => handleTranfomEnd(e, d.id, d.name)}
                  onMouseDown={(e) =>
                    handleTransformetMouseDown(e, d.id, d.name)
                  }
                />
              ))}
              <DrawingComponent />
            </Group>
            <Transformer ref={transformerRef} resizeEnabled={false} />
          </Layer>
        </Stage>
      )}
    </>
  );
};

export default SubStage;
