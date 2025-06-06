import React, { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import assets from "../../assets/assets.js";
import "./preview.css";
import { useContext } from "react";
import { globalStore } from "../../StoreContext/StoreContext.jsx";
import { Stage, Layer, Rect, Circle, Line } from "react-konva";

const Preview = () => {
  const {
    btnName,
    drawCircle,
    drawing,
    drawPolygon,
    drawScribble,
    drawLine,
    darkMode,
    handleCircleWheel,
    stageRef,
  } = useContext(globalStore);
  const [preTime, setPreTime] = useState(false);
  const { setPreview, preview } = useContext(globalStore);

  useEffect(() => {
    setTimeout(() => {
      setPreTime(true);
    });
  }, [preview === false]);

  useEffect(() => {
    setTimeout(() => {
      setPreTime(false);
    }, 1000);
  }, [preTime === true]);

  // function for set the dark mode to
  return (
    <div
      className="preview-container"
      style={{ backgroundColor: darkMode ? "#1c1c1c" : "#ebebeb" }}
    >
      <div className="preview-head">
        <ImCancelCircle
          className="prev-cancel"
          onClick={() => setPreview(false)}
        />
        <p
          className="prev-title"
          style={{ color: darkMode ? "#797979" : "black" }}
        >
          Preview
        </p>
      </div>
      <div className="img-content">
        {preTime === true && (
          <div className="animated-circle">
            <div className="circle">
              <div className="circle-2">
                <div className="circle-3"></div>
              </div>
            </div>
          </div>
        )}
        {preTime === false && (
          <div className="pre-img">
            {/* style={{ border: "1px solid" }} */}
            <Stage
              ref={stageRef}
              scaleX={0.5}
              scaleY={0.5}
              width={500}
              height={475}
              onWheel={(e) => handleCircleWheel(e)}
            >
              <Layer>
                {/* Circle */}
                {Array.isArray(drawCircle) &&
                  drawCircle.map((c, idx) => (
                    <Circle
                      key={idx}
                      id={c.id}
                      x={c.x}
                      y={c.y}
                      name={c.name}
                      radius={c.radius}
                      fill={c.fill}
                      stroke={c.stroke}
                      strokeWidth={c.strokeWidth}
                      onDragEnd={(e) => handleDragEnd(e, c.id)}
                      onTransformEnd={(e) =>
                        handleTransformEnd(e, c.id, c.name)
                      }
                      draggable={btnName === "select" ? true : false}
                      rotation={c.rotation || 0}
                      onMouseDown={(e) =>
                        handleTransformetMouseDown(e, c.id, c.name)
                      }
                    />
                  ))}

                {/* Rectangle */}
                {Array.isArray(drawing) &&
                  drawing.map((r, idx) => {
                    return (
                      <Rect
                        key={idx}
                        x={r.x}
                        y={r.y}
                        width={r.width}
                        height={r.height}
                        fill={r.fill}
                        stroke={r.stroke}
                        name={r.name}
                        strokeWidth={r.strokeWidth}
                        draggable={btnName === "select" ? true : false}
                        rotation={r.rotation || 0}
                        onDragEnd={(e) => handleRectDrag(e, r.id)}
                        onMouseDown={(e) =>
                          handleTransformetMouseDown(e, r.id, r.name)
                        }
                        onTransformEnd={(e) =>
                          handleTransformEnd(e, r.id, r.name)
                        }
                      />
                    );
                  })}
                {/* Polygon */}
                {Array.isArray(drawPolygon) &&
                  drawPolygon.map((p, idx) => (
                    <Line
                      x={p?.x}
                      y={p?.y}
                      key={idx}
                      id={p.id}
                      points={p.points}
                      fill={p.fill}
                      name={p.name}
                      stroke={p.stroke}
                      strokeWidth={p.strokeWidth}
                      closed={p.closed}
                      draggable={btnName === "select" ? true : false}
                      rotation={p.rotation}
                      onDragEnd={(e) => handlePolygonDrag(e, p.id)}
                      onTransformEnd={(e) =>
                        handletransformEnd(e, p.id, p.name)
                      }
                      onMouseDown={(e) =>
                        handleTransformetMouseDown(e, p.id, p.name)
                      }
                    />
                  ))}

                {/* Scribble */}
                {Array.isArray(drawScribble) &&
                  drawScribble.map((d, idx) => (
                    <Line
                      x={d?.x}
                      y={d?.y}
                      key={idx}
                      points={d.points}
                      stroke={d.stroke}
                      strokeWidth={d.strokeWidth}
                      lineCap={d.lineCap}
                      lineJoin={d.lineJoin}
                      draggable={btnName === "select" ? true : false}
                      onDragEnd={(e) => handleRectDrag(e, d.id)}
                      onMouseDown={(e) =>
                        handleTransformetMouseDown(e, d.id, d.name)
                      }
                      onTransformEnd={(e) =>
                        handleTransformEnd(e, d.id, d.name)
                      }
                    />
                  ))}

                {/*Line */}
                {Array.isArray(drawLine) &&
                  drawLine.map((l, idx) => (
                    <Line
                      x={l?.x}
                      y={l?.y}
                      key={idx}
                      name={l.name}
                      rotation={l.rotation}
                      points={l.points}
                      stroke={l.stroke}
                      strokeWidth={l.strokeWidth}
                      lineJoin={l.lineJoin}
                      draggable={true}
                      onDragEnd={(e) => handleDrag(e, l.id)}
                      onTransformEnd={(e) => handleTranfomEnd(e, l.id, l.name)}
                      onMouseDown={(e) =>
                        handleTransformetMouseDown(e, l.id, l.name)
                      }
                    />
                  ))}
              </Layer>
            </Stage>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview;
