import React from "react";

const ImagePreview = ({ image, height, onDelete, mainImage = null }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(image);
  };
  return (
    // <div className=".img-slider-continer">
    <div
      style={{ height: `${height}px` }}
      className={`img-slider-slide ${mainImage !== null ? "outer-image" : ""}`}
    >
      <img
        src={URL.createObjectURL(image)}
        alt="Preview"
        style={{ height: `100%`, objectFit: "contain" }}
      />
      <button
        className="img-slider-btn"
        onClick={handleDelete}
        // style={{

        // }}
      >
        <i className="fa-solid fa-trash-can"></i>
      </button>
    </div>
  );
};

export default ImagePreview;
