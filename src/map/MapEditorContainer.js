import React from "react";
import Container from "@material-ui/core/Container";
import MapEditor from "./MapEditor";

export default function MapEditorContainer(){

  return (
    <Container style={{ textAlign: "center" }}>
      <MapEditor />
    </Container>
  );
};
