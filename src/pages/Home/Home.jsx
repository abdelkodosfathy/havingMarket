// import main from '../../imgs/dhabi.jpg'
// import "./Home.css";
import "./Style/Home.css";
import "./Style/Search.css";
import Footer from "./footer/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Select from "react-select";
import activitiesByType from "../../activitiesByType";

import axios from "axios";
import { useTranslation } from "react-i18next";

const classes = ["right", "left"];
// const typeOptions = [
//   { value: "housing", label: "سكني" },
//   { value: "industrial", label: "صناعي" },
//   { value: "commercial", label: "تجاري" },
//   { value: "coastal", label: "ساحلي" },
//   { value: "land", label: "ارض" },
// ];
// const combinedActivities = [
//   // Housing
//   { type: "housing", value: "Apartment", label: "شقة" },
//   { type: "housing", value: "Loft", label: "لوفت" },
//   { type: "housing", value: "Penthouse", label: "بنتهاوس" },
//   { type: "housing", value: "Villa", label: "فيلا" },
//   { type: "housing", value: "Town House", label: "تاون هاوس" },
//   { type: "housing", value: "Duplex", label: "دوبلكس" },
//   { type: "housing", value: "Twin Vill", label: "فيلا ثؤام" },
//   { type: "housing", value: "Roof", label: "روف" },
//   { type: "housing", value: "studio", label: "ستوديو" },

//   // Commercial
//   { type: "commercial", value: "super market", label: "سوبر ماركت" },
//   { type: "commercial", value: "pharmacy", label: "صيدلية" },
//   { type: "commercial", value: "bakery", label: "مخبز" },
//   { type: "commercial", value: "vegetables", label: "خضروات" },
//   { type: "commercial", value: "another", label: "آخر" },

//   // Industrial
//   { type: "industrial", value: "Building materials", label: "مواد البناء" },
//   {
//     type: "industrial",
//     value: "Auto industry (cars)",
//     label: "صناعة السيارات",
//   },
//   { type: "industrial", value: "Tobacco", label: "التبغ" },
//   { type: "industrial", value: "Leather", label: "الجلود" },
//   {
//     type: "industrial",
//     value: "Electronic industries",
//     label: "الصناعات الإلكترونية",
//   },
//   { type: "industrial", value: "electrical", label: "الكهربائية" },
//   { type: "industrial", value: "Chemical", label: "الكيميائية" },
//   { type: "industrial", value: "Pharmaceutical", label: "الصيدلانية" },
//   { type: "industrial", value: "Mechanical", label: "الميكانيكية" },
//   { type: "industrial", value: "Delivery services", label: "خدمات التوصيل" },
//   { type: "industrial", value: "Another activity", label: "نشاط آخر" },
//   { type: "industrial", value: "without", label: "بدون" },

//   // Land
//   { type: "land", value: "residential", label: "سكني" },
//   { type: "land", value: "commercial", label: "تجاري" },
//   { type: "land", value: "Administrative", label: "إداري" },
//   { type: "land", value: "Entertaining", label: "ترفيهي" },
//   { type: "land", value: "industrial", label: "صناعي" },
//   { type: "land", value: "agricultural", label: "زراعي" },
//   { type: "land", value: "Store", label: "مخزن" },
//   { type: "land", value: "medical", label: "طبي" },
//   { type: "land", value: "Usufruct right", label: "حق الانتفاع" },
//   { type: "land", value: "coastal", label: "ساحلي" },

//   // Coastal
//   { type: "coastal", value: "Chalet", label: "شاليه" },
//   { type: "coastal", value: "Apartment", label: "شقة" },
//   { type: "coastal", value: "Loft", label: "لوفت" },
//   { type: "coastal", value: "Penthouse", label: "بنتهاوس" },
//   { type: "coastal", value: "Villa", label: "فيلا" },
//   { type: "coastal", value: "Town House", label: "تاون هاوس" },
//   { type: "coastal", value: "Duplex", label: "دوبلكس" },
//   { type: "coastal", value: "Twin Vill", label: "فيلا ثؤام" },
//   { type: "coastal", value: "Roof", label: "روف" },
// ];


const useGroupedOptions = () => {
  const { t } = useTranslation();

  // Generate grouped options
  const groupedOptions = Object.keys(activitiesByType).map((type) => {
    const activities = activitiesByType[type];

    return {
      label: t(`activities.${type}`), // Translate the group label (e.g., "Housing")
      options: activities.map((activity) => ({
        value: activity.value,
        label: t(`activities.${activity.label}`), // Translate each activity label
      })),
    };
  });

  return groupedOptions;
};



const getSelectOptions = (type) => {
  const { t } = useTranslation();
  
  if (!activitiesByType[type]) return [];
  
  return activitiesByType[type].map(activity => ({
    value: activity.value,
    label: t(`activities.${activity.label}`) // Use the i18n key for translation
  }));
};

const Location = ({ handleChange, placeholder }) => {
  const [cities, setCities] = useState([]);
  // const [selectedCity, setSelectedCity] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const normalizeArabicText = (text) => {
    if (!text) return "";
    return text.replace(/أ/g, "ا");
  };

  const fetchCities = () => {
    axios.get("https://app.having.market/api/cities").then((res) => {
      setCities(res.data.data);
      // console.log(res);
    });
  };

  const handleCityChange = (selectedOption) => {
    // console.log("selected", selectedOption);
    setSelectedOptions(selectedOption);

    selectedOption && handleChange(selectedOption);
  };

  useEffect(() => {
    fetchCities();
  }, []);

  // console.log("بحث: ", selectedOptions);

  const cityOptions = cities.map((city) => ({
    value: city.id,
    label: city.name,
    gover: city.gover_id,
  }));

  // Custom filter function for react-select > Select
  const customFilter = (option, searchText) => {
    if (!searchText) return true;
    const normalizedLabel = normalizeArabicText(option.label);
    const normalizedSearchText = normalizeArabicText(searchText);
    return normalizedLabel.includes(normalizedSearchText);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,

      direction: "rtl",
      minHeight: "40px",
      borderRadius: "20px 0 0 20px",
      borderColor: "#ced4da",
      margin: "0",
      height: "100%",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#a8b3c4",
      },
    }),
    menu: (provided) => ({
      ...provided,
      top: "0",
      borderRadius: "4px",
      zIndex: 10001,
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
    <>
      <Select
        className="home-select"
        name="city"
        options={cityOptions}
        onChange={handleCityChange}
        value={selectedOptions}
        // placeholder="اختر مدينة"
        placeholder={placeholder}
        isClearable
        isMulti
        styles={customStyles}
        filterOption={customFilter} // Use custom filter function
      />
    </>
  );
};

const Home = ({ notAuth = false, onSearch }) => {
  const [t, i18n] = useTranslation();


  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  const [cardsData, setCardsData] = useState(null);

  // const options = useGroupedOptions();

  const [filter, setFilter] = useState({
    city: [],
    gover: "",
    bathrooms: 0,
    bedrooms: 0,
    activities: [],
  });

  useEffect(() => {
    axios({
      method: "get",
      baseURL: "https://app.having.market/api/",
      url: "sell",
    })
      .then((e) => {
        console.log(e);
        // setFetched(true);
        setCardsData(e.data[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  // console.log(cardsData);
  if (notAuth) {
    console.log("auth: please login");
  }

  function handleSearch() {
    if (active !== null) {
      onSearch(filter);
      navigate(`/${active}`);
    } else {
      alert("من فضلك اختار بيع او ايجار");
    }
  }

  function activate(type) {
    if (type === active) {
      setActive(null);
    } else {
      setActive(type);
    }
  }

  const getCustomStyles = (largBorderRadius, smallBorderRadius) => ({
    container: (provided) => ({
      ...provided,
      width: "100%",
    }),
    control: (provided) => ({
      ...provided,
      minHeight: "44px", // Adjust height as needed
      borderRadius: `${largBorderRadius} !important`,
      "@media (max-width: 768px)": {
        // borderRadius: borderRadius,
        borderRadius: `${smallBorderRadius} !important`,
      },
      boxShadow: "none",
      "&:hover": {
        border: "1px solid #aaa",
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      maxWidth: "100%", // Ensure it doesn't overflow
      overflow: "hidden",
      whiteSpace: "nowrap",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      overflow: "hidden",
      textOverflow: "ellipsis",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      cursor: "pointer",
      ":hover": {
        backgroundColor: "red",
        color: "white",
      },
    }),
    menu: (provided) => ({
      ...provided,
      position: "absolute",
      top: "40px",
      margin: "5px 0",
      zIndex: 9999, // Ensure the dropdown is above other elements
    }),
  });

  // const groupedOptions = combinedActivities.reduce((acc, activity) => {
  //   const group = acc.find((g) => g.label === activity.type);
  //   if (group) {
  //     group.options.push({ value: activity.value, label: activity.label });
  //   } else {
  //     acc.push({
  //       label: activity.type,
  //       options: [{ value: activity.value, label: activity.label }],
  //     });
  //   }
    
  //   return acc;
  // }, []);
  // const options = Object.keys(activitiesByType).map((type) => ({
  //   label: type.charAt(0).toUpperCase() + type.slice(1),
  //   options: activitiesByType[type],
  // }));
  const options = Object.keys(activitiesByType).map((type) => {
    // Get the list of activities and exclude the first element
    const activities = activitiesByType[type].slice(1);
  
    return {
      label: t(`activities.${type}.type`),
      options: activities.map(activity => ({
        value: activity.value,
        label: t(`activities.${type}.${activity.label}`),
      })),
    };
  });

  // console.log(groupedOptions);

  const handleCityChange = (selectedOptions) => {
    setFilter({
      ...filter,
      city: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    });
  };

  const handleActivityChange = (selectedOptions) => {
    console.log("activity", selectedOptions);
    setFilter({
      ...filter,
      activities: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    });
  };

  const handleRoomsChange = (selectedOption) => {
    setFilter({
      ...filter,
      bedrooms: selectedOption ? parseInt(selectedOption.value) : 0,
    });
  };
  const handleBathRoomsChange = (selectedOption) => {
    setFilter({
      ...filter,
      bathrooms: selectedOption ? parseInt(selectedOption.value) : 0,
    });
  };
  // console.log("app filter: ", filter);
  return (
    <div className="home">
      <section className="home-main">
        <div className="home-search">
          <div className="search-filters">
            <button
              className={`sell ${active === "buy" ? "active" : ""}`}
              onClick={() => activate("buy")}
            >
              {t("search.forSell")}
            </button>
            <button
              className={`rent ${active === "rent" ? "active" : ""}`}
              onClick={() => activate("rent")}
            >
              {t("search.forRent")}
            </button>
          </div>
          <div className="search-bar list">
            <Select
              className="search-numbers first"
              name="type"
              // options={groupedOptions}
              options={options}
              isMulti
              onChange={handleActivityChange}
              placeholder={t("search.propertyType")}
              isClearable
              styles={getCustomStyles("20px 0 0 20px", "20px 20px 0 0")}
            />
            <div className="select-row">
              <Select
                className="search-numbers"
                name="bedrooms"
                options={[
                  { value: 1, label: 1 },
                  { value: 2, label: 2 },
                  { value: 3, label: 3 },
                  { value: 4, label: 4 },
                  { value: 5, label: 5 },
                ]}
                onChange={handleRoomsChange}
                placeholder={t("search.rooms")}
                isClearable
                styles={getCustomStyles("none", "0 0 0px 20px")}
              />
              <Select
                className="search-numbers last"
                name="bathrooms"
                options={[
                  { value: 1, label: 1 },
                  { value: 2, label: 2 },
                  { value: 3, label: 3 },
                  { value: 4, label: 4 },
                  { value: 5, label: 5 },
                ]}
                onChange={handleBathRoomsChange}
                placeholder={t("search.bathrooms")}
                isClearable
                styles={getCustomStyles("0 20px 20px 0", "0 0 20px 0px")}
              />
            </div>
          </div>
          <div className="search-bar">
            <div className="search-input">
              <Location
                placeholder={t("search.selectCity")}
                handleChange={handleCityChange}
              />
            </div>
            <button className="search-btn" onClick={handleSearch}>
              {t("search.search")}
            </button>
          </div>
        </div>
      </section>
      <section className="home-places">
        <h1>{t("title")}</h1>
        {cardsData ? (
          <div className="home-card">
            {cardsData.slice(0, 4).map((card, index) => (
              <div
                className={`provided-featur ${classes[index % 2]}`}
                onClick={() => navigate("/buy")}
                key={index}
              >
                {card.img[0] ? (
                  <img
                    loading="lazy"
                    src={`https://app.having.market/public/images/${card.img[0].img_name}`}
                    alt="Property"
                  />
                ) : null}
                <div className="provided-text">
                  <p>{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </section>
      <Footer />
    </div>
  );
};

export default Home;

{
  /*
عامية
"استمتع بخدمة عملاء ممتازة وتجربة استلام سلسة لقطعتك الجديدة. إحنا هنا علشان نلبي احتياجاتك ونضمن إنك تكون راضي تمامًا عن كل حاجة في عملية الشراء والتسليم."

"استكشف وحداتنا الحديثة المصممة للراحة والأناقة. من الاستوديوهات المريحة إلى البنتهاوس الواسعة، عندنا كل اللي تحتاجه."

"استمتع بإطلالات خلابة ومساحات معيشة أنيقة في ممتلكاتنا. اختار بين الشقق الحضرية والمنازل الريفية، كل حاجة مصممة بأناقة وسحر."

"اكتشف العيش الفاخر في ممتلكاتنا الحصرية مع وسائل الراحة الحديثة والديكور الداخلي المصمم. ابحث عن بيت أحلامك معانا النهاردة
*/
}

{
  /*
فصحي
"استمتع بخدمة عملاء ممتازة وتجربة استلام سلسة لقطعتك الجديدة. نحن هنا لتلبية احتياجاتك وضمان رضاك التام عن كل تفاصيل عملية الشراء والتسليم."

"استكشف وحداتنا الحديثة المصممة للراحة والأناقة. من الاستوديوهات المريحة إلى البنتهاوس الواسعة، تلبي ممتلكاتنا كل نمط حياة."

"استمتع بإطلالات خلابة ومساحات معيشة أنيقة في ممتلكاتنا. اختر بين الشقق الحضرية والمنازل الريفية، كل منها مصمم للأناقة والسحر."

"اكتشف العيش الفاخر في ممتلكاتنا الحصرية مع وسائل الراحة الحديثة والديكور الداخلي المصمم. ابحث عن منزل أحلامك معنا اليوم."
*/
}
{
  /* 
english
"Explore our modern units designed for comfort and style. From cozy studios to spacious penthouses, our properties cater to every lifestyle."

"Enjoy stunning views and elegant living spaces in our properties. Choose from urban lofts to townhouses, each crafted for sophistication and charm."

"Discover luxury living in our exclusive properties with state-of-the-art amenities and designer interiors. Find your dream home with us today."

"Enjoy excellent customer service and a smooth delivery experience for your new piece. We are here to meet your needs and ensure your complete satisfaction with every detail of the purchase and delivery process."
*/
}
