import "./View.css";
import "./popupView.css";
import featuresByType from "../../featuers";
import Media from "react-media";

import ImagesSlider from "./imagesSlider/ImagesSlider";
import { forwardRef, useContext, useEffect, useState } from "react";
import { DataContext } from "../Context";

import Image from "../Card/CardImage";
import { useTranslation } from "react-i18next";
import activitiesByType from "../../activitiesByType";

const AdditionalFeatures = ({ title, labelLookup, data }) => {
  // Check if there is at least one non-null value

  const language = localStorage.getItem("lang");
  const hasNonNullFeature =
    data.feature[0] &&
    Object.keys(data.feature[0]).some(
      (key) =>
        key !== "id" && key !== "task_id" && data.feature[0][key] !== null,
    );

  return (
    <div>
      {hasNonNullFeature &&
        (() => {
          const features = Object.keys(data.feature[0]).filter(
            (key) => data.feature[0][key] !== null && key.startsWith("feature"),
          );

          return (
            <div className="view-additional-features">
              <h1>
                {/* {language === "ar" ? "مميزات اضافية" : "Additional Features"} */}
                {title}
              </h1>
              <div className="view-features">
                <ul className="feature-list">
                  {features.map((key, index) => {
                    const featureValue = data.feature[0][key];
                    const labels = labelLookup[featureValue] || {
                      enLabel: "Unknown Feature",
                      arLabel: "ميزة غير معروفة",
                    };
                    const label =
                      language === "ar" ? labels.arLabel : labels.enLabel;
                    return <li key={index}>{label}</li>;
                  })}
                </ul>
              </div>
            </div>
          );
        })()}
    </div>
  );
};

// export default AdditionalFeatures;

const View = forwardRef(({ ...props }, ref) => {
  const [t, i18n] = useTranslation();

  const Type = ["housing", "industrial", "coastal", "commercial", "land"];
  const TypeAr = ["سكني", "صناعي", "ساحلي", "تجاري", "ارض"];

  const darkMode = useContext(DataContext).darkMode;
  const data = ref.current;
  console.log("data: ", data);

  const [openView, setOpenView] = useState(false);
  // console.log(data);

  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Phone number copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  if (data.img[0]) {
    console.log(data.img);
  }

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formattedPrice = formatPrice(data.payment?.price || 0);

  const labelLookup = {};
  Object.values(featuresByType)
    .flat()
    .forEach((feature) => {
      labelLookup[feature.value] = {
        enLabel: feature.enLabel,
        arLabel: feature.arLabel,
      };
    });

  function handleOpenView(e) {
    setOpenView(e);
  }
  useEffect(() => {
    if (data.viewOpen) {
      setOpenView(true);
    }
  }, [data]);

  const activity = activitiesByType[data.type].find((activity) => {
    return +data.activity === activity.value;
  })?.label
  return (
    <div
      key="card-view"
      className={`my-view ${openView && "popup-view"} ${darkMode && "dark"}`}
      onClick={() => {}}
    >
      <Media
        queries={{
          small: "(max-width: 768)",
          medium: "(max-width: 1255px)",
          large: "(min-width: 1256px)",
        }}
      >
        {(matches) => (
          <>
            {/* {matches.small && <p>I am small!</p>} */}
            {matches.medium && (
              <div className="close-view">
                {openView && (
                  <button onClick={() => handleOpenView(false)}>close</button>
                )}
              </div>
            )}
          </>
        )}
      </Media>
      <div className="view">
        {data && (
          <>
            <div className="dep-images">
              {data.img[0] && <ImagesSlider images={data.img} />}
            </div>
            <div className="dep-details">
              <div className="dep-heading">
                <h3>
                  {" "}
                  <i className="fa-solid fa-map-location-dot"></i>{" "}
                  {data.address}
                </h3>
                <h5>
                  {/* {TypeAr[Type.indexOf(data.type)]} */}
                  {t(`card.type.${data.type}`)}: {t(`activities.${data.type}.${activity}`)}

                </h5>
              </div>
              <div className="prices">
                {/* <h3>price: {data.payment.price} L.E</h3> */}
                {/* <h3> {data.payment.price} :السعر</h3> */}
                {/* <h3> السعر: {data.payment.price}</h3> */}
                <h3>
                  {" "}
                  {t("view.priceLabel")} {formattedPrice}
                </h3>
              </div>
              <div className="features">
                {data.bedrooms ? (
                  <span>
                    <i className="fa-solid fa-bed"></i> {data.bedrooms}:
                    {t("card.bedrooms")}
                  </span>
                ) : null}
                {data.bathrooms ? (
                  <span>
                    <i className="fa-solid fa-bath"></i> {data.bathrooms}
                    {t("card.bathrooms")}
                  </span>
                ) : null}
                {data.size ? (
                  <span>
                    <i alt="المساحة" className="fa-solid fa-ruler-combined"></i> {data.size} {t("card.size")}
                  </span>
                ) : null}
              </div>
              <div className="description">
                {/* <h1>Properties details</h1> */}
                <h1>تفاصيل العقار</h1>
                <p>{data.description}</p>
              </div>
            </div>

            <AdditionalFeatures
              labelLookup={labelLookup}
              data={data}
              language={"ar"}
            />
            <div className="user-info">
              <div className="user-img">
                {data.user.profile_pic ? (
                  <img
                    src={`https://app.having.market/public/images/profile/${data.user.profile_pic}`}
                    alt=""
                  />
                ) : (
                  <i className="fa-solid fa-user"></i>
                )}
              </div>
              <div className="user-data">
                <h3 className="owner-name">{data.user.name}</h3>
                <p>{data.user.email}</p>
              </div>
              <div className="user-contact-btn">
                <div className="card-btns">
                  {/* <button className='card-phone-btn'>
              <i class="fa-brands fa-whatsapp"></i>
            </button> */}
                  <a
                    href={`https://wa.me/${data.user.phone}`}
                    className="card-whatsapp-btn"
                  >
                    <i className="fa-brands fa-whatsapp"></i>
                  </a>
                  {/* <a className='card-phone-btn' onClick={() => setShowPhoneNumber(prev => !prev)}>
              {showPhoneNumber?
              data.user.phone : <i className="fa-solid fa-phone"></i>}
            </a> */}
                  <a
                    className="card-phone-btn"
                    onClick={() => {
                      setShowPhoneNumber((prev) => !prev);
                      if (!showPhoneNumber) copyToClipboard(data.user.phone);
                    }}
                  >
                    {showPhoneNumber ? (
                      data.user.phone
                    ) : (
                      <i className="fa-solid fa-phone"></i>
                    )}
                  </a>
                  {/* <button className='card-mail-btn'> */}
                  <a
                    className="card-mail-btn"
                    href={`mailto:${data.user.email}}`}
                  >
                    <i className="fa-solid fa-envelope"></i>
                  </a>
                  {/* </button> */}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
});

// const View = forwardRef(({ ...props }, ref) => {
//   const { t, i18n } = useTranslation();
//   // console.log(t("view.additionalFeaturesTitle"));

//   const Type = ["housing", "industrial", "coastal", "commercial", "land"];
//   const TypeAr = ["سكني", "صناعي", "ساحلي", "تجاري", "ارض"];

//   const darkMode = useContext(DataContext).darkMode;
//   const data = ref.current;

//   const [showPhoneNumber, setShowPhoneNumber] = useState(false);
//   const copyToClipboard = (text) => {
//     navigator.clipboard
//       .writeText(text)
//       .then(() => {
//         alert(t("view.copyPhoneSuccess"));
//       })
//       .catch((err) => {
//         console.error(t("view.copyPhoneError"), err);
//       });
//   };

//   const formatPrice = (price) => {
//     return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   };

//   const formattedPrice = formatPrice(data.payment?.price || 0);

//   const labelLookup = {};
//   Object.values(featuresByType)
//     .flat()
//     .forEach((feature) => {
//       labelLookup[feature.value] = {
//         enLabel: feature.enLabel,
//         arLabel: feature.arLabel,
//       };
//     });

//   return (
//     <div className="popup-view">
//       <div
//         style={i18n.language == "ar" ? { direction: "rtl" } : {}}
//         key="card-view"
//         className={`my-view ${darkMode && "dark"}`}
//         onClick={() => {}}
//       >
//         {data && (
//           <>
//             <div className="dep-images">
//               {data.img[0] && <ImagesSlider images={data.img} />}
//             </div>
//             <div
//               className="dep-details"
//               // style={i18n.language == "ar" ? { direction: "rtl" } : {}}
//             >
//               <div className="dep-heading">
//                 <h3>
//                   <i className="fa-solid fa-map-location-dot"></i>{" "}
//                   {data.address}
//                 </h3>
//                 <h5>
//                   {t(`card.type.${data.type}`)}: {props.activities}
//                 </h5>
//               </div>
//               <div className="prices">
//                 <h3>
//                   {t("view.priceLabel")} {formattedPrice}
//                 </h3>
//               </div>
//               <div className="features">
//                 {data.bedrooms ? (
//                   <span>
//                     <i className="fa-solid fa-bed"></i> {data.bedrooms}{" "}
//                     {t("view.bedroomsLabel")}
//                   </span>
//                 ) : null}
//                 {data.bathrooms ? (
//                   <span>
//                     <i className="fa-solid fa-bath"></i> {data.bathrooms}{" "}
//                     {t("view.bathroomsLabel")}
//                   </span>
//                 ) : null}
//                 {data.size ? (
//                   <span>
//                     <i
//                       alt={t("view.sizeLabel")}
//                       className="fa-solid fa-ruler-combined"
//                     ></i>{" "}
//                     {data.size} {t("view.sizeLabel")}
//                   </span>
//                 ) : null}
//               </div>
//               <div className="description">
//                 <h1>{t("view.descriptionTitle")}</h1>
//                 <p>{data.description}</p>
//               </div>
//             </div>

//             <AdditionalFeatures
//               title={t("view.additionalFeaturesTitle")}
//               labelLookup={labelLookup}
//               data={data}
//             />
//             <div className="user-info">
//               <div className="user-img">
//                 {data.user.profile_pic ? (
//                   <img
//                     src={`https://app.having.market/public/images/profile/${data.user.profile_pic}`}
//                     alt={t("view.userProfileAlt")}
//                   />
//                 ) : (
//                   <i className="fa-solid fa-user">
//                     {/* {t("view.userProfileDefault")} */}
//                   </i>
//                 )}
//               </div>
//               <div className="user-data">
//                 <h3 className="owner-name">{data.user.name}</h3>
//                 <p>
//                   {t("view.emailLabel")}: {data.user.email}
//                 </p>
//               </div>
//               <div className="user-contact-btn">
//                 <div className="card-btns">
//                   <a
//                     href={`https://wa.me/${data.user.phone}`}
//                     className="card-whatsapp-btn"
//                   >
//                     <i className="fa-brands fa-whatsapp"></i>{" "}
//                     {/* {t("card.buttons.whatsapp")} */}
//                   </a>
//                   <a
//                     className="card-phone-btn"
//                     onClick={() => {
//                       setShowPhoneNumber((prev) => !prev);
//                       if (!showPhoneNumber) copyToClipboard(data.user.phone);
//                     }}
//                   >
//                     {showPhoneNumber ? (
//                       data.user.phone
//                     ) : (
//                       <i className="fa-solid fa-phone"></i>
//                     )}
//                   </a>
//                   <a
//                     className="card-mail-btn"
//                     href={`mailto:${data.user.email}`}
//                   >
//                     <i className="fa-solid fa-envelope"></i>{" "}
//                     {/* {t("card.buttons.email")} */}
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// });

export default View;

// {data.feature[0] &&
//   (() => {
//     const features = Object.keys(data.feature[0]).filter(
//       (key) =>
//         data.feature[0][key] !== null && key.startsWith("feature"),
//     );

//     return (
//       <div className="view-additional-features">
//         {/* <h1>Additional Features</h1> */}
//         <h1>مميزات اضافية</h1>
//         <div className="view-features">
//           <ul className="feature-list">
//             {features.map((key, index) => {
//               const feature = data.feature[0][key];
//               return <li key={index}>{feature}</li>;
//             })}
//           </ul>
//         </div>
//       </div>
//     );
//   })()}
