// // Tab3.js
// import React from "react";
// import ImageSlider from "../ImageSlider/ImageSlider"; // Import your ImageSlider component
// import ImageInput from "../../ImageInput/ImageInput";

// const Tab3 = ({ formData, handleChange, handleDeleteImage, isUpdate, t }) => (
//   <div className="tab-3">
//     <label htmlFor="description">
//       <p>الوصف</p>
//       <textarea
//         id="description"
//         name="description"
//         placeholder="اوصف العقار وصف دقيق"
//         value={formData.description}
//         onChange={handleChange}
//         required
//       />
//     </label>
//     {/* <label>
//       <p>الصور</p>
//       <input
//         type="file"
//         name="image"
//         onChange={handleChange}
//         required
//         accept="image/*"
//         multiple
//         disabled={isUpdate}
//       />
//       <ImageSlider
//         images={formData.image}
//         height={100}
//         onDelete={handleDeleteImage}
//       />
//     </label> */}

//     {/* <ImageInput/> */}

//     <label htmlFor="price">
//       <p>السعر</p>
//       <input
//         type="number"
//         id="price"
//         name="price"
//         placeholder="اكتب سعر العقار"
//         value={formData.price}
//         onChange={handleChange}
//         required
//         disabled={isUpdate}
//       />
//     </label>
//     <div className="radio-row">
//       <div className="radio">
//         <input
//           type="radio"
//           id="sell"
//           name="action"
//           value="0"
//           onChange={handleChange}
//           disabled={isUpdate}
//         />
//         <label className="radio-button" htmlFor="sell">
//           بيع
//         </label>
//       </div>
//       <div className="radio">
//         <input
//           type="radio"
//           id="rent"
//           name="action"
//           value="1"
//           onChange={handleChange}
//           disabled={isUpdate}
//         />
//         <label className="radio-button" htmlFor="rent">
//           ايجار
//         </label>
//       </div>
//     </div>
//     <div className="radio-row">
//       <div className="radio">
//         <input
//           type="radio"
//           id="cash"
//           name="payment"
//           value="cash"
//           onChange={handleChange}
//           disabled={isUpdate}
//         />
//         <label className="radio-button" htmlFor="cash">
//           كاش
//         </label>
//       </div>
//       <div className="radio">
//         <input
//           type="radio"
//           id="installment"
//           name="payment"
//           value="installment"
//           onChange={handleChange}
//           disabled={isUpdate}
//         />
//         <label className="radio-button" htmlFor="installment">
//           تقسيط
//         </label>
//       </div>
//     </div>
//   </div>
// );

// export default Tab3;

// Tab3.js
import React from "react";
import { useTranslation } from "react-i18next";
import ImageSlider from "../ImageSlider/ImageSlider"; // Import your ImageSlider component
import ImageInput from "../../ImageInput/ImageInput";

const Tab3 = ({
  formData,
  handleChange,
  handleDeleteImage,
  isUpdate,
  i18n,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className="tab-3"
      style={i18n.language == "ar" ? { direction: "rtl" } : {}}
    >
      <label htmlFor="description">
        <p>{t("dashboard.addPropertyTab.tab3.content.description")}</p>
        <textarea
          id="description"
          name="description"
          placeholder={t("dashboard.addPropertyTab.tab3.content.description")}
          value={formData.description}
          onChange={handleChange}
          required
        />
      </label>
      {/* Uncomment and adjust if ImageInput is needed */}
      {/* <label>
        <p>{t("dashboard.addPropertyTap.tab3.content.pictures")}</p>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          required
          accept="image/*"
          multiple
          disabled={isUpdate}
        />
        <ImageSlider
          images={formData.image}
          height={100}
          onDelete={handleDeleteImage}
        />
      </label> */}
      {/* <ImageInput /> */}

      <label htmlFor="price">
        <p>{t("dashboard.addPropertyTab.tab3.content.price")}</p>
        <input
          type="number"
          id="price"
          name="price"
          placeholder={t("dashboard.addPropertyTab.tab3.content.price")}
          value={formData.price}
          onChange={handleChange}
          required
          disabled={isUpdate}
        />
      </label>
      <div className="radio-row">
        <div className="radio">
          <input
            type="radio"
            id="sell"
            name="action"
            value="0"
            onChange={handleChange}
            disabled={isUpdate}
          />
          <label className="radio-button" htmlFor="sell">
            {t("dashboard.addPropertyTab.tab3.content.sell")}
          </label>
        </div>
        <div className="radio">
          <input
            type="radio"
            id="rent"
            name="action"
            value="1"
            onChange={handleChange}
            disabled={isUpdate}
          />
          <label className="radio-button" htmlFor="rent">
            {t("dashboard.addPropertyTab.tab3.content.rend")}
          </label>
        </div>
      </div>
      <div className="radio-row">
        <div className="radio">
          <input
            type="radio"
            id="cash"
            name="payment"
            value="cash"
            onChange={handleChange}
            disabled={isUpdate}
          />
          <label className="radio-button" htmlFor="cash">
            {t("dashboard.addPropertyTab.tab3.content.cash")}
          </label>
        </div>
        <div className="radio">
          <input
            type="radio"
            id="installment"
            name="payment"
            value="installment"
            onChange={handleChange}
            disabled={isUpdate}
          />
          <label className="radio-button" htmlFor="installment">
            {t("dashboard.addPropertyTab.tab3.content.installment")}
          </label>
        </div>
      </div>
    </div>
  );
};

export default Tab3;
