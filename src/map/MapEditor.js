import React, { useEffect, useState } from "react";
import { Button, Container } from "@material-ui/core";
import { ResizeProvider, ResizeConsumer } from "react-resize-context";
import { makeStyles } from "@material-ui/core/styles";
import MapTile from "./MapTile";

const generateGrid = (size, tileColour) => {
  let grid = [];

  for (let i = 0; i < size.height/16; i++) {
    let row = [];
    for (let j = 0; j < size.width/16; j++) {
      row.push(
        <MapTile tileColour={tileColour}/>
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
  const [tileColour, setColour] = useState("blue")
  const [size, setSize] = React.useState({width: 509, height: 417});
  const [grid, setGrid] = useState();

  useEffect(() => {
    const grid = generateGrid(size, tileColour);

    setGrid(grid);

  }, [tileColour, size])
  
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
        <Button color="primary" onClick={() => setColour("blue")}>Walkable</Button>
        <Button color="secondary" onClick={() => setColour("red")}>Blockable</Button>
        <Button onClick={() => setColour("yellow")}>Interactable</Button>
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
                    {/* {generateGrid(size, tileColour)} */}
                    {grid}
                  </div>
                </div>
                <div>{resizeTest()}</div>
          </ResizeProvider>
      </Container>
    </>
  );
}
