// Tab1.js
import Select from "react-select";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import Location from "./Location"; // Import your Location component
const Location = ({ handleChange, city = null, gover = null, t }) => {
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
      marginTop: "5px",
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
        {/* المحافظة: */}
        <p>{t("dashboard.addPropertyTab.tab1.content.governorate.label")}</p>

        <Select
          name="gover"
          options={governorateOptions}
          onChange={handleGovernorateChange}
          value={selectedGovernorate}
          placeholder={t(
            "dashboard.addPropertyTab.tab1.content.governorate.placeholder",
          )}
          isClearable
          styles={customStyles}
        />
      </label>
      <label>
        <p>{t("dashboard.addPropertyTab.tab1.content.city.label")}</p>

        {/* المدينة: */}
        <Select
          name="city"
          options={cityOptions}
          onChange={handleCityChange}
          value={selectedCity}
          placeholder={t(
            "dashboard.addPropertyTab.tab1.content.city.placeholder",
          )}
          isClearable
          styles={customStyles}
          isDisabled={!selectedGovernorate}
        />
      </label>
    </div>
  );
};

const Tab1 = ({ formData, handleChange, locationRef, isUpdate, t, i18n }) => (
  <div
    className="tab-1"
    style={i18n.language == "ar" ? { direction: "rtl" } : {}}
  >
    <label htmlFor="">
      {/* <p>العنوان</p> */}
      <p>{t("dashboard.addPropertyTab.tab1.content.address")}</p>

      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        disabled={isUpdate}
        required
      />
    </label>
    <label htmlFor="">
      {/* <p>الموقع</p> */}
      <p>{t("dashboard.addPropertyTab.tab1.content.location")}</p>
      <input
        type="text"
        ref={locationRef}
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        required
        disabled={isUpdate}
      />
    </label>

    <Location
      t={t}
      handleChange={(input) => handleChange(input, true)}
      city={formData.city}
      gover={formData.gover}
    />
  </div>
);

export default Tab1;
