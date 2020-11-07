import React, { useContext, useEffect, useState } from "react";
import { MapContext } from "../state/mapContext";
import {
  Button,
  Container
} from "@material-ui/core";
import { ResizeProvider, ResizeConsumer } from "react-resize-context";
import { makeStyles } from "@material-ui/core/styles";

const resizeTest = () => (
  <ResizeConsumer
    onSizeChanged={handleSizeChanged}
    className={classes.resizeContentStyles}
  >
    {`${size.width}x${size.height}`}
  </ResizeConsumer>
);

const generateGrid = () => {
  let grid = [];

  console.log(size.height, size.width);

  for (let i = 0; i < size.height * 1.9; i++) {
    let row = [];
    for (let j = 0; j < size.width * 1.8; j++) {
      row.push(
        <div
          style={{
            width: "16px",
            transform: "translateY(25%) translateX(15px)",
            height: "16px",
            display: "inline-flex",
            zIndex: 2,
            color: "black",
            position: "relative"
          }}
        ></div>
      );
    }

    grid.push(
      <div
        style={{
          width: "16px",
          transform: "translateY(25%) translateX(15px)",
          height: "16px",
          display: "inline-flex",
          zIndex: 2,
          color: "transparent",
          position: "relative",
          backgroundColor: "blue",
          border: "1px solid white",
          opacity: "25%"
        }}
      >
        0
      </div>
    );
  }

  return grid;
};

const useStyles = makeStyles({
  editMapContainerStyle: {
    // width: 400,
    // height: 400,
    // backgroundColor: "red",
    // opacity: "10%",
    // paddingRight: "325px"
  },
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
  const { mapState, dispatch } = useContext(MapContext);
  
  return (
    <>
      {/* editing buttons */}
      <Container className={classes.buttonContainerStyle}>
        <Button color="primary">Walkable</Button>
        <Button color="secondary">Blockable</Button>
        <Button>Interactable</Button>
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
                    {generateGrid()}
                  </div>
                </div>
                <div>{resizeTest()}</div>
          </ResizeProvider>
      </Container>
    </>
  );
}
