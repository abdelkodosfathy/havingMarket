import React, { useEffect } from "react";
import "./User.css";
import { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../../components/Context";
import PropertyForm from "../../components/PropertyForm/PropertyForm";
import Button from "./Button";
import CardsViewer from "../../components/CardsViewer/CardsViewer";
import { useTranslation } from "react-i18next";

const User = () => {
  const [t, i18n] = useTranslation();
  const loginData = useContext(DataContext).loginState;
  const [property, setProperty] = useState({
    name: "my properties",
    opject: null,
  });
  const token = loginData.token;

  function propertyType(name, opject = null) {
    setProperty({ name, opject });
  }

  function handleUpdate(e) {
    console.log("update: ", e);
    propertyType("update", e);
  }

  function handleNewProp() {
    propertyType("my properties");
    console.log("added");
  }
  // function closeSidebar() {
  //   const sidebar = document.querySelector(".side-bar");
  //   const cardViewer = document.querySelector(".card-viewer");

  //   sidebar.style.left = "-300px";
  //   cardViewer.style.filter = "none";
  //   cardViewer.style.pointerEvents = "auto";
  // }
  return (
    <div className="user-page">
      <div className="taps-container">
        <div className="user-taps">
          {/* <Button onClicked={() => propertyType("my properties")} proprety="my properties" isActivated={property.name}> */}
          <Button
            onClicked={() => propertyType("my properties")}
            proprety="my properties"
            // title={"عقاراتي"}
            title={t("dashboard.myProps")}
            // isActivated={property.name}
            isActivated={property.name === "my properties"}
          >
            <i className="fa-solid fa-briefcase"></i>
          </Button>
          {/* <Button onClicked={() => propertyType("favorites")} proprety="favorites" isActivated={property.name}> */}
          <Button
            onClicked={() => propertyType("favorites")}
            proprety="favorites"
            // title={"المفضلة"}
            title={t("dashboard.favourite")}
            // isActivated={property.name}
            isActivated={property.name === "favorites"}
          >
            <i className="fa-solid fa-heart"></i>
          </Button>
          {/* <Button onClicked={() => propertyType("add property")} proprety="add property" isActivated={property.name}> */}
          <Button
            onClicked={() => propertyType("add property")}
            proprety="add property"
            // title={"اضافة عقار"}
            title={t("dashboard.addProp")}
            // isActivated={property.name}
            isActivated={
              property.name === "add property" || property.name === "update"
            }
            updatingData={property.opject}
          >
            <i className="fa-solid fa-building"></i>
          </Button>
        </div>
      </div>

      {property.name === "add property" ? (
        <PropertyForm onAddProp={handleNewProp} isUpdate={property.opject} />
      ) : property.name === "update" ? (
        // <PropertyForm isUpdate={property.opject} />
        <PropertyForm isUpdate={property.opject} />
      ) : property.name === "my properties" ? (
        <CardsViewer
          className="user"
          action={"tasks"}
          token={token}
          onUpdate={handleUpdate}
        />
      ) : property.name === "favorites" ? (
        <CardsViewer className="user" action={"fav"} token={token} />
      ) : null}
    </div>
  );
};

export default User;
