import React, { useState } from "react";
import ImagePreview from "./ImagePreview"; // Adjust the path as needed
import "./Style.css"; // Adjust the path as needed

const ImageSlider = ({ images, height, onDelete, mainImage = -1 }) => {


  return (
    <div className="img-slider-container">
      <div className="img-slider-wrapper">
        {images?.map((image, index) => (
          <ImagePreview
            key={index}
            mainImage={index === mainImage ? mainImage : null}
            image={image}
            height={height}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
