import { useContext } from "react";
import { Circle, Rect, Line, RegularPolygon } from "react-konva";
import { globalStore } from "../../StoreContext/StoreContext";

let ShapeComponent = ({
  id,
  name,
  shape,
  onClick,
  draggable,
  closed,
  x,
  y,
}) => {
  const { handleTransformetMouseDown, setShape } = useContext(globalStore);

  function handleDragEnd(e, id) {
    let x = e.target.x();
    let y = e.target.y();
    setShape((prev) =>
      prev.map((d) => (d.id === id ? { ...d, x: x, y: y } : d))
    );
  }

  //function for handle the transform end
  function handleTransformEnd(e, id, name) {
    let x = e.target.x();
    let y = e.target.y();
    let rotate = e.target.rotation();
    setShape((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, x: x, y: y, rotation: rotate } : d
      )
    );
  }

  switch (shape.type) {
    case "Circle":
      return (
        <Circle
          onMouseDown={(e) => handleTransformetMouseDown(e, id, name)}
          onDragEnd={(e) => handleDragEnd(e, id)}
          onTransformEnd={(e) => handleTransformEnd(e, id, name)}
          draggable={draggable}
          {...shape}
        />
      );

    case "Line":
      // defaultly the line has no x and y values so we need to drag the line to set the x and y values, so it will work fine
      return (
        <Line
          {...shape}
          draggable={draggable}
          onMouseDown={(e) => handleTransformetMouseDown(e, id, name)}
          onDragEnd={(e) => handleDragEnd(e, id)}
          onTransformEnd={(e) => handleTransformEnd(e, id, name)}
        />
      );
    case "Polygon":
      // defaultly the polygon has no x and y values so we need to drag the polygon to set the x and y values, so it will work fine
      return (
        <Line
          onMouseDown={(e) => handleTransformetMouseDown(e, id, name)}
          onDragEnd={(e) => handleDragEnd(e, id)}
          onTransformEnd={(e) => handleTransformEnd(e, id, name)}
          {...shape}
          draggable={draggable}
        />
      );
    case "Rectangle":
      return (
        <Rect
          onMouseDown={(e) => handleTransformetMouseDown(e, id, name)}
          onDragEnd={(e) => handleDragEnd(e, id)}
          onTransformEnd={(e) => handleTransformEnd(e, id, name)}
          draggable={draggable}
          {...shape}
        />
      );
    default:
      return null;
  }
};

export default ShapeComponent;
