
import React, { useRef, useState, useEffect } from "react";
import ImageSlider from "../PropertyForm/ImageSlider/ImageSlider";
import "./ImageInput.css";

const ImageInput = ({ formData, onChange, i18n, t }) => {
  const [images, setImages] = useState(formData.image || []);
  const [mainImage, setMainImage] = useState(0);
  const InputRef = useRef();

  useEffect(() => {
    // Notify parent component of image changes
    if (onChange) {
      onChange(images);
      console.log("effect: ", images);
    }
  }, [images]);

  const handleDeleteImage = (imageToDelete) => {
    setImages((prevState) =>
      prevState.filter((image) => image !== imageToDelete),
    );
  };

  const handleChange = (input) => {
    const files = Array.from(input.target.files);

    setImages((prevState) => {
      if (prevState.length > 0) {
        const filteredFiles = files.filter((file) => {
          const isDuplicate = prevState.some(
            (image) => file.size === image.size && file.name === image.name,
          );
          return !isDuplicate;
        });
        return [...prevState, ...filteredFiles];
      }
      return [...prevState, ...files];
    });
  };

  const handleNextImage = () => {
    if (mainImage + 1 < images.length) {
      setMainImage((prev) => prev + 1);
    }
  };

  const handlePrevImage = () => {
    if (mainImage - 1 >= 0) {
      setMainImage((prev) => prev - 1);
    }
  };

  const handleMainImage = () => {
    setImages((prevImages) => {
      if (mainImage === 0) return prevImages; // Already at the first position

      const newImages = [...prevImages];
      const [selectedImage] = newImages.splice(mainImage, 1); // Remove selected image
      newImages.unshift(selectedImage); // Insert at the first position
      return newImages;
    });

    setMainImage(0); // Set the mainImage index to 0
  };

  return (
    <div
      className="image-input-form"
      style={i18n.language == "ar" ? { direction: "rtl" } : {}}
    >
      <p className="image-input-title">
        {t("dashboard.addPropertyTab.tab4.content.pictures")}
      </p>
      {images[0] && (
        <div className="main-image-container">
          <div className="prop-main-image">
            <h3 className="image-input-subtitle">
              {t("dashboard.addPropertyTab.tab4.content.coverPictures")}
            </h3>
            <div className="main-image-wrapper">
              <img
                src={URL.createObjectURL(images[mainImage])}
                alt=""
                className="prop-main-image"
              />
            </div>
            <div className="btn-row-image">
              <button
                type="button"
                onClick={handlePrevImage}
                className="image-nav-button"
              >
                {t("dashboard.addPropertyTab.tab4.content.prevPic")}
              </button>
              {mainImage > 0 && (
                <button
                  type="button"
                  onClick={handleMainImage}
                  className="image-nav-button"
                >
                  {t("dashboard.addPropertyTab.tab4.content.apply")}
                </button>
              )}
              <button
                type="button"
                onClick={handleNextImage}
                className="image-nav-button"
              >
                {t("dashboard.addPropertyTab.tab4.content.nextPic")}
              </button>
            </div>
          </div>
        </div>
      )}
      <input
        ref={InputRef}
        type="file"
        name="image"
        onChange={handleChange}
        accept="image/*"
        multiple
        className="file-input"
      />
      <ImageSlider
        mainImage={mainImage}
        images={images}
        height={100}
        onDelete={handleDeleteImage}
      />
      <button
        type="button"
        onClick={() => InputRef.current.click()}
        className="add-images-button"
      >
        {t("dashboard.addPropertyTab.tab4.content.addPic")}
      </button>
    </div>
  );
};

export default ImageInput;
