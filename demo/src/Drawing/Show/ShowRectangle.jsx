import React, { useContext, useEffect } from "react";
import { Rect } from "react-konva";
import { rectangle } from "../../components/Schemas/Schemas";
import { globalStore } from "../../StoreContext/StoreContext";

const ShowRectangle = () => {
  const { handleTransformetMouseDown, drawing, setDrawing } =
    useContext(globalStore);
  //getting the local storage rectangle data
  // let localData = localStorage.getItem("Rectangle");
  // let res;
  // let op;
  // res = JSON.parse(localData);

  function handleRectDrag(e, id) {
    let x = e.target.x();
    let y = e.target.y();
    // op = res.map();
    setDrawing((prev) =>
      prev.map((r) => (r.id === id ? { ...r, x: x, y: y } : r))
    );
    //setting the updated rectangle data to the local storage
    // localStorage.setItem("Rectangle", JSON.stringify(op));
  }

  //setting the rectangle data to the initial stage to local storage
  // if (!localStorage.getItem("Rectangle")) {
  //   useEffect(() => {
  //     localStorage.setItem("Rectangle", JSON.stringify(rectangle));
  //   }, []);
  // }

  //function for tranformend
  function handleTransformEnd(e, id, name) {
    let x = e.target.x();
    let y = e.target.y();
    let rotate = e.target.rotation();
    // let localData = JSON.parse(localStorage.getItem(name));
    // let res = localData
    // );
    setDrawing((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, x: x, y: y, rotation: rotate } : d
      )
    );
    // localStorage.setItem(name, JSON.stringify(res));
  }
  return (
    <>
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
              name={r.name}
              stroke={r.stroke}
              strokeWidth={r.strokeWidth}
              draggable={true}
              rotation={r.rotation || 0}
              onDragEnd={(e) => handleRectDrag(e, r.id)}
              onMouseDown={(e) => handleTransformetMouseDown(e, r.id, r.name)}
              onTransformEnd={(e) => handleTransformEnd(e, r.id, r.name)}
            />
          );
        })}
    </>
  );
};

export default ShowRectangle;
