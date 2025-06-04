import { useEffect, useRef, useState } from "react";
import { createContext } from "react";
import { actions } from "../Actions/Action";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

import { FaRegCircle } from "react-icons/fa";
import { RiRectangleLine } from "react-icons/ri";
import { PiScribbleLight } from "react-icons/pi";
import { FaArrowTrendDown } from "react-icons/fa6";
import { FaDrawPolygon } from "react-icons/fa";
import { FaArrowPointer } from "react-icons/fa6";
import Clear from "../components/Clear/Clear";
import Drag from "../components/Drag/Drag";
import { FaUpload } from "react-icons/fa";
import { MdTextIncrease } from "react-icons/md";
import { FaObjectGroup } from "react-icons/fa";
import { RiRectangleFill } from "react-icons/ri";
import { MdLibraryAdd } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import { FaPaste } from "react-icons/fa";
import { PiFlipVerticalThin } from "react-icons/pi";
import { PiFlipHorizontalThin } from "react-icons/pi";

export const globalStore = createContext();
const StoreContext = ({ children }) => {
  let selectionArrowRef = useRef();
  let [point, setPoint] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    radius: 0,
  });

  //joystick
  const size = 200;
  const center = size / 2;
  const [position, setPosition] = useState({ x: center, y: center }); // this for handle and tracking the value for joystick button
  const [joystickBtnClick, setJoystickBtnClick] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  //-----------------------------------------

  // -----------------preview state variable------------------
  const [preview, setPreview] = useState(false); // for show and hide the preview content
  const [previewImage, setPreviewImage] = useState(null); // for setting the preview image from the stage

  // function for handle the preview image
  function handlePreviwImage() {
    setPreview((pre) => !pre);
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
    setPreviewImage(uri);
  }

  //---------------------preview state variable-end-----------------

  let singleRectRef = useRef(null);
  const groupRef = useRef(null); // for single ref
  let polyRef = useRef(null); // single rect inside polygon shape
  let rectRef = useRef(null); // single rect inside circles shape
  let cirRef = useRef(null); // single rect inside cirRef shape
  let lineRef = useRef(null); // // single rect inside line shape
  const [listern, setListern] = useState("");
  let [Stage2ShapeColor, setStage2ShapeColor] = useState(true);
  let [stage2PolyClosed, setStage2PolygonClosed] = useState(false); // for tracking the  stage 2 polygon is closed
  let [nextStage2Points, setStage2Points] = useState({}); // for updating the points for stage 2 polygon
  let [PolyStage2Complete, setPolyStage2Complete] = useState(false); // for tracking the polygon stage 2 is complete
  let [obRect, setObRect] = useState({}); //object for rect inside
  let [obCir, setObCir] = useState({}); //object for circle inside
  let [obLine, setObLine] = useState({}); //object for line inside
  let [obPoly, setObPoly] = useState({}); //object for poly inside
  let [showObRect, setShowObRect] = useState([]); // array for pushing the rect object
  let [showObCircle, setShowObCirlce] = useState([]); //array for pushing the circle Object
  let [showObLine, setShowObLine] = useState([]); //array for pushing the line object
  let [showObPoly, setShowObpoly] = useState([]); //array for pushing the poly object
  const [rectMouseDown, setRectMouseDown] = useState(null); // for tracking the mouse down for the singleRectLayer
  const [shapeColor, setShapeColor] = useState(null); // for setting the shape color when ever we enter the subStage and leave the subStage
  let [stageVisible, setStageVisible] = useState(false); // for enable and disable the button
  let blueLayerRef = useRef(null); // multiple shape transform
  const [disable, setDisble] = useState(false); // for disable and enable the opacity input field
  const [image, setImage] = useState(); // for upload the image
  const [images, setImages] = useState([]); // for pushimg the multiple images
  const [sideBarView, setSideBarView] = useState(false);
  const [btn, setBtn] = useState("default");
  const [drawsingleRect, setDrawSingleRect] = useState({}); // object for store the initial value
  const [showSingleRect, setShowSingleRect] = useState([]); // array for push the object
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
  const [group, setGroup] = useState({}); // for initiate the group object
  const [ShowGroup, setShowGroup] = useState([]); // for pushing the group into the array
  const [fontStyle, setFontStyle] = useState(""); // for  assign the fontStyleBtn for text
  const [closed, setClosed] = useState(false); // for tracking the polygon circle is completed or not
  const [isComplete, setIsComplete] = useState(false);
  const transformerRef = useRef(null);
  const transformerRef2 = useRef(null);
  const [btnName, setBtnName] = useState("");
  const [fillColor, setFillColor] = useState(""); // fillColor
  const [strokeColor, setStrokeColor] = useState(""); // strokeColor
  const [initialRadius, setinitialRadius] = useState(4); // initial circle radius state
  const isPaint = useRef(false); // mouseRef
  const stageRef = useRef(null); // stage ref
  const [mouseDown, setMouseDown] = useState(false); // for tracking the mouse for useEffect run
  const [idName, setIdName] = useState({ id: "", Name: "" }); // for setting the name and id in handle select
  const [currentValue, setCurrentValue] = useState(""); // for tracking the currently typed value
  const [currentShap, setCurrentShape] = useState(); // for assigning the current selected shape name
  const [selectBox, setSelectionBox] = useState({}); //slecting box box layer
  const [btnEnablen, setBtnEnable] = useState(false); // for enable and disable the button
  const [dragHappen, setDragHappens] = useState(false); // for single rect
  const [restrictSidrBar, setRestrictSideBar] = useState(false); // for restrict the side nbar
  let wd = Math.abs(selectBox?.width);
  let ht = Math.abs(selectBox?.height);

  //  preview , dark mode state variable
  const [cancelIconColor, setCancelIconColor] = useState(""); // for cancel icon
  const [eyeColor, setEyeColor] = useState(false); // for preview icon
  const [darkMode, setDarkMode] = useState(false); // for darkMode icon
  const [closeBottomNav, setCloseBottomNav] = useState(true); // for open and closing the bottom navbar
  const [darkModeValue, setDarkModeValue] = useState(null); // for set the darkmode state value
  //--------------------------------Zoom in and Zoom out functionality------------------------------------------------------
  // zoom in and zoom out functionality state variable for plus and minus btns

  //function for handle increment
  const [inc, setInc] = useState(100);
  const handleInc = () => {
    setInc((pre) => pre + 10);
  };
  // function for handle the decrement
  function handleDec() {
    setInc((pre) => pre - 10);
  }

  const [scale, setScale] = useState(1);
  const handleZoom = (zoomIn) => {
    if (zoomIn === true) {
      handleInc();
    } else if (zoomIn === false) {
      handleDec();
    }
    const stage = stageRef.current;
    if (!stage) return;

    const scaleBy = 1.1;
    const oldScale = scale;
    const newScale = zoomIn ? oldScale * scaleBy : oldScale / scaleBy;

    // Get the center point of the viewport
    const center = {
      x: stage.width() / 2,
      y: stage.height() / 2,
    };

    // Calculate new position so the center stays in the same place
    const mousePointTo = {
      x: (center.x - stage.x()) / oldScale,
      y: (center.y - stage.y()) / oldScale,
    };
    const newPos = {
      x: center.x - mousePointTo.x * newScale,
      y: center.y - mousePointTo.y * newScale,
    };

    stage.scale({ x: newScale, y: newScale });
    stage.position(newPos);
    stage.batchDraw();
    setScale(newScale);
  };

  //-------------------------------------------------------------------------
  // ---------------------------flip-start-----------------------------------

  const [isFlipped, setIsFlipped] = useState(false); // for vertical flip
  const [isHorizontalFlip, setIsHorizontalFlip] = useState(false); // for horizontal flip
  const [angle, setAngle] = useState(0);
  const [oppositAngle, setOppositeAngle] = useState(0);
  // for vertical flip
  const handleVerticalFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  function getOppositeAngle(angle) {
    return (angle + 180) % 360;
  }
  // for horizontal flip
  function HorizontalFlip() {
    setIsHorizontalFlip((p) => !p);
  }

  function getOppHorizontalAngle(angle) {
    if (angle === 0) {
      return 0;
    }
    return 360 - angle;
  }

  //function for finding the opposite angle

  // ----------------------flip-end-------------------------------------------

  // ------------------------copy state----------------------------------------
  const [down, setDown] = useState(false); // for tracking the mouseDownhandletransform
  const [copyBtn, SetCopyBtn] = useState(false); // for tracking the copy btn is clicked or not
  const [pasteBtn, setPasteBtn] = useState(false); //for tracking the paste btn is clicked or not
  const [duplicateBtn, setDuplicateBtn] = useState(false); //for tracking the duplicate btn is clicked or not
  const [copiedShape, setCopiedShape] = useState(null); // for assigning the copied shape
  // function for handle the bottomNav btn click function
  let entireShapes = [
    ...showSingleRect,
    ...drawing,
    ...drawCircle,
    ...drawLine,
    ...drawPolygon,
    ...drawScribble,
  ];
  // -----------------------duplicate-start----------------------------------------

  const [entireDupShape, setEntireDupShapeShapes] = useState(entireShapes);
  const [duplicateSelectedId, setDuplicateSelectedId] = useState(null); // for set the selected shape id
  const lastShape = entireDupShape[entireDupShape.length - 1];

  // -----------------------duplicate-end----------------------------------------

  const [shape, setShape] = useState(entireShapes);
  const shapeMap = {
    Circle: Konva.Circle,
    Line: Konva.Line,
    Polygon: Konva.Line,
    Path: Konva.Path,
    Rectangle: Konva.Rect,
  };

  // function for handle copy
  function handleCopy(shape) {
    setCopiedShape(shape);
  }

  function handleBottomNavBtn(btn, name) {
    const { Name, id } = name;
    if (btn === "copy" && down === true) {
      toast.success("copied..");
      let res = entireShapes.find((d) => d.id === id);
      if (res) {
        handleCopy(res);
      } else {
        let res = shape.map((d) => d.id === id);
        handleCopy(res);
      }
    } else if (
      btn === "paste" &&
      down === true &&
      copiedShape &&
      stageRef.current
    ) {
      const stage = stageRef.current.getStage();
      let scale = stage.scaleX();
      let position = stage.position();
      const centerX = (stage.width() / 2 - position.x) / scale;
      const centerY = (stage.height() / 2 - position.y) / scale;

      let { id, ...shapeConfig } = copiedShape;

      const KonvaClass = shapeMap[copiedShape.type];
      const tempShape = new KonvaClass(shapeConfig);
      const bbox = tempShape.getClientRect();

      const offsetX = bbox.x + bbox.width / 2;
      const offsetY = bbox.y + bbox.height / 2;

      const newShape = {
        ...copiedShape,
        id: uuidv4(),
        x: copiedShape.x + (centerX - offsetX),
        y: copiedShape.y + (centerY - offsetY),
      };
      setShape([...shape, newShape]);
    }
    //  else if (btn === "duplicate" && down === true) {
    //   console.log("click duplicate");
    //   if (duplicateSelectedId === null) {
    //     console.log("no id selected");
    //     return;
    //   } else {
    //     console.log("id available");
    //     const original = entireShapes.find((d) => d.id === duplicateSelectedId); // find shape object

    //     const newShape = {
    //       ...original,
    //       // id: `${original.id}-copy-${Date.now()}`, // unique id
    //       id: uuidv4(),
    //       x: lastShape?.x + 20,
    //       y: lastShape?.y + 20,
    //     };
    //     setEntireDupShapeShapes((prev) => [...prev, newShape]);
    //   }
    // }
    else if (btn === "vertical" && down === true) {
      handleVerticalFlip();
      setOppositeAngle(getOppositeAngle(angle));
      if (idName.Name === "rectangle") {
        if (isFlipped === true) {
          setDrawing((prev) =>
            prev.map((r) =>
              r.id === id ? { ...r, rotation: oppositAngle } : r
            )
          );
        } else {
          setDrawing((prev) =>
            prev.map((r) => (r.id === id ? { ...r, rotation: angle } : r))
          );
        }
      }
    } else if (btn === "horizontal" && down === true) {
      HorizontalFlip();
      setOppositeAngle(getOppHorizontalAngle(angle));
      console.log("horizontal is clicked");
      if (idName.Name === "rectangle") {
        if (isHorizontalFlip === true) {
          setDrawing((prev) =>
            prev.map((r) =>
              r.id === id ? { ...r, rotation: oppositAngle } : r
            )
          );
        } else {
          setDrawing((prev) =>
            prev.map((r) => (r.id === id ? { ...r, rotation: angle } : r))
          );
        }
      }
    }
  }

  // ------------------------copy end--------------------------------------

  //-----------------------------set of icons function--------------------------------------------
  function shapeCollection() {
    const drawData = [
      {
        id: actions.select,
        icons: (
          <FaArrowPointer
            data-tooltip-id="color"
            data-tooltip-content="Select"
            data-tooltip-place="right"
            style={{
              color: darkMode ? "#ada69c" : "#5d5d5d",
              width: "80%",
              height: "80%",
              border: "none",
              outline: "none",
              fontSize: "25px",
            }}
          />
        ),
      },
      {
        id: actions.circle,
        icons: (
          <FaRegCircle
            data-tooltip-id="color"
            data-tooltip-content="Circle"
            data-tooltip-place="right"
            style={{
              color: darkMode ? "#ada69c" : "#5d5d5d",
              width: "80%",
              height: "80%",
              border: "none",
              outline: "none",
              fontSize: "25px",
            }}
          />
        ),
      },
      {
        id: actions.rectangle,
        icons: (
          <RiRectangleLine
            data-tooltip-id="color"
            data-tooltip-content="Rectangle"
            data-tooltip-place="right"
            style={{
              color: darkMode ? "#ada69c" : "#5d5d5d",
              width: "80%",
              height: "80%",
              border: "none",
              outline: "none",
              fontSize: "25px",
            }}
          />
        ),
      },
      {
        id: actions.scribble,
        icons: (
          <PiScribbleLight
            data-tooltip-id="color"
            data-tooltip-content="Scribble"
            data-tooltip-place="right"
            style={{
              color: darkMode ? "#ada69c" : "#5d5d5d",
              width: "80%",
              height: "80%",
              border: "none",
              outline: "none",
              fontSize: "25px",
            }}
          />
        ),
      },
      {
        id: actions.rectLayer,
        icons: (
          <RiRectangleFill
            data-tooltip-id="color"
            data-tooltip-content="Rectangle layer"
            data-tooltip-place="right"
            style={{
              color: darkMode ? "#ada69c" : "#5d5d5d",
              width: "80%",
              height: "80%",
              border: "none",
              outline: "none",
              fontSize: "25px",
            }}
          />
        ),
      },
      {
        id: actions.line,
        icons: (
          <FaArrowTrendDown
            data-tooltip-id="color"
            data-tooltip-content="Line"
            data-tooltip-place="right"
            style={{
              color: darkMode ? "#ada69c" : "#5d5d5d",
              width: "80%",
              height: "80%",
              border: "none",
              outline: "none",
              fontSize: "25px",
            }}
          />
        ),
      },
      {
        id: actions.polygon,
        icons: (
          <FaDrawPolygon
            data-tooltip-id="color"
            data-tooltip-content="Polygon"
            data-tooltip-place="right"
            style={{
              color: darkMode ? "#ada69c" : "#5d5d5d",
              width: "80%",
              height: "80%",
              border: "none",
              outline: "none",
              fontSize: "25px",
            }}
          />
        ),
      },
      {
        id: actions.drag,
        icons: <Drag />,
      },
      {
        id: actions.Clear,
        icons: (
          <Clear
            data-tooltip-id="color"
            data-tooltip-content="Reset the canvas"
            data-tooltip-place="right"
            style={{
              color: darkMode ? "#ada69c" : "#5d5d5d",
              width: "80%",
              height: "80%",
              border: "none",
              outline: "none",
              fontSize: "25px",
            }}
          />
        ),
      },
      {
        id: actions.upload,
        icons: (
          <FaUpload
            data-tooltip-id="color"
            data-tooltip-content="Upload"
            data-tooltip-place="right"
            style={{
              color: darkMode ? "#ada69c" : "#5d5d5d",
              width: "80%",
              height: "80%",
              border: "none",
              outline: "none",
              fontSize: "25px",
            }}
          />
        ),
      },
      {
        id: actions.text,
        icons: (
          <MdTextIncrease
            data-tooltip-id="color"
            data-tooltip-content="Text"
            data-tooltip-place="right"
            style={{
              color: darkMode ? "#ada69c" : "#5d5d5d",
              width: "80%",
              height: "80%",
              border: "none",
              fontSize: "25px",
              outline: "none",
            }}
          />
        ),
      },
      {
        id: actions.group,
        icons: (
          <FaObjectGroup
            data-tooltip-id="color"
            data-tooltip-content="Group"
            data-tooltip-place="right"
            style={{
              color: darkMode ? "#ada69c" : "#5d5d5d",
              width: "80%",
              height: "80%",
              border: "none",
              fontSize: "25px",
              outline: "none",
            }}
          />
        ),
      },
    ];
    return drawData;
  }

  // extra shapes for bottom nav
  function extraShapes() {
    const extraShapes = [
      // {
      //   id: actions.duplicate,
      //   icons: (
      //     <MdLibraryAdd
      //       title="duplicate"
      //       fill={darkMode ? "#ada69c" : "#5d5d5d"}
      //       style={{
      //         width: "80%",
      //         height: "80%",
      //         border: "none",
      //         fontSize: "20px",
      //         outline: "none",
      //       }}
      //     />
      //   ),
      // },
      {
        id: actions.copy,
        icons: (
          <FaCopy
            title="copy"
            fill={darkMode ? "#ada69c" : "#5d5d5d"}
            style={{
              width: "80%",
              height: "80%",
              border: "none",
              fontSize: "20px",
              outline: "none",
            }}
          />
        ),
      },
      {
        id: actions.paste,
        icons: (
          <FaPaste
            title="paste"
            fill={darkMode ? "#ada69c" : "#5d5d5d"}
            style={{
              width: "80%",
              height: "80%",
              border: "none",
              fontSize: "20px",
              outline: "none",
            }}
          />
        ),
      },
      {
        id: actions.vertical,
        icons: (
          <PiFlipVerticalThin
            title="Flip vertically"
            fill={darkMode ? "#ada69c" : "#5d5d5d"}
            style={{
              width: "80%",
              height: "80%",
              border: "none",
              fontSize: "20px",
              outline: "none",
            }}
          />
        ),
      },
      {
        id: actions.horizontal,
        icons: (
          <PiFlipHorizontalThin
            title="Flip horizontally "
            fill={darkMode ? "#ada69c" : "#5d5d5d"}
            style={{
              width: "80%",
              height: "80%",
              border: "none",
              fontSize: "20px",
              outline: "none",
            }}
          />
        ),
      },
    ];
    return extraShapes;
  }
  // -----------------------------------------------------------------------------------

  // -----------------------------tutorial dropdown start---------------------------------------
  const [tutorialClick, setTutorialClick] = useState(false); // for toggle the tutorial container
  // -----------------------------tutorial dropdown end-----------------------------------------

  // useEffect for assigning the width and height for xy line
  useEffect(() => {
    setPoint({
      x: currentlyDrawnShap?.x || currentlyDrawnCircle?.x,
      y: currentlyDrawnShap?.y || currentlyDrawnCircle?.y,
      height: currentlyDrawnShap?.height || 600,
      width: currentlyDrawnShap?.width || 600,
      radius: currentlyDrawnCircle?.radius,
    });
  }, [
    (currentlyDrawnShap?.width, currentlyDrawnShap?.height) ||
      currentlyDrawnCircle?.radius,
  ]);

  // state for handle the right side input, h values
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
    // if (e.evt.deltaY > 0) {
    //   handleZoom(true);
    // } else if (e.evt.deltaY < 0) {
    //   handleZoom(false);
    // }
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

  // function for handle the input filed logic
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
    if (names === "rectangle" || names === "rectangle3") {
      if (drawing.length !== 0 && Stage2ShapeColor) {
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
      } else if (showObRect.length !== 0 && !Stage2ShapeColor) {
        setShowObRect((prev) =>
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
      }
    } else if (names === "circle" || names === "circle3") {
      if (drawCircle.length !== 0 && Stage2ShapeColor) {
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
      } else if (showObCircle.length !== 0 && !Stage2ShapeColor) {
        setShowObCirlce((prev) =>
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
      }
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
    } else if (names === "line" || names === "line3") {
      if (drawLine.length !== 0 && Stage2ShapeColor) {
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
      } else if (showObLine.length !== 0 && !Stage2ShapeColor) {
        setShowObLine((prev) =>
          prev.map((d) =>
            d.id === ids
              ? { ...d, strokeWidth: strokeWidth, fill: fill, stroke: stroke }
              : d
          )
        );
      }
    } else if (names === "polygon" || names === "polygon3") {
      if (drawPolygon.length !== 0 && Stage2ShapeColor) {
        setDrawPolygon((prev) =>
          prev.map((d) =>
            d.id === ids
              ? { ...d, strokeWidth: strokeWidth, stroke: stroke, fill: fill }
              : d
          )
        );
      } else if (showObPoly.length !== 0 && !Stage2ShapeColor) {
        setShowObpoly((prev) =>
          prev.map((d) =>
            d.id === ids
              ? { ...d, strokeWidth: strokeWidth, stroke: stroke, fill: fill }
              : d
          )
        );
      }
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
    } else if (names === "group") {
      setShowGroup((prev) =>
        prev.map((d) =>
          d.id === ids
            ? {
                ...d,
                fill: fill,
                height: height,
                width: width,
                strokeWidth: strokeWidth,
                stroke: stroke,
              }
            : d
        )
      );
    }
  }, [currentValue]);

  // function for handle the perticular shape click
  function handleSelect(id, name) {
    if (name === "rectangle" || name === "rectangle3") {
      if (
        drawing.length !== 0 &&
        Stage2ShapeColor === true &&
        name !== "rectangle3"
      ) {
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
      } else if (
        showObRect.length !== 0 &&
        !Stage2ShapeColor &&
        name === "rectangle3"
      ) {
        let Id, nm, height, width, stroke, fill, strokeWidth;
        const subStageShape = showObRect.find((d) => d.id === id);
        Id = subStageShape["id"];
        nm = subStageShape["name"];
        height = subStageShape["height"];
        width = subStageShape["width"];
        stroke = subStageShape["stroke"];
        fill = subStageShape["fill"];
        strokeWidth = subStageShape["strokeWidth"];
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
      }
    } else if (name === "circle" || name === "circle3") {
      if (
        drawCircle.length !== 0 &&
        Stage2ShapeColor === true &&
        name !== "circle3"
      ) {
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
      } else if (
        showObCircle.length !== 0 &&
        !Stage2ShapeColor &&
        name === "circle3"
      ) {
        let Id, nm, height, width, stroke, fill, radius, strokeWidth;
        const subStageShape = showObCircle.find((d) => d.id === id);
        Id = subStageShape["id"];
        nm = subStageShape["name"];
        radius = subStageShape["radius"];
        fill = subStageShape["fill"];
        strokeWidth = subStageShape["strokeWidth"];
        stroke = subStageShape["stroke"];
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
      }
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
    } else if (name === "line" || name === "line3") {
      if (
        drawLine.length !== 0 &&
        Stage2ShapeColor === true &&
        name !== "line3"
      ) {
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
      } else if (
        showObLine.length !== 0 &&
        !Stage2ShapeColor &&
        name === "line3"
      ) {
        let Id, nm, height, width, stroke, fill, radius, strokeWidth;
        const subStageShape = showObLine.find((d) => d.id === id);
        Id = subStageShape["id"];
        nm = subStageShape["name"];
        strokeWidth = subStageShape["strokeWidth"];
        stroke = subStageShape["stroke"];
        setCurrentShape(name);
        setSideBar({
          name: name,
          strokeWidth: strokeWidth,
          radius: "0",
          height: "0",
          width: "0",
          fill: "0",
          stroke: stroke,
        });
      }
    } else if (name === "polygon" || name === "polygon3") {
      if (
        drawPolygon.length !== 0 &&
        Stage2ShapeColor === true &&
        name !== "polygon3"
      ) {
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
      } else if (
        showObPoly.length !== 0 &&
        !Stage2ShapeColor &&
        name === "polygon3"
      ) {
        let Id, nm, height, width, stroke, fill, radius, strokeWidth;
        const subStageShape = showObPoly.find((d) => d.id === id);
        Id = subStageShape["id"];
        nm = subStageShape["name"];
        fill = subStageShape["fill"];
        stroke = subStageShape["stroke"];
        strokeWidth = subStageShape["strokeWidth"];
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
    } else if (name === "group") {
      let totalShape = ShowGroup.find((d) => d.id === id);
      let name = totalShape["name"];
      let height = totalShape["height"];
      let width = totalShape["width"];
      let stroke = totalShape["stroke"];
      let strokeWidth = totalShape["strokeWidth"];
      let fill = totalShape["fill"];
      setCurrentShape(name);
      setSideBar({
        name: name,
        strokeWidth: "0",
        radius: "0",
        height: height,
        opacity: "0",
        width: width,
        fill: fill,
        stroke: stroke,
        text: "",
        strokeWidth: strokeWidth,
      });
    }
  }

  // useEffect for pushing the image in to an array(-----------IMAGE---------)
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
    setShowGroup([]);
    setShowSingleRect([]);
    setShowObRect([]);
    setShowObCirlce([]);
    setShowObLine([]);
    setShowObpoly([]);
  }

  // function for handle the transformer mouse down in shape components
  function handleTransformetMouseDown(e, id, name, multiSel) {
    if (btnName === actions.select) {
      const transformerNode = e.currentTarget;
      if (
        (multiSel === undefined &&
          Array.isArray(multiSel) === false &&
          stageVisible === false) ||
        stageVisible
      ) {
        transformerRef.current.nodes([transformerNode]);
        setDuplicateSelectedId(id);
        setSideBarView(true);
        setDown(true);
        setIdName((prev) => ({ ...prev, id: id, Name: name }));
        handleSelect(id, name);
      } else if (Array.isArray(multiSel) === true && stageVisible === false) {
        transformerRef.current.shouldOverdrawWholeArea(true);
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

  // stage 2 polygon circle onClick
  function handleCircleClick() {
    if (obPoly["points"].length > 4) {
      setStage2PolygonClosed(true); // for tracking the circle polygon  for stage2 is clicked or not
      setObPoly((prev) => ({ ...prev, closed: true }));
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

  // useEffect for pushing the stage 2 polygon to the array
  useEffect(() => {
    if (Object.keys(obPoly).length > 0) {
      if (obPoly["points"].length > 4) {
        setShowObpoly((prev) => [...prev, obPoly]);
        setObPoly({});
      }
    }
    setStage2PolygonClosed(false);
  }, [stage2PolyClosed]);

  // onStageMouseDown
  function onStageMouseDown(e) {
    blueLayerRef.current = true;
    if (btnName === actions.select && blueLayerRef.current) {
      setDraggable(false);
      setBtn("default");
      let position = e.target.getStage().getRelativePointerPosition();
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
      isPaint.current = false;
      setDraggable(false);
      setBtn("default");
      blueLayerRef.current = false;
      let pos = e.target.getStage().getRelativePointerPosition();
      let x = pos.x || 0;
      let y = pos.y || 0;
      setCurrentlyDrawnShape((pre) => ({
        ...pre,
        id: uuidv4(),
        x,
        y,
        type: "Rectangle",
        name: btnName,
        width: 1,
        height: 1,
        fill: sideBar.fill ? sideBar.fill : "lightgrey",
        stroke: sideBar.stroke ? sideBar.stroke : "black",
        strokeWidth: 1,
        rotation: 0,
      }));
    } else if (btnName === actions.circle) {
      setDraggable(false);
      setBtn("default");
      isPaint.current = true;
      let pos = e.target.getStage().getRelativePointerPosition();
      let x = pos.x || 0;
      let y = pos.y || 0;
      setCurrentlyDrawnCircle({
        id: uuidv4(),
        x: x,
        y: y,
        type: "Circle",
        name: btnName,
        radius: 1,
        fill: sideBar.fill || "lightgrey",
        stroke: sideBar.stroke || "#000000",
        strokeWidth: 1,
        rotation: 0,
      });
    } else if (btnName === actions.scribble) {
      setDraggable(false);
      setBtn("default");
      isPaint.current = true;
      let pos = e.target.getStage().getRelativePointerPosition();
      let x = pos.x || 0;
      let y = pos.y || 0;
      setScribble({
        id: uuidv4(),
        name: btnName,
        type: "Path",
        points: [x, y, x, y],
        stroke: sideBar.stroke || "#000000",
        fill: sideBar.fill || "lightgray",
        strokeWidth: 5,
        lineCap: "round",
        lineJoin: "round",
        rotation: 0,
      });
    } else if (btnName === actions.line) {
      setDraggable(false);
      setBtn("default");
      isPaint.current = true;
      let pos = e.target.getStage().getRelativePointerPosition();
      let x = pos.x || 0;
      let y = pos.y || 0;
      setLines({
        id: uuidv4(),
        name: btnName,
        type: "Line",
        points: [x, y, x, y],
        stroke: sideBar.stroke || "#000000",
        fill: sideBar.fill || "lightgray",
        strokeWidth: 5,
        lineJoin: "round",
        rotation: 0,
      });
    } else if (btnName === actions.polygon) {
      setDraggable(false);
      setBtn("default");
      if (!isComplete) {
        let pos = e.target.getStage().getRelativePointerPosition();
        let x = pos.x || 0;
        let y = pos.y || 0;
        setPolygons((prev) => ({
          ...prev,
          name: btnName,
          id: uuidv4(),
          type: "Polygon",
          points: Array.isArray(prev?.points) ? [...prev.points, x, y] : [x, y],
          fill: sideBar.fill || "lightgray",
          stroke: sideBar.stroke || "#000000",
          strokeWidth: 1,
          closed: polygons?.closed || false,
          rotation: 0,
        }));
      }
    } else if (btnName === actions.drag) {
      setBtn("grabbing");
      setMouseDown(true);
      setDraggable(true);
    } else if (btnName === actions.text) {
      let pos = e.target.getStage().getRelativePointerPosition();
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
    } else if (btnName === actions.group) {
      setShowGroup((prev) => [...prev, group]);
    } else if (btnName === actions.rectLayer) {
      let pos = e.target.getStage().getRelativePointerPosition();
      let x = pos.x || 0;
      let y = pos.y || 0;
      setDrawSingleRect({
        id: uuidv4(),
        x,
        y,
        name: btnName,
        width: 1,
        height: 1,
        fill: sideBar.fill ? sideBar.fill : "Lightgrey",
        stroke: sideBar.stroke ? sideBar.stroke : "black",
        strokeWidth: 2,
        rotation: 0,
      });
    }
  }

  // onStageMouseMove
  function onStageMouseMove(e) {
    if (btnName === actions.select) {
      if (!selectBox) {
        return;
      }
      if (blueLayerRef.current) {
        let position = e.target.getStage().getRelativePointerPosition();
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
      let pos = e.target.getStage().getRelativePointerPosition();
      let x = pos.x || 0;
      let y = pos.y || 0;

      setCurrentlyDrawnShape((prev) => {
        return { ...prev, width: x - prev.x || 0, height: y - prev.y || 0 };
      });
    } else if (btnName === actions.circle) {
      let pos = e.target.getStage().getRelativePointerPosition();
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
      let pos = e.target.getStage().getRelativePointerPosition();
      let x = pos.x || 0;
      let y = pos.y || 0;
      setScribble((prev) => ({
        ...prev,
        points: [...(prev.points || []), x, y],
      }));
    } else if (btnName === actions.line) {
      let pos = e.target.getStage().getRelativePointerPosition();
      let x = pos.x || 0;
      let y = pos.y || 0;
      setLines({
        ...lines,
        points: [lines?.points?.[0] || 0, lines?.points?.[1] || 0, x, y],
      });
    } else if (btnName === actions.polygon) {
      if (!isComplete) {
        let pos = e.target.getStage().getRelativePointerPosition();
        let x = pos.x || 0;
        let y = pos.y || 0;
        setNextPoints({ x: x, y: y });
      }
    } else if (btnName === actions.drag) {
      setDraggable(true);
    } else if (btnName === actions.group) {
      let pos = e.target.getStage().getRelativePointerPosition();
      let x = pos.x;
      let y = pos.y;
      setGroup({
        x: x,
        y: y,
        id: uuidv4(),
        name: btnName,
        fill: sideBar.fill || "#F2F2F2",
        stroke: sideBar.stroke || "F2F2F2",
        height: 100,
        width: 100,
        strokeWidth: 3,
      });
    } else if (btnName === actions.rectLayer) {
      let pos = e.target.getStage().getRelativePointerPosition();
      let x = pos.x || 0;
      let y = pos.y || 0;
      setDrawSingleRect((pre) => ({
        ...pre,
        width: x - pre.x || 0,
        height: y - pre.y || 0,
      }));
    }
  }

  // onStageMouseOut
  function onStageMouseOut(e) {
    blueLayerRef.current = false;
    let stage = e.target.getStage();
    setMouseDown(false);
    if (btnName === actions.select && ht > 10 && wd > 10) {
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
      let rectangleShape = stage.find(".rectangle");
      let circleShape = stage.find(".circle");
      let polygon = stage.find(".polygon");

      var box = selectionArrowRef.current.getClientRect(); // blue color slected layer
      let shapes = [...rectangleShape, ...circleShape, ...polygon];
      var selected = shapes.filter((shape) =>
        Konva.Util.haveIntersection(box, shape.getClientRect())
      );
      handleTransformetMouseDown(
        e,
        selectBox["id"],
        selectBox["name"],
        selected
      );
    } else if (btnName === actions.rectangle) {
      isPaint.current = false;
      if (
        Math.abs(currentlyDrawnShap["width"]) > 5 &&
        Math.abs(currentlyDrawnShap["height"]) > 5
      ) {
        setDrawing((prev) => [...prev, currentlyDrawnShap]);
      }
      setCurrentlyDrawnShape({}); // resetting the currently drawn shape
    } else if (btnName === actions.circle) {
      isPaint.current = false;
      if (currentlyDrawnCircle["radius"] > 5) {
        setDrawCircle((prev) => [...prev, currentlyDrawnCircle]);
      }
      setCurrentlyDrawnCircle({}); // resetting the currently drawn circle shape
    } else if (btnName === actions.scribble) {
      if (scribble["points"].length > 20) {
        setDrawScribble((prev) => [...prev, scribble]);
      }
      setScribble({}); // resetting the currently drawn scribble shape
    } else if (btnName === actions.line) {
      setDrawLine((prev) => [...prev, lines]);
      setLines({});
    } else if (btnName === "drag") {
      setBtn("grab");
    } else if (btnName === "text") {
      setDrawText((prev) => [...prev, text]);
      setText({});
    } else if (btnName === "group") {
      setGroup({});
    } else if (btnName === "rectLayer") {
      if (drawsingleRect["width"] > 20 && drawsingleRect["height"] > 20) {
        setShowSingleRect((pre) => [...pre, drawsingleRect]);
      }
      setDrawSingleRect({});
    }
  }

  // Function for handle the whille clicking outside the tranform should be unselect
  function transformUnSelect(e) {
    if (e.target === stageRef.current) {
      if (transformerRef.current) {
        setDown(false);
        transformerRef.current.nodes([]);
        setSideBarView(false);
      }
    } else {
      return;
    }
  }

  // function for handleStageVisble
  function handleStageVisble(e) {
    setStageVisible(true);
    localStorage.setItem("shape", JSON.stringify(true));
    setBtnEnable(true);
    setStage2ShapeColor(false);
    setDragHappens(false); //------------------------------------------------------------------
    // setListern(true);
  }

  // function for handle the exit logic
  function handleExit() {
    let res;
    res = localStorage.setItem("btnenable", JSON.stringify(false));
    setStageVisible(false);
    setBtnEnable(false);
    setStage2ShapeColor(true);
    setDragHappens(true); //------------------------------------------------------------------
    localStorage.removeItem("singleRectColor");
  }

  const contextValue = {
    tutorialClick,
    setTutorialClick,
    extraShapes,
    shapeCollection,
    darkModeValue,
    setDarkModeValue,
    closeBottomNav,
    setCloseBottomNav,
    cancelIconColor,
    setCancelIconColor,
    eyeColor,
    setEyeColor,
    darkMode,
    setDarkMode,
    entireDupShape,
    duplicateSelectedId,
    setDuplicateSelectedId,
    oppositAngle,
    angle,
    setAngle,
    isFlipped,
    setIsFlipped,
    handleVerticalFlip,
    previewImage,
    setPreviewImage,
    handlePreviwImage,
    preview,
    setPreview,
    handleBottomNavBtn,
    duplicateBtn,
    setDuplicateBtn,
    pasteBtn,
    setPasteBtn,
    copyBtn,
    SetCopyBtn,
    down,
    setDown,
    inc,
    handleZoom,
    scale,
    setScale,
    offset,
    setOffset,
    joystickBtnClick,
    setJoystickBtnClick,
    center,
    size,
    position,
    setPosition,
    transformerRef2,
    Stage2ShapeColor,
    setStage2ShapeColor,
    showObLine,
    setShowObLine,
    obLine,
    setObLine,
    handleCircleClick,
    showObPoly,
    setShowObpoly,
    stage2PolyClosed,
    setStage2PolygonClosed,
    nextStage2Points,
    setStage2Points,
    obPoly,
    setObPoly,
    PolyStage2Complete,
    setPolyStage2Complete,
    showObCircle,
    setShowObCirlce,
    obCir,
    setObCir,
    showObRect,
    setShowObRect,
    obRect,
    setObRect,
    shapeColor,
    setShapeColor,
    handleExit,
    btnEnablen,
    setBtnEnable,
    drawsingleRect,
    setDrawSingleRect,
    showSingleRect,
    setShowSingleRect,
    handleStageVisble,
    stageVisible,
    setStageVisible,
    point,
    ShowGroup,
    setShowGroup,
    group,
    blueLayerRef,
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
    setDisble,
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
    rectMouseDown,
    setRectMouseDown,
    singleRectRef,
    dragHappen,
    setDragHappens,
    listern,
    setListern,
    polyRef,
    rectRef,
    cirRef,
    lineRef,
    shape,
    setShape,
  };

  return (
    <globalStore.Provider value={contextValue}>{children}</globalStore.Provider>
  );
};

export default StoreContext;
