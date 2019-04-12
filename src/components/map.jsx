import React from "react";
import "./map.css";
import map from "../resources/map.svg";

export default function Map() {
  return (
    <div
      id="map--desktop"
      className="map map--desktop"
      width="1620"
      height="970"
      data-country-selected="false"
    >
      <img className="mapBackground" src={map} alt="Refugees Core" />
    </div>
  );
}
