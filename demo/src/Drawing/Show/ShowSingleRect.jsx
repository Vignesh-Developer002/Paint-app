import React, { useContext, useEffect, useRef, useState } from "react";
import { Group, Rect, Circle, Line, Transformer } from "react-konva";
import { globalStore } from "../../StoreContext/StoreContext";
import DrawSingleComponent from "../MainStage/DrawSingleComponent";
import ShowSingleComonent from "../MainStage/ShowSingleComonent";

const ShowSingleRect = () => {
  const {
    showSingleRect,
    handleStageVisble,
    groupRef,
    handleTransformetMouseDown,
    setShowSingleRect,
    btnName,
  } = useContext(globalStore);

  const [drag, setDrag] = useState(false);

  function handleSingleRectDrag(e, id) {
    console.log("drag happens");
    setDrag(true);
    let x = e.target.x();
    let y = e.target.y();
    setShowSingleRect((prev) =>
      prev.map((r) => (r.id === id ? { ...r, x: x, y: y } : r))
    );
  }

  console.log("dddgdg", showSingleRect);

  //----------------------------   outside single rectangle -----------------------------

  return (
    <>
      {Array.isArray(showSingleRect) &&
        showSingleRect.map((d) => (
          <Group
            ref={groupRef}
            key={d.id}
            onDblClick={(e) => handleStageVisble(e)}
            onMouseDown={(e) => handleTransformetMouseDown(e, d.id, d.name)}
            draggable={btnName === "select"}
            onDragEnd={(e) => handleSingleRectDrag(e, d.id)}
            x={d?.x || 0}
            y={d?.y || 0}
          >
            <Rect
              key={d?.id}
              width={d?.width || 0}
              height={d?.height || 0}
              fill={"lightGrey"}
              stroke={"black"}
              strokeWidth={d?.strokeWidth || 4}
              rotation={d?.rotation || 0}
            />
            <DrawSingleComponent />
            <ShowSingleComonent />
          </Group>
        ))}
    </>
  );
};

export default ShowSingleRect;
