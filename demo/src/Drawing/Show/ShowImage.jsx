import React, { useContext } from "react";
import { Image as KonvaImage, Layer } from "react-konva";
import { globalStore } from "../../StoreContext/StoreContext";

const ShowImage = () => {
  const {  handleTransformetMouseDown, images } = useContext(globalStore);
  return (
    <>
      {Array.isArray(images) &&
        images.map((i, idx) => (
          <KonvaImage
            id={i.id}
            key={idx}
            x={50}
            y={110}
            image={i.img}
            width={i.width}
            height={i.height}
            draggable={true}
            opacity={i.opacity / 100}
            onMouseDown={(e) => handleTransformetMouseDown(e, i.id, i.name)}
          />
        ))}
    </>
  );
};

export default ShowImage;
