import React, { useContext } from "react";
import { globalStore } from "../../StoreContext/StoreContext";
import { Circle, Group, Line, Rect } from "react-konva";

const DrawGroup = () => {
  const { group } = useContext(globalStore);
  console.log("object group", group);
  return (
    <>
      {Object.values(group) && (
        <Group>
          <Rect
            x={group["x"]}
            y={group["y"]}
            id={group["id"]}
            name={group["name"]}
            fill={group["fill"]}
            height={group["height"]}
            width={group["width"]}
            strokeWidth={group["strokeWidth"]}
            stroke={group["stroke"]}
          />

          <Line
            points={[
              group["x"],
              group["y"],
              group["x"] + group["width"],
              group["y"] + group["height"],
            ]}
            stroke="black"
            strokeWidth={2}
          />

          <Line
            points={[
              group["x"] + group["width"],
              group["y"],
              group["x"],
              group["y"] + group["height"],
            ]}
            stroke="F2F2F2"
            strokeWidth={2}
          />

          <Circle
            x={group["x"] + group["width"] / 2}
            y={group["y"] + group["height"] / 2}
            radius={15}
            fill="white"
            stroke="F2F2F2"
          />
        </Group>
      )}
    </>
  );
};

export default DrawGroup;
