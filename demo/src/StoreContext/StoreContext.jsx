import React, { useEffect, useRef, useState } from "react";
import { createContext } from "react";
import { actions } from "../Actions/Action";
import { v4 as uuidv4 } from "uuid";

export const globalStore = createContext();
const StoreContext = ({ children }) => {
  let selectionArrowRef = useRef();
  const [blueRect, setBlueRect] = useState(true); // multiple shape transform
  const [disable, setDisable] = useState(false); // for disable and enable the opacity input field
  const [image, setImage] = useState(); // for upload the image
  const [images, setImages] = useState([]); // for pushimg the multiple images
  const [sideBarView, setSideBarView] = useState(false);
  const [btn, setBtn] = useState("default");
  // currentlyDrawnShap-rect, currentlyDrawnCircle, polygons
  const [currentlyDrawnShap, setCurrentlyDrawnShape] = useState({}); // rectangles
  const [drawing, setDrawing] = useState([]); // rectangle
  const [draggable, setDraggable] = useState(false);
  const [currentlyDrawnCircle, setCurrentlyDrawnCircle] = useState({}); //circle
  const [drawCircle, setDrawCircle] = useState([]); // circle
  const [scribble, setScribble] = useState({}); //scribble
  const [drawScribble, setDrawScribble] = useState([]); //scribble
  const [drawLine, setDrawLine] = useState([]); //line
  const [lines, setLines] = useState({}); //line
  const [polygons, setPolygons] = useState({}); // on Mouse down initial point update polygons
  const [nextPoint, setNextPoints] = useState({}); // polygon points update
  const [drawPolygon, setDrawPolygon] = useState([]); //polygon
  const [text, setText] = useState({}); // for set the initial text value
  const [drawText, setDrawText] = useState([]); // for set the text object in text array
  const [fontStyle, setFontStyle] = useState(""); // for  assign the fontStyleBtn for text
  const [closed, setClosed] = useState(false); // for tracking the polygon circle is completed or not
  const [isComplete, setIsComplete] = useState(false);
  const transformerRef = useRef(null);
  const [btnName, setBtnName] = useState("");
  const [fillColor, setFillColor] = useState(""); // fillColor
  const [strokeColor, setStrokeColor] = useState(""); // strokeColor
  const [initialRadius, setinitialRadius] = useState(5); // initial circle radius state
  const isPaint = useRef(false); // mouseRef
  const stageRef = useRef(null); // stage ref
  const [mouseDown, setMouseDown] = useState(false); // for tracking the mouse for useEffect run
  const [idName, setIdName] = useState({ id: "", Name: "" }); // for setting the name and id in handle select
  const [currentValue, setCurrentValue] = useState(""); // for tracking the currently typed value
  const [currentShap, setCurrentShape] = useState(); // for assigning the current selected shape name
  const [selectBox, setSelectionBox] = useState({}); //slecting box box layer
  // const [selectedIds, setSelectedIds] = useState([]); // selected shap id

  // state for handle the right side input values
  const [sideBar, setSideBar] = useState({
    strokeWidth: "",
    radius: "",
    height: "",
    width: "",
    fill: "",
    stroke: "",
    opacity: 20,
    text: "",
    fontSize: "",
    fontStyle: "",
  });

  // function for handle the zoom in zoom  out functionality for stage
  function handleCircleWheel(e) {
    const stage = stageRef.current;
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    let direction = e.evt.deltaY > 0 ? 1 : -1;

    const scaleBy = 1.01;
    const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    stage.position(newPos);
  }

  // function for handle the input field logic

  let ids = idName.id;
  let strokeWidth = Number(sideBar.strokeWidth);
  let height = Number(sideBar.height);
  let width = Number(sideBar.width);
  let radius = Number(sideBar.radius);
  let fill = sideBar.fill;
  let stroke = sideBar.stroke;
  let names = idName.Name;
  let opacity = Number(sideBar.opacity);
  let Text = sideBar.text;
  let fontSize = Number(sideBar.fontSize);
  let FontStyle = fontStyle;

  // function for handle the input field value changes
  function handleInputValue(e) {
    const { name, value } = e.target;
    setCurrentValue(value);
    setSideBar((prev) => ({ ...prev, [name]: value }));
  }

  // useEffect for update the values
  useEffect(() => {
    if (names === "rectangle") {
      setDrawing((prev) =>
        prev.map((d) =>
          d.id === ids
            ? {
                ...d,
                height: height,
                width: width,
                strokeWidth: strokeWidth,
                fill: fill,
                stroke: stroke,
              }
            : d
        )
      );
    } else if (names === "circle") {
      setDrawCircle((prev) =>
        prev.map((d) =>
          d.id === ids
            ? {
                ...d,
                strokeWidth: strokeWidth,
                fill: fill,
                stroke: stroke,
                radius: radius,
              }
            : d
        )
      );
    } else if (names === "scrible") {
      setDrawScribble((prev) =>
        prev.map((d) =>
          d.id === ids
            ? {
                ...d,
                strokeWidth: strokeWidth,
                fill: fill,
                stroke: stroke,
              }
            : d
        )
      );
    } else if (names === "line") {
      setDrawLine((prev) =>
        prev.map((d) =>
          d.id === ids
            ? {
                ...d,
                strokeWidth: strokeWidth,
                fill: fill,
                stroke: stroke,
              }
            : d
        )
      );
    } else if (names === "polygon") {
      setDrawPolygon((prev) =>
        prev.map((d) =>
          d.id === ids
            ? { ...d, strokeWidth: strokeWidth, stroke: stroke, fill: fill }
            : d
        )
      );
    } else if (names === "image") {
      setImages((prev) =>
        prev.map((d) =>
          d.id === ids
            ? {
                ...d,
                height: height,
                width: width,
                opacity: Math.round(opacity),
              }
            : d
        )
      );
    } else if (names === "text") {
      setDrawText((prev) =>
        prev.map((d) =>
          d.id === ids
            ? {
                ...d,
                text: Text,
                fontSize: fontSize,
                width: width,
                fontStyle: FontStyle,
                fill: fill,
              }
            : d
        )
      );
    }
  }, [currentValue]);

  // function for handle the perticular shape click
  function handleSelect(id, name) {
    if (name === "rectangle") {
      let Id, nm, height, width, stroke, fill, radius, strokeWidth;
      const totalShape = drawing.find((d) => d.id === id);
      nm = totalShape["name"];
      Id = totalShape["id"];
      radius = totalShape["radius"];
      height = totalShape["height"];
      width = totalShape["width"];
      strokeWidth = totalShape["strokeWidth"];
      stroke = totalShape["stroke"];
      fill = totalShape["fill"];
      setCurrentShape(nm);

      setSideBar((prev) => ({
        ...prev,
        name: nm,
        strokeWidth: strokeWidth,
        radius: radius ? radius : 0,
        height: height,
        width: width,
        fill: fill,
        stroke: stroke,
      }));
    } else if (name === "circle") {
      const totalShape = drawCircle.find((d) => d.id === id);
      let name = totalShape["name"];
      let ids = totalShape["id"];
      let radius = totalShape["radius"];
      let height = totalShape["height"];
      let width = totalShape["width"];
      let strokeWidth = totalShape["strokeWidth"];
      let stroke = totalShape["stroke"];
      let fill = totalShape["fill"];

      setCurrentShape(name);
      setSideBar({
        name: name,
        strokeWidth: strokeWidth,
        radius: radius,
        height: "0",
        width: "0",
        fill: fill,
        stroke: stroke,
      });
    } else if (name === "scrible") {
      let totalShape = drawScribble.find((d) => d.id === id);
      let name = totalShape["name"];
      let fill = totalShape["fill"];
      let stroke = totalShape["stroke"];
      let strokeWidth = totalShape["strokeWidth"];
      setCurrentShape(name);
      setSideBar({
        name: name,
        strokeWidth: strokeWidth,
        radius: "0",
        height: "0",
        width: "0",
        fill: fill,
        stroke: stroke,
      });
    } else if (name === "line") {
      let totalShape = drawLine.find((d) => d.id === id);
      let name = totalShape["name"];
      let fill = totalShape["fill"];
      let stroke = totalShape["stroke"];
      let strokeWidth = totalShape["strokeWidth"];
      setCurrentShape(name);
      setSideBar({
        name: name,
        strokeWidth: strokeWidth,
        radius: "0",
        height: "0",
        width: "0",
        fill: fill,
        stroke: stroke,
      });
    } else if (name === "polygon") {
      let totalShape = drawPolygon.find((d) => d.id === id);
      let name = totalShape["name"];
      let fill = totalShape["fill"];
      let stroke = totalShape["stroke"];
      let strokeWidth = totalShape["strokeWidth"];
      setCurrentShape(name);
      setSideBar({
        name: name,
        strokeWidth: strokeWidth,
        radius: "0",
        height: "0",
        width: "0",
        fill: fill,
        stroke: stroke,
      });
    } else if (name === "image") {
      let totalShape = images.find((d) => d.id === id);
      let name = totalShape["name"];
      let height = totalShape["height"];
      let width = totalShape["width"];
      let opacity = totalShape["opacity"];
      setCurrentShape(name);
      setSideBar({
        name: name,
        strokeWidth: "0",
        radius: "0",
        height: height,
        opacity: opacity,
        width: width,
        fill: "0",
        stroke: "0",
      });
    } else if (name === "text") {
      let totalShape = drawText.find((d) => d.id === id);
      let text = totalShape["text"];
      let fontSize = totalShape["fontSize"];
      let fontStyles = fontStyle;
      let fill = totalShape["fill"];
      let width = totalShape["width"];
      let name = totalShape["name"];
      setCurrentShape(name);
      setSideBar({
        name: name,
        strokeWidth: "0",
        radius: "0",
        height: "0",
        opacity: "0",
        width: width,
        fill: fill,
        stroke: "0",
        text: text,
        fontSize: fontSize,
      });
    }
  }

  // useEffect for pushing the image in an array(-----------IMAGE---------)
  let op = sideBar.opacity;
  useEffect(() => {
    if (image !== null && image !== undefined) {
      let height = image["height"];
      let width = image["width"];
      let img = image;
      let opacity = op;
      setImages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          name: "image",
          opacity: opacity,
          img,
          height,
          width,
        },
      ]);
    }
  }, [image]);

  // function for clearing all the shapes
  function handleClear() {
    setDrawing([]);
    setDrawCircle([]);
    setDrawScribble([]);
    setDrawLine([]);
    setDrawPolygon([]);
    setImages([]);
    setDrawText([]);
  }

  // function for handle the transformer mouse down in shape components
  function handleTransformetMouseDown(e, id, name, multiSel) {
    console.log(
      "e-",
      e,
      "id-",
      id,
      "name -",
      name,
      "multisel-",
      multiSel,
      Array.isArray(multiSel)
    );

    if (btnName === actions.select) {
      const transformerNode = e.currentTarget;
      console.log(
        "transform",
        transformerNode &&
          multiSel === undefined &&
          Array.isArray(multiSel) === false
      );
      if (
        transformerNode &&
        multiSel === undefined &&
        Array.isArray(multiSel) === false
      ) {
        console.log("single transform");
        transformerRef.current.nodes([transformerNode]);
        setSideBarView(true);
        setIdName((prev) => ({ ...prev, id: id, Name: name }));
        handleSelect(id, name);
      }
      if (multiSel !== undefined && Array.isArray(multiSel)) {
        console.log("multi transform");
        transformerRef.current.nodes(multiSel);
        setSideBarView(true);
      }
    } else {
      return;
    }
  }

  // polygon circle onClick
  function handleAnchorClick() {
    if (polygons["points"].length > 4) {
      setClosed(true); // for tracking the circle is clicked or not
      setPolygons((prev) => ({ ...prev, closed: true }));
    } else {
      return;
    }
  }

  // function for handle the handleShapeClick
  const handleShapeClick = (e, id) => {
    const isSelected = selectedIds.includes(id);
    const isMultiSelect = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;

    if (isMultiSelect) {
      setSelectedIds(
        isSelected
          ? selectedIds.filter((sid) => sid !== id)
          : [...selectedIds, id]
      );
    } else {
      setSelectedIds([id]);
    }
  };

  // useEffect for pushing the polygon data to the array and clearing the polygon object
  useEffect(() => {
    if (Object.keys(polygons).length > 0) {
      if (polygons["points"].length > 4) {
        setDrawPolygon((prev) => [...prev, polygons]);
        setPolygons({});
      }
    }

    setClosed(false); // for tracking the circle is clicked or not
  }, [closed]);

  // onStageMouseDown
  function onStageMouseDown(e) {
    if (btnName === actions.select) {
      setDraggable(false);
      setBtn("default");
      let position = e.target.getStage().getPointerPosition();
      let x = position.x;
      let y = position.y;
      setSelectionBox({
        x: x,
        y: y,
        id: uuidv4(),
        width: 0,
        height: 0,
        name: "select",
        fill: "rgba(0, 161, 255, 0.3)",
        stroke: "blue",
        strokeWidth: 4,
        dash: [4, 4],
        visible: true,
      });
    } else if (btnName === actions.rectangle) {
      isPaint.current = true;
      setDraggable(false);
      setBtn("default");
      let pos = e.target.getStage().getPointerPosition();
      let x = pos.x || 0;
      let y = pos.y || 0;
      setCurrentlyDrawnShape((pre) => ({
        ...pre,
        id: uuidv4(),
        x,
        y,
        name: btnName,
        width: 1,
        height: 1,
        fill: sideBar.fill ? sideBar.fill : "gray",
        stroke: sideBar.stroke ? sideBar.stroke : "#000000",
        strokeWidth: 4,
        rotation: 0,
      }));
    } else if (btnName === actions.circle) {
      setDraggable(false);
      setBtn("default");
      isPaint.current = true;
      let pos = e.target.getStage().getPointerPosition();
      let x = pos.x || 0;
      let y = pos.y || 0;

      setCurrentlyDrawnCircle({
        id: uuidv4(),
        x: x,
        y: y,
        name: btnName,
        radius: 1,
        fill: sideBar.fill || "gray",
        stroke: sideBar.stroke || "#000000",
        strokeWidth: 4,
        rotation: 0,
      });
    } else if (btnName === actions.scribble) {
      setDraggable(false);
      setBtn("default");
      isPaint.current = true;
      let pos = e.target.getStage().getPointerPosition();
      let x = pos.x || 0;
      let y = pos.y || 0;
      setScribble({
        id: uuidv4(),
        name: btnName,
        points: [x, y, x, y],
        stroke: sideBar.stroke || "#000000",
        fill: sideBar.fill || "gray",
        strokeWidth: 4,
        lineCap: "round",
        lineJoin: "round",
        rotation: 0,
      });
    } else if (btnName === actions.line) {
      setDraggable(false);
      setBtn("default");
      isPaint.current = true;
      let pos = e.target.getStage().getPointerPosition();
      let x = pos.x || 0;
      let y = pos.y || 0;
      setLines({
        id: uuidv4(),
        x: x,
        y: y,
        name: btnName,
        points: [x, y, x, y],
        stroke: sideBar.stroke || "#000000",
        fill: sideBar.fill || "gray",
        strokeWidth: 4,
        lineJoin: "round",
        rotation: 0,
      });
    } else if (btnName === actions.polygon) {
      setDraggable(false);
      setBtn("default");
      if (!isComplete) {
        let pos = e.target.getStage().getPointerPosition();
        let x = pos.x || 0;
        let y = pos.y || 0;
        setPolygons((prev) => ({
          ...prev,
          name: btnName,
          id: uuidv4(),
          points: Array.isArray(prev?.points) ? [...prev.points, x, y] : [x, y],
          fill: sideBar.fill || "gray",
          stroke: sideBar.stroke || "#000000",
          strokeWidth: 5,
          closed: polygons?.closed || false,
          rotation: 0,
        }));
      }
    } else if (btnName === actions.drag) {
      setBtn("grabbing");
      setMouseDown(true);
      setDraggable(true);
    } else if (btnName === actions.text) {
      let pos = e.target.getStage().getPointerPosition();
      let x = pos.x || 0;
      let y = pos.y || 0;
      setText({
        id: uuidv4(),
        x: x,
        y: y,
        name: btnName,
        text: sideBar.text || "Text",
        fontSize: sideBar.fontSize || 30,
        fontStyle: fontStyle,
        fill: sideBar.fill || "grey",
        width: sideBar.width || 60,
      });
    }
  }

  // onStageMouseMove
  function onStageMouseMove(e) {
    if (btnName === actions.select) {
      if (!selectBox) {
        return;
      } else {
        let position = e.target.getStage().getPointerPosition();
        let x = position.x;
        let y = position.y;
        setSelectionBox((prev) => ({
          ...prev,
          width: x - prev.x,
          height: y - prev.y,
        }));
      }
    } else if (btnName === actions.rectangle) {
      isPaint.current = true;
      let pos = e.target.getStage().getPointerPosition();
      let x = pos.x || 0;
      let y = pos.y || 0;
      setCurrentlyDrawnShape((prev) => {
        return { ...prev, width: x - prev.x || 0, height: y - prev.y || 0 };
      });
    } else if (btnName === actions.circle) {
      let pos = e.target.getStage().getPointerPosition();
      let x = pos.x || 0;
      let y = pos.y || 0;
      setCurrentlyDrawnCircle((pre) => ({
        ...pre,
        radius: Math.pow(
          Math.pow(x - (pre.x || 0), 2) + Math.pow(y - (pre.y || 0), 2),
          0.5
        ),
      }));
    } else if (btnName === actions.scribble) {
      let pos = e.target.getStage().getPointerPosition();
      let x = pos.x || 0;
      let y = pos.y || 0;
      setScribble((prev) => ({
        ...prev,
        points: [...(prev.points || []), x, y],
      }));
    } else if (btnName === actions.line) {
      let pos = e.target.getStage().getPointerPosition();
      let x = pos.x || 0;
      let y = pos.y || 0;
      setLines({
        ...lines,
        points: [lines?.points?.[0] || 0, lines?.points?.[1] || 0, x, y],
      });
    } else if (btnName === actions.polygon) {
      if (!isComplete) {
        let pos = e.target.getStage().getPointerPosition();
        let x = pos.x || 0;
        let y = pos.y || 0;
        setNextPoints({ x: x, y: y });
      }
    } else if (btnName === actions.drag) {
      setDraggable(true);
    }
  }
  console.log(idName.Name);

  // onStageMouseOut
  function onStageMouseOut(e) {
    setBlueRect(false);
    let stage = e.target.getStage();
    console.log(stage);

    console.log(stage, "stage");
    setMouseDown(false);
    if (btnName === actions.select) {
      if (!selectBox) {
        return;
      } else {
        let rectangleShape = stage.find(".rectangle");
        let circleShape = stage.find(".circle");
        let polygon = stage.find(".polygon");
        var box = selectionArrowRef.current.getClientRect(); // blue color slected layer
        let shapes = [...rectangleShape, ...circleShape, ...polygon];
        var selected = shapes.filter((shape) =>
          Konva.Util.haveIntersection(box, shape.getClientRect())
        );
        console.log("selected", selected);
        if (selected) {
          handleTransformetMouseDown(
            e,
            selectBox["id"],
            selectBox["name"],
            selected
          );
        }
        // tr.nodes(selected);
        setSelectionBox({
          x: "",
          y: "",
          width: 0,
          height: 0,
          name: "select",
          fill: "rgba(0, 161, 255, 0.3)",
          stroke: "blue",
          strokeWidth: 4,
          dash: [4, 4],
          visible: false,
        });
        // setSelectionBox((prev) => ({ ...prev, visible: !blueRect }));
      }
    } else if (btnName === actions.rectangle) {
      isPaint.current = false;
      setDrawing((prev) => [...prev, currentlyDrawnShap]);
      setCurrentlyDrawnShape({}); // resetting the currently drawn shape
    } else if (btnName === actions.circle) {
      isPaint.current = false;
      setDrawCircle((prev) => [...prev, currentlyDrawnCircle]);
      setCurrentlyDrawnCircle({}); // resetting the currently drawn circle shape
    } else if (btnName === actions.scribble) {
      setDrawScribble((prev) => [...prev, scribble]);
      setScribble({}); // resetting the currently drawn scribble shape
    } else if (btnName === actions.line) {
      setDrawLine((prev) => [...prev, lines]);
      setLines({});
    } else if (btnName === "drag") {
      setBtn("grab");
    } else if (btnName === "text") {
      setDrawText((prev) => [...prev, text]);
      setText({});
    }
  }

  // Function for handle the whille clicking outside the tranform should be unselect
  function transformUnSelect(e) {
    if (e.target === stageRef.current) {
      if (transformerRef.current) {
        transformerRef.current.nodes([]);
        setSideBarView(false);
      }
    } else {
      return;
    }
  }

  const contextValue = {
    selectionArrowRef,
    handleShapeClick,
    selectBox,
    setSelectionBox,
    handleCircleWheel,
    fontStyle,
    setFontStyle,
    drawText,
    setDrawText,
    text,
    setText,
    disable,
    setDisable,
    images,
    image,
    setImage,
    setCurrentShape,
    sideBarView,
    setSideBarView,
    transformUnSelect,
    btn,
    setBtn,
    draggable,
    setDraggable,
    handleClear,
    idName,
    sideBar,
    setSideBar,
    currentShap,
    handleInputValue,
    sideBar,
    setSideBar,
    initialRadius,
    setinitialRadius,
    handleAnchorClick,
    isComplete,
    setIsComplete,
    nextPoint,
    setNextPoints,
    btnName,
    setBtnName,
    fillColor,
    setFillColor,
    strokeColor,
    setStrokeColor,
    transformerRef,
    handleTransformetMouseDown,
    currentlyDrawnShap,
    setCurrentlyDrawnShape,
    drawing,
    setDrawing,
    stageRef,
    onStageMouseDown,
    onStageMouseMove,
    onStageMouseOut,
    drawCircle,
    setDrawCircle,
    currentlyDrawnCircle,
    setCurrentlyDrawnCircle,
    drawScribble,
    setDrawScribble,
    scribble,
    setScribble,
    drawLine,
    setDrawLine,
    lines,
    setLines,
    polygons,
    setPolygons,
    drawPolygon,
    setDrawPolygon,
    mouseDown,
  };

  return (
    <globalStore.Provider value={contextValue}>{children}</globalStore.Provider>
  );
};

export default StoreContext;

/*let x1, y1, x2, y2;
        stage.on("mousedown touchstart", (e) => {
          // do nothing if we mousedown on any shape
          if (e.target !== stage) {
            return;
          }
          x1 = stage.getPointerPosition().x;
          y1 = stage.getPointerPosition().y;
          x2 = stage.getPointerPosition().x;
          y2 = stage.getPointerPosition().y;

          selectionRectangle.setAttrs({
            x: x1,
            y: y1,
            width: 0,
            height: 0,
            visible: true,
          });
        });

        stage.on("mousemove touchmove", () => {
          // do nothing if we didn't start selection
          if (!selectionRectangle.visible()) {
            return;
          }
          x2 = stage.getPointerPosition().x;
          y2 = stage.getPointerPosition().y;

          selectionRectangle.setAttrs({
            x: Math.min(x1, x2),
            y: Math.min(y1, y2),
            width: Math.abs(x2 - x1),
            height: Math.abs(y2 - y1),
          });
        });

        stage.on("mouseup touchend", () => {
          // do nothing if we didn't start selection
          if (!selectionRectangle.visible()) {
            return;
          }
          // update visibility in timeout, so we can check it in click event
          setTimeout(() => {
            selectionRectangle.visible(false);
          });

          var shapes = stage.find(".rect");
          var box = selectionRectangle.getClientRect();
          co;
          var selected = shapes.filter((shape) =>
            Konva.Util.haveIntersection(box, shape.getClientRect())
          );
          tr.nodes(selected);
        });

        // clicks should select/deselect shapes
        stage.on("click tap", function (e) {
          // if we are selecting with rect, do nothing
          if (
            selectionRectangle.visible() &&
            selectionRectangle.width() > 0 &&
            selectionRectangle.height() > 0
          ) {
            return;
          }

          // if click on empty area - remove all selections
          if (e.target === stage) {
            tr.nodes([]);
            return;
          }

          // do nothing if clicked NOT on our rectangles
          if (!e.target.hasName("rect")) {
            return;
          }

          // do we pressed shift or ctrl?
          const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
          const isSelected = tr.nodes().indexOf(e.target) >= 0;

          if (!metaPressed && !isSelected) {
            // if no key pressed and the node is not selected
            // select just one
            tr.nodes([e.target]);
          } else if (metaPressed && isSelected) {
            // if we pressed keys and node was selected
            // we need to remove it from selection:
            const nodes = tr.nodes().slice(); // use slice to have new copy of array
            // remove node from array
            nodes.splice(nodes.indexOf(e.target), 1);
            tr.nodes(nodes);
          } else if (metaPressed && !isSelected) {
            // add the node into selection
            const nodes = tr.nodes().concat([e.target]);
            tr.nodes(nodes);
          }
        }); */
