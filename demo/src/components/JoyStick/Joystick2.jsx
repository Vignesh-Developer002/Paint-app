import React, { useContext, useState } from "react";
import { Stage, Layer, Circle, Image as KonvaImage } from "react-konva";
import { globalStore } from "../../StoreContext/StoreContext";
import useImage from "use-image";
// import assets from "../../assets/assets";

// const [DownArrow] = useImage();
// const [LeftArrow] = useImage();
// const [rightArrow] = useImage();
const Joystick2 = () => {
  const [upArrow] = useImage("/arrows/up.svg");
  const [downArrow] = useImage("/arrows/down.svg");
  const [leftArrow] = useImage("/arrows/left.svg");
  const [rightArrow] = useImage("/arrows/right.svg");

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
  const radius = 40; // max movement radius for knob
  // const [position, setPosition] = useState({ x: center, y: center });

  const handleDragMove = (e) => {
    const { x, y } = e.target.position();
    // console.log("x", x, "y", y);
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

  //---------------------------------------------
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

  // function for handleColor()
  function handleColor(e) {
    let direction = e.target?.attrs?.id;
    console.log(direction);
    setJoystickBtnClick(true);
    if (direction === "up") {
      moveStage(90);
    } else if (direction === "down") {
      moveStage(270);
    } else if (direction === "left") {
      moveStage(0);
    } else if (direction === "right") {
      moveStage(180);
    }
  }

  console.log("joystick", joystickBtnClick);
  return (
    <Stage width={200} height={200}>
      <Layer>
        {/* Joystick base */}
        <Circle
          x={center}
          y={center}
          radius={radius}
          fill="#ddd"
          stroke="lightGrey"
          strokeWidth={2}
        />
        <KonvaImage
          // stroke={"red"}
          id="up"
          onMouseDown={(e) => handleColor(e)}
          image={upArrow}
          x={center - 9}
          y={center - radius - 0}
          width={18}
          height={18}
        />
        <KonvaImage
          id="down"
          onMouseDown={(e) => handleColor(e)}
          image={downArrow}
          x={center - 9}
          y={center + radius - 18}
          width={18}
          height={18}
        />
        <KonvaImage
          id="left"
          onMouseDown={(e) => handleColor(e)}
          image={leftArrow}
          x={center - radius - 1}
          y={center - 8}
          width={18}
          height={18}
        />
        <KonvaImage
          id="right"
          onMouseDown={(e) => handleColor(e)}
          image={rightArrow}
          x={center + radius - 17}
          y={center - 9}
          width={18}
          height={18}
        />

        {/* Draggable knob */}
        <Circle
          x={position.x}
          y={position.y}
          radius={15}
          fill="#555"
          draggable
          onMouseDown={() => {
            handleStageDrage2();
          }}
          onMouseUp={handleJoystickReset}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
        />
      </Layer>
    </Stage>
  );
};

export default Joystick2;
