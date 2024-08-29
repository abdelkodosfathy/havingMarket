// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { useContext } from "react";
// // import './Style.css';
import "./PropertyForm.css";
// import LoadingCircle from "../LoadingCircle/LoadingCircle";
// import Select from "react-select";
// import ImageSlider from "./ImageSlider/ImageSlider";

import React, { useContext, useRef, useState, useTransition } from "react";
import axios from "axios";
import Tab1 from "./Tabs/Tab1";
import Tab2 from "./Tabs/Tab2";
import Tab3 from "./Tabs/Tab3";
import Tab4 from "./Tabs/Tab4";
import LoadingCircle from "../LoadingCircle/LoadingCircle"; // Import your LoadingCircle component
import InputMap from "../InputMap/InputMap";
import { DataContext } from "../Context";
import ImageInput from "../ImageInput/ImageInput";
import { useTranslation } from "react-i18next";
import activitiesByType from "../../activitiesByType";

// const data

//new components
const Location = ({ handleChange, city = null, gover = null }) => {
  const [governorates, setGovernorates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedGovernorate, setSelectedGovernorate] = useState(gover);
  const [selectedCity, setSelectedCity] = useState(city);

  const fetchGovernorates = async () => {
    try {
      const response = await axios.get("https://app.having.market/api/gover");
      if (response.data && Array.isArray(response.data.data)) {
        setGovernorates(response.data.data);
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error fetching governorates:", error);
    }
  };

  const fetchCities = (governorateId) => {
    const selectedGovernorate = governorates.find(
      (gov) => gov.id === governorateId,
    );
    if (selectedGovernorate && Array.isArray(selectedGovernorate.city)) {
      setCities(selectedGovernorate.city);
    } else {
      setCities([]);
    }
  };

  const handleGovernorateChange = (selectedOption) => {
    setSelectedGovernorate(selectedOption);
    setSelectedCity(null); // Reset city when governorate changes
    fetchCities(selectedOption ? selectedOption.value : null);
    handleChange(
      { name: "gover", value: selectedOption ? selectedOption.value : "" },
      true,
    );

    handleChange({ name: "city", value: null }, true); // Ensure city prop is null or empty
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    handleChange(
      { name: "city", value: selectedOption ? selectedOption.value : "" },
      true,
    );
  };

  useEffect(() => {
    fetchGovernorates();
  }, []);

  const governorateOptions = governorates.map((governorate) => ({
    value: governorate.id,
    label: governorate.name,
  }));

  const cityOptions = cities.map((city) => ({
    value: city.id,
    label: city.name,
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "40px",
      borderRadius: "4px",
      borderColor: "#ced4da",
      boxShadow: "none",
      cursor: "pointer",
      "&:hover": {
        borderColor: "#a8b3c4",
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "4px",
      zIndex: 1001,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#007bff" : "#fff",
      color: state.isSelected ? "#fff" : "#000",
      "&:hover": {
        backgroundColor: "#f8f9fa",
        color: "#000",
      },
    }),
  };

  return (
    <div>
      <label>
        المحافظة:
        <Select
          name="gover"
          options={governorateOptions}
          onChange={handleGovernorateChange}
          value={selectedGovernorate}
          placeholder="اختر محافظة"
          isClearable
          styles={customStyles}
        />
      </label>
      <label>
        المدينة:
        <Select
          name="city"
          options={cityOptions}
          onChange={handleCityChange}
          value={selectedCity}
          placeholder="اختر مدينة"
          isClearable
          styles={customStyles}
          isDisabled={!selectedGovernorate}
        />
      </label>
    </div>
  );
};

const Activities = [
  {
    type: {
      en: "commercial",
      ar: "تجاري",
    },
    activities: [
      { en: "super market", ar: "سوبر ماركت" },
      { en: "pharmacy", ar: "صيدلية" },
      { en: "bakery", ar: "مخبز" },
      { en: "vegetables", ar: "خضروات" },
      { en: "another", ar: "آخر" },
    ],
  },
  {
    type: {
      en: "industrial",
      ar: "صناعي",
    },
    activities: [
      { en: "building materials", ar: "مواد البناء" },
      { en: "auto industry (cars)", ar: "صناعة السيارات" },
      { en: "tobacco", ar: "التبغ" },
      { en: "leather", ar: "الجلود" },
      { en: "electronic industries", ar: "الصناعات الإلكترونية" },
      { en: "electrical", ar: "الكهربائية" },
      { en: "chemical", ar: "الكيميائية" },
      { en: "pharmaceutical", ar: "الصيدلانية" },
      { en: "mechanical", ar: "الميكانيكية" },
      { en: "delivery services", ar: "خدمات التوصيل" },
      { en: "another activity", ar: "نشاط آخر" },
      { en: "without", ar: "بدون" },
    ],
  },
  {
    type: { en: "land", ar: "ارض" },
    activities: [
      { en: "residential", ar: "سكني" },
      { en: "commercial", ar: "تجاري" },
      { en: "administrative", ar: "إداري" },
      { en: "entertaining", ar: "ترفيهي" },
      { en: "industrial", ar: "صناعي" },
      { en: "agricultural", ar: "زراعي" },
      { en: "store", ar: "مخزن" },
      { en: "medical", ar: "طبي" },
      { en: "usufruct right", ar: "حق الانتفاع" },
      { en: "coastal", ar: "ساحلي" },
    ],
  },
  {
    type: { en: "housing", ar: "سكني" },
    activities: [
      { en: "apartment", ar: "شقة" },
      { en: "loft", ar: "لوفت" },
      { en: "penthouse", ar: "بنتهاوس" },
      { en: "villa", ar: "فيلا" },
      { en: "castle", ar: "قصر" },
      { en: "town House", ar: "تاون هاوس" },
      { en: "duplex", ar: "دوبلكس" },
      { en: "twin Vill", ar: "فيلا ثؤام" },
      { en: "roof", ar: "روف" },
      { en: "studio", ar: "ستوديو" },
    ],
  },
  {
    type: { en: "coastal", ar: "ساحلي" },
    activities: [
      { en: "chalet", ar: "شاليه" },
      { en: "apartment", ar: "شقة" },
      { en: "loft", ar: "لوفت" },
      { en: "penthouse", ar: "بنتهاوس" },
      { en: "villa", ar: "فيلا" },
      { en: "town House", ar: "تاون هاوس" },
      { en: "duplex", ar: "دوبلكس" },
      { en: "twin Vill", ar: "فيلا ثؤام" },
      { en: "roof", ar: "روف" },
    ],
  },
];

const NumberInputWithButtons = ({
  name,
  value,
  title,
  onChange,
  placeholder,
}) => {
  const handleIncrement = () => {
    const newValue = value === "" ? 0 : parseInt(value, 10);
    onChange({ target: { name, value: newValue + 1, type: "number" } });
  };

  const handleDecrement = () => {
    const newValue = value === "" ? 0 : parseInt(value, 10);
    onChange({
      target: { name, value: newValue > 0 ? newValue - 1 : 0, type: "number" },
    });
  };

  return (
    <div className="number-input">
      <label htmlFor={name}>
        <p>{title}</p>
      </label>
      <button type="button" onClick={handleDecrement}>
        -
      </button>
      <input
        id={name}
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <button type="button" onClick={handleIncrement}>
        +
      </button>
    </div>
  );
};

const PropertyForm = ({ isUpdate, onAddProp }) => {
  const [t, i18n] = useTranslation();
  const loginData = useContext(DataContext).loginState;
  const token = loginData.token;
  const locationRef = useRef();
  const [updating, setUpdating] = useState(isUpdate);
  const [activeTab, setActiveTab] = useState(1);
  // const [validationError, setValidationError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const classes = ["one", "two", "three", "four", "five"];
  const [filteredActivities, setFilteredActivities] = useState([]);

  const [formData, setFormData] = useState({
    address: "",
    type: "",
    size: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
    location: "",
    city: "",
    gover: "",
    image: null,
    activity: "",
    finishing: "",
    feature1: "",
    feature2: "",
    feature3: "",
    price: "",
    action: "",
    floors: "",
    payment: "",
  });

  console.log(formData);

  if (updating !== null && typeof isUpdate === "object") {
    setUpdating(null);
    console.log("aa");
    setFormData((prevFormData) => ({
      ...prevFormData,
      address: isUpdate.address || "",
      type: isUpdate.type || "",
      size: isUpdate.size || "",
      bedrooms: isUpdate.bedrooms || "",
      bathrooms: isUpdate.bathrooms || "",
      description: isUpdate.description || "",
      location: isUpdate.location || "",
      city: isUpdate.city.name || "",
      gover: isUpdate.gover.name || "",
      image: isUpdate.image || null,
      activity: isUpdate.activity || "",
      finishing: isUpdate.finishing || "",
      price: isUpdate.price || "",
      action: isUpdate.action || "",
      floors: isUpdate.floors || "",
      payment: isUpdate.payment || "",
    }));
  }

  const handleChange = (input, isSelect = false) => {
    if (isSelect) {
      // Handle the change from a Select component
      const { name, value } = input;
      console.log("name: ", name);
      console.log("value: ", value);
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));

      // Handle specific logic for `type` field
      // if (name === "type") {

      //   // const newAc = activity[value]
      //   // console.log("new: ", newAc);
        
      //   const selectedType = value;
      //   const activitiesForType = Activities.find(
      //     (activity) => activity.type.en === selectedType,
      //   );
      //   setFilteredActivities(
      //     activitiesForType ? activitiesForType.activities : [],
      //   );
      //   setFormData((prevState) => ({ ...prevState, activity: "" }));
      // }
      if (name === "type") {
        const selectedType = value;
        const activities = activitiesByType[selectedType].slice(1);

        setFilteredActivities(
          // activities ? activities : [],
          activities
        );
        setFormData((prevState) => ({ ...prevState, activity: "" }));
      }
    } else {
      // Handle the change from a normal input
      const { name, value, type, files } = input.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: type === "file" ? files[0] : value,
      }));

      // Handle specific logic for `type` field
      // if (name === "type") {
      //   const selectedType = value;

      //   const activitiesForType = Activities.find(
      //     (activity) => activity.type.en === selectedType,
      //   );
      //   console.log(filteredActivities);
        
      //   setFilteredActivities(
      //     activitiesForType ? activitiesForType.activities : [],
      //   );
      //   setFormData((prevState) => ({ ...prevState, activity: "" }));
      // }
      if (name === "type") {
        const selectedType = value;
        const activities = activitiesByType[selectedType].slice(1);

        setFilteredActivities(
          // activities ? activities : [],
          activities
        );
        setFormData((prevState) => ({ ...prevState, activity: "" }));
      }

      // Handle specific logic for `image` field
      if (name === "image") {
        const files = Array.from(input.target.files);
        setFormData((prevState) => ({
          ...prevState,
          image: files,
        }));
      }
    }
  };

  const handleImageChange = (images) => {
    setFormData((prevState) => ({
      ...prevState,
      image: images,
    }));
  };

  const handleDeleteImage = (imageToDelete) => {
    setFormData((prevState) => ({
      ...prevState,
      image: prevState.image.filter((image) => image !== imageToDelete),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form submit", e);
    setIsLoading(true);
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    console.log(formData);
    try {
      const response = await axios.post(
        "https://app.having.market/api/tasks",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log(response);
      // console.log(response.data);
      onAddProp();
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting form:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    console.log(formData);
    try {
      const response = await axios.patch(
        "https://app.having.market/api/tasks",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log(response);
      // console.log(response.data);
      onAddProp();
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting form:", error);
    }
  };
  const handleNext = (e) => {
    e.preventDefault();
    setActiveTab(activeTab + 1);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setActiveTab(activeTab - 1);
  };

  const changeLocation = (e) => {
    const mapLink = `https://www.google.com/maps?q=${e.lat},${e.lng}`;
    console.log(mapLink);
    setFormData({
      ...formData,
      location: mapLink,
    });
    if (locationRef.current) {
      locationRef.current.value = mapLink;
    }
  };

  return (
    <div className="form-wrapper">
      <form className="property-form" onSubmit={handleSubmit}>
        {isLoading ? (
          <LoadingCircle />
        ) : (
          <>
            <div className={`steps-row ${classes[activeTab - 1]}`}>
              <div id="progress" className={`${classes[activeTab - 1]}`}></div>
              {/* <div className="col" style={activeTab >= 1 ? {color: "white"} : null}>step 1</div>
          <div className="col" style={activeTab >= 2 ? {color: "white"} : null}>step 2</div>
          <div className="col" style={activeTab >= 3 ? {color: "white"} : null}>step 3</div>
          <div className="col" style={activeTab >= 4 ? {color: "white"} : null}>step 4</div> */}
              <div
                className="col"
                style={activeTab >= 1 ? { color: "white" } : null}
              >
                {/* اولا */}
                {t("dashboard.addPropertyTab.tab1.title")}
              </div>
              <div
                className="col"
                style={activeTab >= 2 ? { color: "white" } : null}
              >
                {/* ثانيا */}
                {t("dashboard.addPropertyTab.tab2.title")}
              </div>
              <div
                className="col"
                style={activeTab >= 3 ? { color: "white" } : null}
              >
                {/* ثالثا */}
                {t("dashboard.addPropertyTab.tab3.title")}
              </div>
              <div
                className="col"
                style={activeTab >= 4 ? { color: "white" } : null}
              >
                {/* رابعا */}
                {t("dashboard.addPropertyTab.tab4.title")}
              </div>
              <div
                className="col"
                style={activeTab >= 5 ? { color: "white" } : null}
              >
                {/* خامسا */}
                {t("dashboard.addPropertyTab.tab5.title")}
              </div>
            </div>
            <div className={`form-tabs ${classes[activeTab - 1]}`}>
              <Tab1
                i18n={i18n}
                t={t}
                formData={formData}
                handleChange={handleChange}
                locationRef={locationRef}
                isUpdate={isUpdate}
              />
              <Tab2
                i18n={i18n}
                t={t}
                formData={formData}
                handleChange={handleChange}
                activities={filteredActivities}
                isUpdate={isUpdate}
              />
              <Tab3
                t={t}
                i18n={i18n}
                formData={formData}
                handleChange={handleChange}
                handleDeleteImage={handleDeleteImage}
                isUpdate={isUpdate}
              />
              <ImageInput
                t={t}
                i18n={i18n}
                formData={formData}
                onChange={handleImageChange}
              />
              <Tab4
                i18n={i18n}
                t={t}
                formData={formData}
                handleChange={handleChange}
              />{" "}
            </div>
            <div className="button-row">
              {activeTab === 5 && (
                <button type="submit">{t("common.submit")}</button>
              )}
              {activeTab < 5 && (
                <button onClick={(e) => handleNext(e)} id="next">
                  {/* التالي */}
                  {t("dashboard.addPropertyTab.nextTab")}
                </button>
              )}
              {activeTab > 1 && (
                <button onClick={(e) => handlePrev(e)} id="prev">
                  {/* السابق */}
                  {t("dashboard.addPropertyTab.prevTab")}
                </button>
              )}
            </div>
          </>
        )}
      </form>
      {activeTab === 1 && <InputMap onLocationChange={changeLocation} />}
    </div>
  );
};

export default PropertyForm;
