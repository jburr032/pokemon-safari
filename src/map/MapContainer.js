import React from "react";
import Container from "@material-ui/core/Container";
import MapEditor from "./MapEditor";
import MapInput from "./MapInput";

export const MapContainer = () => {

  return (
    <Container style={{ textAlign: "center" }}>
      <MapEditor />
      <MapInput />
    </Container>
  );
};
