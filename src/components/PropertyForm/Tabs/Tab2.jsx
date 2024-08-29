// Tab2.js
import React from "react";
// import NumberInputWithButtons from "./NumberInputWithButtons"; // Import your component
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

const Tab2 = ({
  formData,
  handleChange,
  // filteredActivities,
  activities,
  isUpdate,
  t,
  i18n,
}) => (
  <div
    className="tab-2"
    style={i18n.language == "ar" ? { direction: "rtl" } : {}}
  >
    <label>
      {/* <p>النوع</p> */}
      <p>{t("dashboard.addPropertyTab.tab2.content.type")}</p>

      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        required
        disabled={isUpdate}
      >
        <option value="housing">
          {t("dashboard.addPropertyTab.tab2.content.options.housing")}
        </option>
        <option value="industrial">
          {t("dashboard.addPropertyTab.tab2.content.options.industrial")}
        </option>
        <option value="coastal">
          {t("dashboard.addPropertyTab.tab2.content.options.coastal")}
        </option>
        <option value="commercial">
          {t("dashboard.addPropertyTab.tab2.content.options.commercial")}
        </option>
        <option value="land">
          {t("dashboard.addPropertyTab.tab2.content.options.land")}
        </option>
      </select>
    </label>

    <label>
      {/* <p>النشاط\التصنيف</p> */}
      <p>{t("dashboard.addPropertyTab.tab2.content.activity")}</p>
      <select
        name="activity"
        value={formData.activity}
        onChange={handleChange}
        required
        disabled={isUpdate}
      >
        <option value="" disabled>
          {t("dashboard.addPropertyTab.tab2.content.options.selectType")}
        </option>
        {/* {filteredActivities.map((activity, index) => (
          <option key={index} value={activity.en}>
            {i18n.language === "ar" ? activity.ar : activity.en}
          </option>
        ))} */}
        {activities.map((activity, index) => (
          <option key={index} value={+activity.value}>
            {t(`activities.${formData.type}.${activity.label}`)}
          </option>
        ))}
      </select>
    </label>

    <label>
      {/* نوع التشطيب */}
      <p>{t("dashboard.addPropertyTab.tab2.content.finishingType")}</p>
      <select name="finishing" onChange={handleChange} defaultValue="">
        <option value="" disabled>
          {/* اختار نوع التشطيب */}
          {t(
            "dashboard.addPropertyTab.tab2.content.finishingOptions.selectFinishingType",
          )}
        </option>
        <option value="unfinished">
          {t(
            "dashboard.addPropertyTab.tab2.content.finishingOptions.unfinished",
          )}
        </option>
        <option value="semi_finished">
          {t(
            "dashboard.addPropertyTab.tab2.content.finishingOptions.semi_finished",
          )}
        </option>
        <option value="finished">
          {t("dashboard.addPropertyTab.tab2.content.finishingOptions.finished")}
        </option>
        <option value="luxury">
          {t("dashboard.addPropertyTab.tab2.content.finishingOptions.luxury")}
        </option>
        <option value="furnished">
          {t(
            "dashboard.addPropertyTab.tab2.content.finishingOptions.furnished",
          )}
        </option>
      </select>
    </label>

    <div className="prop-numbers">
      <NumberInputWithButtons
        name="floors"
        value={formData.floors}
        onChange={handleChange}
        placeholder={t("dashboard.addPropertyTab.tab2.content.floors")}
        title={t("dashboard.addPropertyTab.tab2.content.floors")}
        disabled={isUpdate}
      />
      <NumberInputWithButtons
        name="size"
        value={formData.size}
        onChange={handleChange}
        // placeholder="متر"
        placeholder={t("dashboard.addPropertyTab.tab2.content.space")}
        // title={"المساحة بالمتر"}
        title={t("dashboard.addPropertyTab.tab2.content.space")}
        disabled={isUpdate}
      />
    </div>
    <div className="prop-numbers">
      <NumberInputWithButtons
        name="bedrooms"
        value={formData.bedrooms}
        onChange={handleChange}
        // placeholder="غرف"
        placeholder={t("dashboard.addPropertyTab.tab2.content.rooms")}
        // title={"الغرف"}
        title={t("dashboard.addPropertyTab.tab2.content.rooms")}
        disabled={isUpdate}
      />
      <NumberInputWithButtons
        name="bathrooms"
        value={formData.bathrooms}
        onChange={handleChange}
        // placeholder="حمامات"
        // title={"الحمامات"}
        placeholder={t("dashboard.addPropertyTab.tab2.content.bathrooms")}
        title={t("dashboard.addPropertyTab.tab2.content.bathrooms")}
        disabled={isUpdate}
      />
    </div>
  </div>
);

export default Tab2;
