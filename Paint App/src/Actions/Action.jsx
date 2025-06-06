import { useContext } from "react";
import { globalStore } from "../StoreContext/StoreContext";

export const actions = {
  select: "select",
  circle: "circle",
  rectangle: "rectangle",
  rectLayer: "rectLayer",
  scribble: "scrible",
  line: "line",
  polygon: "polygon",
  StrokeColor: "Stroke",
  fillColor: "fill",
  Clear: "clear",
  drag: "drag",
  upload: "image",
  text: "text",
  group: "group",
  duplicate: "duplicate",
  copy: "copy",
  paste: "paste",
  vertical: "vertical",
  horizontal: "horizontal",
};

const StrokeColor = () => {
  const { sideBar, handleInputValue, darkMode } = useContext(globalStore);
  return (
    <>
      <input
        type="color"
        value={sideBar.stroke}
        name="stroke"
        onChange={(e) => handleInputValue(e)}
        style={{
          width: "80px",
          height: "50px",
          cursor: "pointer",
          backgroundColor: "white",
          border: "1px solid lightGrey",
        }}
      />
    </>
  );
};

export default StrokeColor;

export const FillColor = () => {
  const { sideBar, handleInputValue } = useContext(globalStore);

  return (
    <>
      <input
        type="color"
        name="fill"
        value={sideBar.fill}
        onChange={(e) => handleInputValue(e)}
        style={{
          width: "80px",
          height: "50px",
          cursor: "pointer",
          backgroundColor: "white",
          border: "1px solid lightGrey",
        }}
      />
    </>
  );
};
