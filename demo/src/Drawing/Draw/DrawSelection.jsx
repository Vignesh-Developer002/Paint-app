import { useContext } from "react";
import { globalStore } from "../../StoreContext/StoreContext";
import { Rect } from "react-konva";

const DrawSelection = () => {
  const { selectBox, setSelectionBox, selectionArrowRef } =
    useContext(globalStore);
  let visible = selectBox["visible"];
  console.log("arrow ref", selectionArrowRef);
  return (
    <>
      {selectBox && visible && (
        <Rect
          id={selectBox.id}
          ref={selectionArrowRef}
          x={selectBox.x}
          y={selectBox.y}
          name={selectBox.name}
          width={selectBox.width}
          height={selectBox.height}
          fill={selectBox.fill}
          stroke={selectBox.stroke}
          strokeWidth={selectBox.strokeWidth}
          dash={selectBox.dash}
          draggable={true}
        />
      )}
    </>
  );
};

export default DrawSelection;
