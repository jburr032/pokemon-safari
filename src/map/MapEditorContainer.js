import React from "react";
import Container from "@material-ui/core/Container";
import MapEditor from "./MapEditor";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  mapNameStyle: {}
});

export default function MapEditorContainer(){
  const classes = useStyles()

  return (
    <Container style={{ textAlign: "center" }}>
      <Typography className={classes.mapNameStyle}>
              <a href="https://fontmeme.com/pokemon-font/">
                <img
                  src="https://fontmeme.com/permalink/201105/1750b3325da4237a1c5ef5d60e9a67df.png"
                  alt="pokemon-font"
                  border="0"
                  style={{ height: "50px", width: "200px" }}
                />
              </a>
      </Typography>
      <MapEditor />
    </Container>
  );
};
