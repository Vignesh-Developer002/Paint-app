import { useContext, useState } from "react";
import { Line } from "react-konva";
import { globalStore } from "../../StoreContext/StoreContext";

const DrawXyLine = () => {
  const { point } = useContext(globalStore);

  let x = point?.x;
  let y = point?.y;
  let width = point?.width;
  let height = point?.height;

  return (
    <>
      {/* ----------bottom---x - 6000, y + 300, x + 6000, y + 300------------ */}
      <Line
        points={[
          x - (width + 6000),
          y + height,
          x + (width + 6000),
          y + height,
        ]}
        stroke="grey"
        strokeWidth={1}
        lineCap="round"
        lineJoin="round"
      />

      {/* right  x + 300, y - 6000, x + 300, y + 6000*/}
      <Line
        points={[
          x + width,
          y - (height + 6000),
          x + width,
          y + (height + 6000),
        ]}
        stroke="grey"
        strokeWidth={1}
        lineCap="round"
        lineJoin="round"
      />
      {/* top  x - 6000, y, x + 6000, y*/}
      <Line
        points={[x - (width + 6000), y, x + +6000, y]}
        stroke="grey"
        strokeWidth={3}
        lineCap="round"
        lineJoin="round"
      />
      {/* left  x, y + 6000, x, y - 6000*/}
      <Line
        points={[x, y + (height + 6000), x, y - (height + 6000)]}
        stroke="grey"
        strokeWidth={3}
        lineCap="round"
        lineJoin="round"
      />
    </>
  );
};

export default DrawXyLine;
