import React, { useContext, useState } from "react";
import { Stage, Layer, Circle } from "react-konva";
import { globalStore } from "../../StoreContext/StoreContext";

const Joystick2 = () => {
  const {
    position,
    setPosition,
    size,
    center,
    joystickBtnClick,
    setJoystickBtnClick,
    offset,
    setOffset,
  } = useContext(globalStore);

  const [angel, setAngle] = useState("");
  // const size = 200;
  // const radius = 50; // max movement radius for knob
  // const center = size / 2;
  const radius = 50; // max movement radius for knob
  // const [position, setPosition] = useState({ x: center, y: center });

  const handleDragMove = (e) => {
    const { x, y } = e.target.position();
    console.log("x", x, "y", y);
    const dx = x - center;
    const dy = y - center;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // up-270
    // down-90
    // left-180
    // right-0
    if (y <= 97) {
      // up direction
      moveStage(90); // default-down-90(as per seats.io we set it in opposit direction that is down)
    }
    if (y >= 103) {
      // down-90
      moveStage(270); // default- up-270 (as per seats.io we set it in opposite direction that is up)
    }
    if (x <= 97) {
      // left side
      moveStage(0); // default -right-0 (as per seats.io we set it in opposit dirction that is right)
    }
    if (x >= 103) {
      // right

      moveStage(180); // default -left -180(as per seats.io we set it in opposite direction that is left)
    }

    if (distance > radius) {
      const angle = Math.atan2(dy, dx);
      const newX = center + radius * Math.cos(angle);
      const newY = center + radius * Math.sin(angle);
      e.target.position({ x: newX, y: newY });
    }
    setPosition(e.target.position());
  };

  //joystick center button logic
  const handleDragEnd = () => {
    // Reset to center on release
    setPosition({ x: center, y: center });
  };

  function handleStageDrage2() {
    setJoystickBtnClick(true);
  }

  function handleJoystickReset() {
    setJoystickBtnClick(false);
  }

  //-----------------------------------------------
  function moveByAngle(angleDeg, distance) {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      dx: Math.cos(rad) * distance,
      dy: Math.sin(rad) * distance,
    };
  }

  const moveStage = (angleDeg, distance = 10) => {
    const { dx, dy } = moveByAngle(angleDeg, distance);
    setOffset((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));
  };

  // console.log("angle", Number(angel) * (180 / Math.PI));
  return (
      <Stage width={size} height={size}>
        <Layer>
          {/* Joystick base */}
          <Circle
            x={center}
            y={center}
            radius={radius + 20}
            fill="#ddd"
            stroke="lightGrey"
            strokeWidth={2}
          />

          {/* Draggable knob */}
          <Circle
            x={position.x}
            y={position.y}
            radius={20}
            fill="#555"
            draggable
            onMouseDown={() => {
              handleStageDrage2();
            }}
            onMouseUp={ handleJoystickReset}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
          />
        </Layer>
      </Stage>
  );
};

export default Joystick2;
