import React, { useEffect, useRef, useState } from "react";
import { createContext } from "react";
import { actions } from "../Actions/Action";
import { v4 as uuidv4 } from "uuid";
import { RiCoinsLine } from "react-icons/ri";

export const globalStore = createContext();

const StoreContext = ({ children }) => {
  // state for set the value
  const [currentlyDrawnShap, setCurrentlyDrawnShape] = useState({}); // rectangle
  const [drawing, setDrawing] = useState([]); // rectangle
  const [currentlyDrawnCircle, setCurrentlyDrawnCircle] = useState({}); //circle
  const [drawCircle, setDrawCircle] = useState([]); // circle
  const [scribble, setScribble] = useState({}); //scribble
  const [drawScribble, setDrawScribble] = useState([]); //scribble
  const [drawLine, setDrawLine] = useState([]); //line
  const [lines, setLines] = useState({}); //line
  const [polygons, setPolygons] = useState({}); // on Mous down initial point update polygons
  const [nextPoint, setNextPoints] = useState({}); // polygon points update
  const [drawPolygon, setDrawPolygon] = useState([]); //polygon
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
  // state for handle the right side input values

  const [sideBar, setSideBar] = useState({
    strokeWidth: "",
    radius: "",
    height: "",
    width: "",
    fill: "",
    stroke: "",
  });

  const [currentShap, setCurrentShape] = useState(); // for assigning the current selected shape name

  // function for handle the input field logic

  let ids = idName.id;
  let strokeWidth = Number(sideBar.strokeWidth);
  let height = Number(sideBar.height);
  let width = Number(sideBar.width);
  let radius = Number(sideBar.radius);
  let fill = sideBar.fill;
  let stroke = sideBar.stroke;
  let names = idName.Name;

  console.log(
    "idName.id",
    ids,
    "idName.Name",
    names,
    strokeWidth,
    height,
    width,
    radius,
    fill,
    stroke
  );

  // function for handle the input field value changes

  function handleInputValue(e) {
    const { name, value } = e.target;
    setSideBar((prev) => ({ ...prev, [name]: value }));
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
      console.log("input changes", names);
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
      console.log("input changes", names);
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
      console.log("input changes", names);
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
      console.log("input changes", names);
      setDrawPolygon((prev) =>
        prev.map((d) =>
          d.id === ids
            ? { ...d, strokeWidth: strokeWidth, stroke: stroke, fill: fill }
            : d
        )
      );
    }
  }

  // function for handle the perticular shape click

  function handleSelect(id, name) {
    console.log(id, name);
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
      console.log(totalShape);
      let name = totalShape["name"];
      let ids = totalShape["id"];
      let radius = totalShape["radius"];
      let height = totalShape["height"];
      let width = totalShape["width"];
      let strokeWidth = totalShape["strokeWidth"];
      let stroke = totalShape["stroke"];
      let fill = totalShape["fill"];
      console.log(
        `name ${name}, id ${ids} radius ${radius} height${height} width ${width} strokeWidth ${strokeWidth} stroke${stroke} fill ${fill}`
      );

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
      console.log(totalShape);
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
      console.log(totalShape);
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
      console.log(totalShape);
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
    }
  }

  // function for handle the transformer mouse down in shape components
  function handleTransformetMouseDown(e, id, name) {
    if (btnName === actions.select) {
      const transformerNode = e.currentTarget;
      transformerRef.current.nodes([transformerNode]);
      console.log("handleTransform", id, name);
      setIdName((prev) => ({ ...prev, id: id, Name: name }));
      handleSelect(id, name);
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
      return;
    } else if (btnName === actions.rectangle) {
      isPaint.current = true;
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
      // setIsComplete(false); //--------Now----------------------------------------
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
    }
  }

  // onStageMouseMove
  function onStageMouseMove(e) {
    if (btnName === actions.select) {
      return;
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
    }
  }

  // onStageMouseOut
  function onStageMouseOut() {
    if (btnName === actions.rectangle) {
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
    }
  }

  const contextValue = {
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
  };
  // console.log(btnName);
  return (
    <globalStore.Provider value={contextValue}>{children}</globalStore.Provider>
  );
};

export default StoreContext;
