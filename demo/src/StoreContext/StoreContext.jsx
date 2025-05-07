import React, { useRef, useState } from "react";
import { createContext } from "react";
import { actions } from "../Actions/Action";
import { v4 as uuidv4 } from "uuid";

console.log(uuidv4());
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
  const [isComplete, setIsComplete] = useState(false);
  // const [points, setPoints] = useState([]);
  const transformerRef = useRef(null);
  const [btnName, setBtnName] = useState("");
  const [fillColor, setFillColor] = useState(""); // fillColor
  const [strokeColor, setStrokeColor] = useState(""); // strokeColor
  const isPaint = useRef(false); // mouseRef
  const stageRef = useRef(null); // stage ref

  console.log(polygons,nextPoint, drawPolygon);

  // function for handle the transformer mouse down in shape components
  function handleTransformetMouseDown(e, id, name) {
    if (btnName === actions.select) {
      const transformerNode = e.currentTarget;
      transformerRef.current.nodes([transformerNode]);
    } else {
      return;
    }
  }

  // polygon circle onClick
  function handleAnchorClick() {
    if (btnName === actions.polygon && polygons.closed) {
      setDrawPolygon( [...drawPolygon, polygons]);
      // setPolygons({});
      // setNextPoints({});
    }
    setPolygons((prev) => ({ ...prev, closed: true }));
    setIsComplete(true);
  }

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
        width: 1,
        height: 1,
        fill: fillColor || "gray",
        stroke: strokeColor || "#000000",
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
        fill: fillColor || "gray",
        stroke: strokeColor || "#000000",
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
        stroke: strokeColor || "#000000",
        fill: fillColor || "gray",
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
        stroke: strokeColor || "#000000",
        fill: fillColor || "gray",
        strokeWidth: 4,
        lineJoin: "round",
        rotation: 0,
      });
    } else if (btnName === actions.polygon) {
      if (!isComplete) {
        console.log();
        let pos = e.target.getStage().getPointerPosition();
        let x = pos.x || 0;
        let y = pos.y || 0;
        setPolygons((prev) => ({
          ...prev,
          id: uuidv4(),
          points: Array.isArray(prev?.points) ? [...prev.points, x, y] : [x, y],
          fill: fillColor || "gray",
          stroke: strokeColor || "#000000",
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
        points: [lines.points[0] || 0, lines.points[1] || 1, x, y],
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
    // else if (btnName === actions.polygon) {
    //   if (polygons.closed === true) {
    //     setDrawPolygon((pre) => [...pre, polygons]);
    //   }
    // }
  }

  const contextValue = {
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
