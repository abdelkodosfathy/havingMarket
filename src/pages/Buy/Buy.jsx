import React, { useEffect, useState } from "react";
import "./Buy.css";
import NewSidebar from "../../components/SideBar/NewSidebar";
import CardsViewer from "../../components/CardsViewer/CardsViewer";

const Buy = ({ searchFilter, action }) => {
  const [sidebarState, setSidebarState] = useState(false);
  const [priceRange, setPriceRange] = useState([null, null]);
  const [filterData, setFilterData] = useState({
    city: [],
    activities: [],
    bedrooms: null,
    rooms: null,
    minPrice: null,
    maxPrice: null,
    features: [],
    finishing: null,
    gover: "",
    payment: null,
    space: [null, null],
    type: null,
  });

  useEffect(() => {
    if (searchFilter !== null) {
      // Assuming searchFilter has properties like value, label, and gover
      const { city, gover, bathrooms, bedrooms, activities } = searchFilter;
      setFilterData({
        ...filterData,
        city: city,
        gover: gover, // Convert to string if needed
        bathrooms: bathrooms,
        bedrooms: bedrooms,
        activities: activities,
      });
    }
  }, [searchFilter]);

  // Function to handle data changes from the SideBar
  const handleFilterChange = (newData) => {
    if (typeof newData === "object") {
      console.log(newData);
      setFilterData(newData); // Update filterData state with the newData object
    } else {
      console.log("Received non-object data:", newData);
    }
  };

  function handleSidebar() {
    setSidebarState((prev) => !prev);
  }

  function handlePriceRange(e) {
    setPriceRange(e);
  }

  return (
    <div className="buy">
      <NewSidebar
        state={sidebarState}
        onClose={handleSidebar}
        onFilterChange={handleFilterChange}
        priceRange={priceRange}
      />
      {/* <button onClick={handleSidebar}>Show Filters</button> */}
      <CardsViewer
        onSidebarStateClicked={handleSidebar}
        action={action}
        filter={filterData}
        priceRange={handlePriceRange}
      />
    </div>
  );
};

export default Buy;
