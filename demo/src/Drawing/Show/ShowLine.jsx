import React, { useContext, useEffect } from "react";
import { line } from "../../components/Schemas/Schemas";
import { Line } from "react-konva";
import { globalStore } from "../../StoreContext/StoreContext";

const ShowLine = () => {
  const { handleTransformetMouseDown, drawLine, setDrawLine } =
    useContext(globalStore);
  //getting the local storage line data
  // let localLine = localStorage.getItem("line");
  // let lineData;
  // lineData = JSON.parse(localLine);

  function handleDrag(e, id) {
    let x = e.target.x();
    let y = e.target.y();
    setDrawLine((prev) =>
      prev.map((l) => (l.id === id ? { ...l, x: x, y: y } : l))
    );
    //setting the updated line data to the local storage
    // localStorage.setItem("line", JSON.stringify(result));
  }

  // if (!localStorage.getItem("line")) {
  //   useEffect(() => {
  //     localStorage.setItem("line", JSON.stringify(line));
  //   }, []);
  // }

  function handleTranfomEnd(e, id, name) {
    let x = e.target.x();
    let y = e.target.y();
    let rotate = e.target.rotation();
    // let localData = JSON.parse(localStorage.getItem(name));
    // let res = localData
    // );
    setDrawLine((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, x: x, y: y, rotation: rotate } : d
      )
    );
    // localStorage.setItem(name, JSON.stringify(res));
  }

  return (
    <>
      {Array.isArray(drawLine) &&
        drawLine.map((l, idx) => (
          <Line
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
            onMouseDown={(e) => handleTransformetMouseDown(e, l.id, l.name)}
          />
        ))}
    </>
  );
};

export default ShowLine;
