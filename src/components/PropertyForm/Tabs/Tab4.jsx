import featuresByType from "../../../featuers";

const Tab4 = ({ formData, handleChange, t, i18n }) => {

  let currentFeatures = featuresByType[formData.type] || [];

  return (
    <div
      className="tab-4"
      style={i18n.language == "ar" ? { direction: "rtl" } : {}}
    >
      <h2
        className="ar"
        style={i18n.language == "ar" ? { direction: "rtl" } : {}}
      >
        {t("dashboard.addPropertyTab.tab5.content.AddictionalFeatures")}
      </h2>
      {/* Uncomment if needed for English translation */}
      {/* <h2 className='en'>{t("dashboard.addPropertyTap.tab5.content.AddictionalFeatures")}</h2> */}

      <ul>
        {currentFeatures.map((e, i) => (
          <li key={i}>
            <input
              onChange={handleChange}
              type="checkbox"
              name={`feature${i + 1}`}
              id={e.value}
              value={e.value}
            />
            <label htmlFor={e.value}>{e.arLabel}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tab4;
