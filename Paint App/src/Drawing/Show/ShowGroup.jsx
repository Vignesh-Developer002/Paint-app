import React, { useContext } from "react";
import { globalStore } from "../../StoreContext/StoreContext";
import { Group, Rect, Line, Circle } from "react-konva";

const ShowGroup = () => {
  const { ShowGroup, handleTransformetMouseDown, shapes } =
    useContext(globalStore);
  let res = shapes.filter((d) => d.name === "group");

  return (
    <>
      {Array.isArray(res) &&
        res.map((d) => (
          <Group
            x={0}
            y={0}
            rotation={0}
            draggable={true}
            onMouseDown={(e) => handleTransformetMouseDown(e, d.id, d.name)}
          >
            <Rect
              x={d.x}
              y={d.y}
              id={d.id}
              name={d.name}
              fill={d.fill}
              height={d.height}
              width={d.width}
              strokeWidth={d.strokeWidth}
              stroke={d.stroke}
            />
            <Line
              points={[d.x, d.y, d.x + d.width, d.y + d.height]}
              stroke={d.stroke || "F2F2F2"}
              strokeWidth={d.strokeWidth || 2}
            />
            <Line
              points={[d.x + d.width, d.y, d.x, d.y + d.height]}
              stroke={d.stroke || "F2F2F2"}
              strokeWidth={d.strokeWidth || 2}
            />
            <Circle
              x={d.x + d.width / 2}
              y={d.y + d.height / 2}
              radius={15}
              fill={d.fill || "white"}
              stroke={d.stroke || "F2F2F2"}
            />
          </Group>
        ))}
    </>
  );
};

export default ShowGroup;
