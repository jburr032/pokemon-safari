import React from "react";
import MapEditor from "./MapEditor";
import MapInput from "./MapInput";

export const MapContainer = () => {
  const mapContainerStyle = {
    margin: "10px auto",
    position: "relative",
    backgroundColor: "black",
    width: "300px",
    height: "500px"
  };

  return (
    <div style={mapContainerStyle}>
      <MapEditor />
      <MapInput />
    </div>
  );
};
