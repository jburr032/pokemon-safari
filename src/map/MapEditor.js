import React, { useEffect, useState, useContext } from "react";
import { Button, Container, GridList } from "@material-ui/core";
import { ResizeProvider, ResizeConsumer } from "react-resize-context";
import { makeStyles } from "@material-ui/core/styles";
import MapTile from "./MapTile";
import {MapContext, mapTypes} from "../state/mapContext";

const generateGrid = (generatedGrid) => {
  return generatedGrid.map((row, rowIndex) => 
    row.map((tile, tileIndex) => 
      <MapTile tileColour={tile} position={[rowIndex, tileIndex]}/>));
};

const makeGrid = (size, tileColour) => {
  let grid = [];

  for (let i = 0; i < size.height/16; i++) {
    let row = [];
    for (let j = 0; j < size.width/16; j++) {
      row.push(
        tileColour
      );
    }
    grid.push(row);
  }

  return grid;
};

const useStyles = makeStyles({
  buttonContainerStyle: {
    alignContent: "center",
    height: "20px",
    marginBottom: "30px"
  },
  resizableContainer: {
    display: "inline-flex",
    flexDirection: "column",
    width: "509px",
    height: "417px",
    resize: "both",
    overflow: "hidden",
    background: "#d7dfe2",
    zIndex: 0,
    backgroundImage: "url(sprites/pallet_town.png)",
    backgroundRepeat: "no-repeat",
    marginLeft: "-40px"
  }
});

export default function MapEditor() {
  const classes = useStyles();
  const [size, setSize] = React.useState({width: 509, height: 417});
  const [grid, setGrid] = useState();
  const {mapState, dispatch} = useContext(MapContext);

  useEffect(() => {
    const generatedGrid = makeGrid(size, "blue");
    const gridToRender = generateGrid(generatedGrid);

    setGrid(gridToRender);
    dispatch({ type: mapTypes.CREATE_MAP, payload: generatedGrid})

  }, [size])

  const handleLoadMap = () => {
    const loadedGrid = generateGrid(mapState.savedMap);
    console.log("loaded Map", mapState.savedMap)
    setGrid(loadedGrid);
  }
  
  const handleSizeChanged = (newSize) => {
    setSize(newSize);
  };

  const resizeTest = () => (
    <ResizeConsumer
      onSizeChanged={handleSizeChanged}
      className={classes.resizeContentStyles}
    >
      {`${size.width}x${size.height}`}
    </ResizeConsumer>
  );

  return (
    <>
      <Container className={classes.buttonContainerStyle}>
        <Button color="primary" onClick={() => dispatch({ type: mapTypes.SET_COLOUR, payload: "blue"})}>Walkable</Button>
        <Button color="secondary" onClick={() => dispatch({ type: mapTypes.SET_COLOUR, payload: "red"})}>Blockable</Button>
        <Button onClick={() => dispatch({ type: mapTypes.SET_COLOUR, payload: "yellow"})}>Interactable</Button>
        <Button variant="contained" onClick={() => dispatch({ type: mapTypes.SAVE_MAP })}>Save</Button>
        <Button variant="contained" onClick={handleLoadMap}>Load</Button>
      </Container>
      <Container className={classes.editMapContainerStyle}>
          <ResizeProvider>
                <div className={classes.resizableContainer}>
                  <div
                    style={{
                      width: size.width,
                      height: size.height,
                      zIndex: 5,
                      marginLeft: "-10px"
                    }}
                  >
                    {grid}
                  </div>
                </div>
                <div>{resizeTest()}</div>
          </ResizeProvider>
      </Container>
    </>
  );
}
