import React, { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import assets from "../../assets/assets.js";
import "./preview.css";
import { useContext } from "react";
import { globalStore } from "../../StoreContext/StoreContext.jsx";
import { Stage, Layer, Rect, Circle } from "react-konva";

const Preview = () => {
  const { previewImage, btnName, drawCircle } = useContext(globalStore);
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

  return (
    <div className="preview-container">
      <div className="preview-head">
        <ImCancelCircle
          className="prev-cancel"
          onClick={() => setPreview(false)}
        />
        <p className="prev-title">Preview</p>
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
            <Stage  scaleX={0.5} scaleY={0.5} width={500} height={475} >
              <Layer>
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
              </Layer>
            </Stage>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview;
