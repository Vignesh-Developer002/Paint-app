import React, { useCallback, useContext, useState } from "react";
import "../RightSideShapeDt/RightSideShape.css";
import StrokeColor, { FillColor } from "../../Actions/Action";
import { globalStore } from "../../StoreContext/StoreContext";
import { Label } from "react-konva";
import { IoCloudUploadOutline } from "react-icons/io5";

const RightSideShape = () => {
  const {
    sideBar,
    handleInputValue,
    currentShap,
    idName,
    sideBarView,
    btnName,
    image,
    setImage,
    disable,
    setDisable,
  } = useContext(globalStore);

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
  console.log(sideBar.opacity);
  if (sideBar.opacity <= 100) {
    setDisable(false);
  }
  if (sideBar.opacity >= 100) {
    setDisable(true);
  } else {
    setDisable(false);
  }

  return (
    <>
      {((idName.id && idName.Name && sideBarView) || btnName === "image") && (
        <div className="right-side-container">
          <div className="inner-content">
            <h1 className="heading">
              {currentShap ? currentShap.toUpperCase() : ""}
            </h1>
            {/* flex-column */}
            <div className="main-content">
              {idName.Name !== "image" && btnName !== "image" && (
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

              {idName.Name === "circle" && btnName !== "image" ? (
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
              {idName.Name === "rectangle" || idName.Name == "image" ? (
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
                  <hr />
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
  );
};

export default RightSideShape;
