import React, { useContext } from "react";
import { globalStore } from "../../StoreContext/StoreContext";
import { Rect } from "react-konva";

const ShowDuplicateShape = () => {
  const { entireDupShape } = useContext(globalStore);
  return (
    <div>
      {Array.isArray(entireDupShape) &&
        entireDupShape.map((d) => <Rect key={d.id} {...d} />)}
    </div>
  );
};

export default ShowDuplicateShape;
