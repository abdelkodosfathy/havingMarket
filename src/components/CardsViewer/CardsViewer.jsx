import React, { useRef, useState, useEffect, useContext } from "react";
import Card from "../Card/Card";
import View from "../View/View";
import axios from "axios";
import "./CardViewer.css";
import "./selectedScroller.css";
import { DataContext } from "../Context";
import { useTranslation } from "react-i18next";
// import { useMediaQuery } from "react-responsive";

const Activities = [
  {
    type: "commercial",
    activities: [
      { en: "super market", ar: "سوبر ماركت" },
      { en: "pharmacy", ar: "صيدلية" },
      { en: "bakery", ar: "مخبز" },
      { en: "vegetables", ar: "خضروات" },
      { en: "another", ar: "آخر" },
    ],
  },
  {
    type: "industrial",
    activities: [
      { en: "Building materials", ar: "مواد البناء" },
      { en: "Auto industry (cars)", ar: "صناعة السيارات" },
      { en: "Tobacco", ar: "التبغ" },
      { en: "Leather", ar: "الجلود" },
      { en: "Electronic industries", ar: "الصناعات الإلكترونية" },
      { en: "electrical", ar: "الكهربائية" },
      { en: "Chemical", ar: "الكيميائية" },
      { en: "Pharmaceutical", ar: "الصيدلانية" },
      { en: "Mechanical", ar: "الميكانيكية" },
      { en: "Delivery services", ar: "خدمات التوصيل" },
      { en: "Another activity", ar: "نشاط آخر" },
      { en: "without", ar: "بدون" },
    ],
  },
  {
    type: "land",
    activities: [
      { en: "residential", ar: "سكني" },
      { en: "commercial", ar: "تجاري" },
      { en: "Administrative", ar: "إداري" },
      { en: "Entertaining", ar: "ترفيهي" },
      { en: "industrial", ar: "صناعي" },
      { en: "agricultural", ar: "زراعي" },
      { en: "Store", ar: "مخزن" },
      { en: "medical", ar: "طبي" },
      { en: "Usufruct right", ar: "حق الانتفاع" },
      { en: "coastal", ar: "ساحلي" },
    ],
  },
  {
    type: "housing",
    activities: [
      { en: "Apartment", ar: "شقة" },
      { en: "Loft", ar: "لوفت" },
      { en: "Penthouse", ar: "بنتهاوس" },
      { en: "Villa", ar: "فيلا" },
      { en: "castle", ar: "قصر" },
      { en: "Town House", ar: "تاون هاوس" },
      { en: "Duplex", ar: "دوبلكس" },
      { en: "Twin Vill", ar: "فيلا ثؤام" },
      { en: "Roof", ar: "روف" },
      { en: "studio", ar: "ستوديو" },
    ],
  },
  {
    type: "coastal",
    activities: [
      { en: "Chalet", ar: "شاليه" },
      { en: "Apartment", ar: "شقة" },
      { en: "Loft", ar: "لوفت" },
      { en: "Penthouse", ar: "بنتهاوس" },
      { en: "Villa", ar: "فيلا" },
      { en: "Town House", ar: "تاون هاوس" },
      { en: "Duplex", ar: "دوبلكس" },
      { en: "Twin Vill", ar: "فيلا ثؤام" },
      { en: "Roof", ar: "روف" },
    ],
  },
];

const CardsViewer = ({
  priceRange,
  onSidebarStateClicked,
  action,
  onUpdate,
  token,
  filter,
  children,
  className = "",
}) => {
  const darkMode = useContext(DataContext).darkMode;

  const [t, i18n] = useTranslation();
  const [selectedCard, setSelectedCard] = useState();
  const [isEmpty, setIsEmpty] = useState(true);
  const [fetched, setFetched] = useState(false);
  const [cardsData, setCardsData] = useState([]);
  const [selectedCardIndex, SetSelectedCardIndex] = useState();
  const cardRefs = useRef([]);

  const viewRef = useRef(null);

  // Find the activity ar name
  function getArValue(type, en) {
    // Find the activity type object
    const typeObject = Activities.find(
      (activityType) => activityType.type === type,
    );
    // console.log(typeObject);
    // console.log(en);
    if (typeObject) {
      // Find the specific activity within the type
      const activity = typeObject.activities.find(
        // (activity) => activity.en.toLowerCase() === en.toLowerCase(),
        (activity) => activity.en.toLowerCase() === en.toLowerCase(),
      );
      if (activity) {
        return activity.ar;
      }
    }

    return null; // Return null if not found
  }

  useEffect(() => {
    axios({
      headers: {
        Authorization: `${token && `Bearer ${token}`}`,
      },
      method: "get",
      baseURL: "https://app.having.market/api/",
      url: action,
    })
      .then((response) => {
        // console.log("action: ",action);
        // console.log("action-res: ",response);

        // Remove the 28th feature object from each card's feature array

        setFetched(true);
        setCardsData(response.data[0]);

        // console.log(response.data);
        priceRange([response.data[1], response.data[2]]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [action, token]);

  function handleUnLoveCard(id) {
    axios({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
      url: `https://app.having.market/api/delfav/${id}`,
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setCardsData((prev) => {
            console.log("cards was: ", cardsData);
            return prev.filter((property) => property.id !== id);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleRemoveCard(id) {
    axios
      .delete(`https://app.having.market/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setCardsData((prev) => {
            // console.log("cards was: ", cardsData);
            return prev.filter((property) => property.id !== id);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // console.log("cards is: ", cardsData);

  function handleUpdate(card) {
    onUpdate(card);
  }
  const filterData = (data, filter) => {
    console.log(filter);
    return data.filter((card) => {
      if (filter.type && card.type !== filter.type) return false;
      if (filter.finishing && card.finishing !== filter.finishing) return false;
      if (filter.space[0] && filter.space[1] && Array.isArray(filter.space)) {
        const [minSpace, maxSpace] = filter.space;
        if (parseInt(card.size) < minSpace || parseInt(card.size) > maxSpace)
          return false;
      }

      if (filter.bedrooms && card.bedrooms !== filter.bedrooms) {
        return false;
      }
      if (filter.bathrooms && card.bathrooms !== filter.bathrooms) return false;
      if (filter.price && Array.isArray(filter.price) && card.payment) {
        const [minPrice, maxPrice] = filter.price;
        if (card.payment.price < minPrice || card.payment.price > maxPrice)
          return false;
      }
      if (
        filter.payment &&
        card.payment &&
        card.payment.payment !== filter.payment
      )
        return false;

      // Check activities filtering
      if (filter.activities && filter.activities.length > 0) {
        if (
          !filter.activities.some(
            (filterActivity) =>
              // card.activity.toLowerCase() === filterActivity.toLowerCase(),
              +card.activity === filterActivity,
          )
        ) {
          return false;
        }
      }

      // Check features filtering
      //value
      // if (filter.features && filter.features.length > 0) {
      //   if (!filter.features.every(filterFeature => {
      //     // Check if the feature exists in the card
      //     return card.feature[0].hasOwnProperty(`feature${filterFeature}`);
      //   })) {
      //     return false;
      //   }
      // }
      //name
      // Check features filtering
      if (filter.features && filter.features.length > 0) {
        if (
          !filter.features.every((filterFeature) => {
            // console.log(filterFeature);
            // console.log("returned: ",card.feature[0].hasOwnProperty(filterFeature));
            // Check if the feature exists in the card
            return card.feature[0][filterFeature];
          })
        ) {
          return false;
        }
      }

      // Check location filtering
      if (filter.gover && parseInt(card.gover.id) !== filter.gover) {
        return false;
      }

      // if (filter.city && parseInt(card.city.id) !== filter.city) return false;
      // Check if any city in the array matches the card's city ID
      if (filter.city && Array.isArray(filter.city) && filter.city.length > 0) {
        if (!filter.city.some((cityId) => parseInt(card.city.id) === cityId))
          return false;
      }

      return true;
    });
  };

  // const [filteredData, setFilteredData] = useState(
  const filteredData =
    action === "sell" || action === "rent"
      ? filterData(cardsData, filter)
      : cardsData;
  // );

  useEffect(() => {
    if (fetched && filteredData.length > 0) {
      // console.log("empty flase: ", filteredData);
      // console.log("empty flase: ", fetched);
      setIsEmpty(false);
    } else {
      // console.log("empty: true");
      setIsEmpty(true);
    }
  }, [fetched, filteredData]);

  // console.log("filtered: ", filteredData);

  // const isLargeScreen = useMediaQuery({ query: '(min-width: 1255px)' });
  const isLargeScreen = null;

  useEffect(() => {
    if (fetched && filteredData.length > 0 && isLargeScreen) {
      handelCardSelection(filteredData[0]);
      console.log("filtered: ", filteredData);
    }
  }, [cardsData, isLargeScreen]); // Also add isLargeScreen as a dependency


  function handelCardSelection(cardData) {
    setSelectedCard(cardData.id);
    SetSelectedCardIndex(cardData.index);
    console.log(cardData.index);

    viewRef.current = { ...cardData, viewOpen: true };
  }
  function handleCloseView(cardData) {
    setSelectedCard(null);
    viewRef.current = null;
  }

  const scrollToCard = (index) => {
    console.log(index);

    cardRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      {!isEmpty ? (
        <div className={`card-viewer ${className} ${darkMode ? "dark" : ""}`}>
          {action === "sell" || action === "rent" ? (
            <div className="show-sidebar" key="sidebar-btn">
              <button onClick={onSidebarStateClicked}>
                <i className="fa-solid fa-filter"></i>
              </button>
            </div>
          ) : null}
          {children}
          <div className={`grid-container ${darkMode ? "dark" : ""}`}>
            {filteredData.map((card, index) => {
              const arValue = getArValue(card.type, card.activity);
              return (
                <Card
                  ref={(el) => (cardRefs.current[index] = el)}
                  t={t}
                  i18n={i18n}
                  key={index}
                  index={index}
                  action={action}
                  activities={arValue}
                  data={card}
                  onSelect={handelCardSelection}
                  selectedIndex={selectedCard}
                  onUpdate={() => handleUpdate(card)}
                  handleRemoveCard={() => handleRemoveCard(card.id)}
                  handleUnLoveCard={() => handleUnLoveCard(card.id)}
                />
              );
            })}
          </div>
          {selectedCard && filteredData.length > 0 ? (
            <View ref={viewRef} />
          ) : null}
          {(selectedCardIndex || (selectedCardIndex === 0)) && (
            <div
              className="selected-scroller"
              onClick={() => scrollToCard(selectedCardIndex)}
            >
              {/* <i className="fa-solid fa-arrow-up"></i> */}
              <i className="fa-solid fa-angle-up"></i>
            </div>
          )}
        </div>
      ) : (
        <div className="empty-data">
          {/* <h1> لا توجد عقارات ليتم عرضا هنا</h1> */}
          <h1> {t("missing.cardsViewer.notFound")}</h1>
          {action === "sell" || action === "rent" ? (
            <div className="show-sidebar" key="sidebar-btn">
              <button onClick={onSidebarStateClicked}>
                <i className="fa-solid fa-filter"></i>
              </button>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default CardsViewer;
