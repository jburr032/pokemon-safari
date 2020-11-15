import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MapEditorContainer from "./map/MapEditorContainer";
import MapCardContainer from "./map/MapCardContainer";

const useStyles = makeStyles({
  gridContainerStyle: {
    width: "75%",
    margin: "200px auto",
    border: "5px #f7d61b solid",
    height: "600px",
    backgroundColor: "#1698f0"
  },
  verticalLine: {
    borderLeft: "2px #f7d61b solid",
    marginTop: "45px",
    height: "500px"
  }
});

export default function App() {
  const classes = useStyles();

  return (
    <Grid container className={classes.gridContainerStyle}>
      <Grid item md={5}>
        <MapCardContainer />
      </Grid>
      <Grid item md={1}>
        <div className={classes.verticalLine}></div>
      </Grid>
      <Grid item md={5}>
        <MapEditorContainer/>
      </Grid>
    </Grid>
  );
}
