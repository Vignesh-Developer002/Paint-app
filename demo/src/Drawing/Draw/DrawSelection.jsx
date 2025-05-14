import {useContext} from "react";
import { globalStore } from "../../StoreContext/StoreContext";
import {Rect} from "react-konva"

const DrawSelection = () => {
  const { selectBox, setSelectionBox } = useContext(globalStore);
  return (
    <>
      {selectBox && (
        <Rect
          x={selectBox.x}
          y={selectBox.y}
          width={selectBox.width}
          height={selectBox.height}
          fill="rgba(0, 161, 255, 0.3)"
          stroke="blue"
          strokeWidth={1}
          dash={[4, 4]}
        />
      )}
    </>
  );
};

export default DrawSelection;
