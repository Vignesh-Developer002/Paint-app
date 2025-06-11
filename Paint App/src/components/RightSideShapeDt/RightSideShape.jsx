import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "../RightSideShapeDt/RightSideShape.css";
import StrokeColor, { FillColor } from "../../Actions/Action";
import { globalStore } from "../../StoreContext/StoreContext";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";

const RightSideShape = () => {
  const {
    fontStyle,
    setFontStyle,
    sideBar,
    handleInputValue,
    currentShap,
    idName,
    sideBarView,
    btnName,
    image,
    setImage,
    disable,
    setDisble,
    setDrawText,
    stageVisible,
    darkMode,
    startTour,
    setSideBar,
    rad,
    setRad,
    handleMouseDown,
  } = useContext(globalStore);

  function handleShapeName(shape) {
    let name;
    if (shape == "rectangle") {
      return (name = shape);
    } else if (shape == "rectangle3") {
      return (name = shape.slice(0, 9));
    } else if (shape === "circle") {
      return (name = shape);
    } else if (shape === "circle3") {
      return (name = shape.slice(0, 6));
    } else if (shape === "scrible") {
      return (name = shape);
    } else if (shape === "line") {
      return (name = shape);
    } else if (shape === "line3") {
      return (name = shape.slice(0, 4));
    } else if (shape === "polygon") {
      return (name = shape);
    } else if (shape === "polygon3") {
      return (name = shape.slice(0, 7));
    } else if (shape === "image") {
      return (name = shape);
    } else if (shape === "text") {
      return (name = shape);
    } else if (shape === "group") {
      return (name = shape);
    }
  }

  let Text = sideBar.text;
  let fontSize = Number(sideBar.fontSize);
  let ids = idName.id;
  let width = Number(sideBar.width);
  let fill = sideBar.fill;

  // function for upload image functionality
  const handleUpload = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const img = new window.Image();
      img.src = imageUrl;
      img.onload = () => {
        setImage(img);
      };
    }
  }, []);

  // logic for disable the input field
  if (sideBar.opacity <= 100) {
    setDisble(false);
  }
  if (sideBar.opacity >= 100) {
    setDisble(true);
  }

  function handleFontStyle(e) {
    let { name } = e.target;
    if (name === "bold") {
      setFontStyle("bold");
    }
    if (name === "italic") {
      setFontStyle("italic");
    }
  }
  // useEffect for when ever the fontstyle state variable changes call the handleChange function
  useEffect(() => {
    handleChange();
  }, [fontStyle]);

  function handleChange() {
    setDrawText((prev) =>
      prev.map((d) =>
        d.id === ids
          ? {
              ...d,
              text: Text,
              fontSize: fontSize,
              width: width,
              fontStyle: fontStyle,
              fill: fill,
            }
          : d
      )
    );
  }
  // ------------------------mouse down functionality ----------------------------------------

  return (
    <>
      {((!stageVisible && idName.Name !== "rectLayer") ||
        (stageVisible && idName.Name !== "rectLayer")) && (
        <>
          {((idName.id && idName.Name && sideBarView) ||
            btnName === "image" ||
            startTour) && (
            <div
              id="rightSideContent"
              className="right-side-container"
              style={{ backgroundColor: darkMode ? "#232628" : "#f5f5f5" }}
            >
              <div className="inner-content">
                <h1 className="heading">
                  {handleShapeName(currentShap)
                    ? handleShapeName(currentShap).toUpperCase()
                    : ""}
                </h1>
                {/* flex-column */}
                <div className="main-content">
                  {idName.Name !== "image" &&
                    btnName !== "image" &&
                    idName.Name !== "text" && (
                      <>
                        <div className="stroke-color">
                          <p>
                            Stroke color :{" "}
                            {sideBar["stroke"]
                              ? `(${sideBar["stroke"]})`
                              : "(No Color Selected)"}
                          </p>
                          <StrokeColor />
                        </div>
                        <hr />
                        {idName.Name !== "scrible" &&
                        idName.Name !== "line" &&
                        idName.Name !== "line3" &&
                        idName.Name !== "rectLayer" ? (
                          <>
                            {" "}
                            <div className="fill-color">
                              <p>
                                Fill color :{" "}
                                {sideBar["fill"]
                                  ? `(${sideBar["fill"]})`
                                  : "(No Color Selected)"}
                              </p>
                              <FillColor />
                            </div>
                            <hr />
                          </>
                        ) : (
                          <></>
                        )}
                        {/* -------------------------------- */}

                        {idName.Name !== "rectLayer" && (
                          <>
                            <div className="stroke-width">
                              <p>Stroke Width :</p>
                              <input
                                type="number"
                                name="strokeWidth"
                                value={sideBar.strokeWidth}
                                onChange={(e) => handleInputValue(e)}
                              />
                            </div>
                            <hr />
                          </>
                        )}

                        {/* -------------------------------- */}
                      </>
                    )}

                  {(idName.Name === "circle" && btnName !== "image") ||
                  idName.Name === "circle3" ? (
                    <div className="circle-radius">
                      <p> Radius :</p>
                      <input
                        type="number"
                        name="radius"
                        value={sideBar.radius}
                        onChange={(e) => handleInputValue(e)}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  {idName.Name === "rectangle" ||
                  idName.Name === "rectangle3" ||
                  idName.Name == "image" ||
                  idName.Name === "group" ? (
                    <>
                      <div className="height">
                        <p>Height :</p>
                        <input
                          type="number"
                          name="height"
                          value={sideBar.height}
                          onChange={(e) => handleInputValue(e)}
                        />
                      </div>
                      <hr />
                      <div className="width">
                        <p>Width :</p>
                        <input
                          type="number"
                          name="width"
                          value={sideBar.width}
                          onChange={(e) => handleInputValue(e)}
                        />
                      </div>

                      {/* <div className="width">
                        <p>Width :</p>
                        <input
                          type="number"
                          name="width"
                          value={sideBar.width}
                          onChange={(e) => handleInputValue(e)}
                          onMouseDown={handleMouseDown}
                          // onMouseMove={(e) => console.log(e.screenX)}
                        />
                      </div> */}
                      <hr />
                      {idName.Name !== "rectangle" &&
                        idName.Name !== "rectangle3" &&
                        idName.Name !== "group" && (
                          <div className="opacity">
                            <p>Opacity :</p>
                            <input
                              type="number"
                              disabled={disable}
                              name="opacity"
                              value={sideBar.opacity}
                              onChange={(e) => handleInputValue(e)}
                            />
                          </div>
                        )}
                    </>
                  ) : (
                    <></>
                  )}

                  {/* for text component */}
                  {idName.Name === "text" ? (
                    <>
                      <div className="fill-color">
                        <p>
                          Fill color :{" "}
                          {sideBar["fill"]
                            ? `(${sideBar["fill"]})`
                            : "(No Color Selected)"}
                        </p>
                        <FillColor />
                      </div>
                      <div className="text">
                        <p>text</p>
                        <input
                          type="text"
                          value={sideBar.text}
                          name="text"
                          onChange={(e) => handleInputValue(e)}
                        />
                      </div>
                      <div className="width">
                        <p>Width :</p>
                        <input
                          type="number"
                          name="width"
                          value={sideBar.width}
                          onChange={(e) => handleInputValue(e)}
                        />
                      </div>
                      <div className="font-size">
                        <p>Font size :</p>
                        <input
                          type="number"
                          value={sideBar.fontSize}
                          name="fontSize"
                          onChange={(e) => handleInputValue(e)}
                        />
                      </div>
                      <div className="fontStyle">
                        <p>Font Style :</p>
                        <div className="btns">
                          <button
                            name="bold"
                            className={
                              fontStyle === "bold" ? "bgGrey" : "white"
                            }
                            onClick={(e) => handleFontStyle(e)}
                          >
                            B{/* <FaBold /> */}
                          </button>
                          <button
                            name="italic"
                            className={
                              fontStyle === "italic" ? "bgGrey" : "white"
                            }
                            onClick={(e) => handleFontStyle(e)}
                          >
                            I{/* <FaItalic /> */}
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  {btnName === "image" || idName.Name === "image" ? (
                    <>
                      <label
                        htmlFor="upload"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <div className="image-upload">
                          <div className="img-cont">
                            <IoCloudUploadOutline className="UploadImg" />
                          </div>
                          <p>Click to upload image</p>
                        </div>
                      </label>
                      <div className="prev-name">
                        <p>{image ? image["name"] : ""}</p>
                      </div>
                      <input
                        // accept="image/*"
                        id="upload"
                        type="file"
                        onChange={(e) => handleUpload(e)}
                        required
                        hidden
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default RightSideShape;

 
