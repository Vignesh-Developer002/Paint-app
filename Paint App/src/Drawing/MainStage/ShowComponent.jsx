import ShowCircle from "../Show/ShowCircle";
import ShowLine from "../Show/ShowLine";
import ShowPolygon from "../Show/ShowPolygon";
import ShowRectangle from "../Show/ShowRectangle";
import ShowScribble from "../Show/ShowScribble";
import ShowImage from "../Show/ShowImage";
import ShowText from "../Show/ShowText";
import ShowGroup from "../Show/ShowGroup";
import ShowSingleRect from "../Show/ShowSingleRect";

const ShowComponent = () => {
  return (
    <>
      <ShowCircle />
      <ShowRectangle />
      <ShowScribble />
      <ShowLine />
      <ShowPolygon />
      <ShowImage />
      <ShowText />
      <ShowGroup />
      <ShowSingleRect />
    </>
  );
};

export default ShowComponent;
