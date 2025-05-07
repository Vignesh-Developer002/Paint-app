import React, { useContext, useEffect } from "react";
import { polygon } from "../../components/Schemas/Schemas";
import { Line } from "react-konva";
import { globalStore } from "../../StoreContext/StoreContext";

const ShowPolygon = () => {
  const { handleTransformetMouseDown, drawPolygon,setDrawPolygon } = useContext(globalStore);
  //getting the local storage data
  // let res = JSON.parse(localStorage.getItem("polygon"))
  function handlePolygonDrag(e, id) {
    let x = e.target.x();
    let y = e.target.y();
    // let result = res.map((p) => (p.id === id ? { ...p, x: x, y: y } : p));
    setDrawPolygon((prev)=>(prev.map((p) => (p.id === id ? { ...p, x: x, y: y } : p))))
    // localStorage.setItem("polygon", JSON.stringify(result));
  }

  // if (!localStorage.getItem("polygon")) {
  //   useEffect(() => {
  //     localStorage.setItem("polygon", JSON.stringify(polygon));
  //   }, []);
  // }

  //function for handletransformEnd i.e) rotation
  function handletransformEnd(e, id, name) {
    let x = e.target.x();
    let y = e.target.y();
    let rotate = e.target.rotation();
    // let localData = JSON.parse(localStorage.getItem(name));
    // let res = localData.map((d) =>
    //   d.id === id ? { ...d, x: x, y: y, rotation: rotate } : d
    // );
    setDrawPolygon((prev)=>(prev.map((d) =>
      d.id === id ? { ...d, x: x, y: y, rotation: rotate } : d)))
    // localStorage.setItem(name, JSON.stringify(res));
  }
  return (
    <>
      {Array.isArray(drawPolygon) &&
        drawPolygon.map((p, idx) => (
          <Line
            key={idx}
            id={p.id}
            points={p.points}
            fill={p.fill}
            name={p.name}
            stroke={p.stroke}
            strokeWidth={p.strokeWidth}
            closed={p.closed}
            draggable={true}
            rotation={p.rotation || 0}
            onDragEnd={(e) => handlePolygonDrag(e, p.id)}
            onTransformEnd={(e) => handletransformEnd(e, p.id, p.name)}
            onMouseDown={(e) => handleTransformetMouseDown(e, p.id, p.name)}
          />
        ))}
    </>
  );
};

export default ShowPolygon;
