import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MapTile from "./MapTile";
import {MapContext } from "../state/mapContext";
import MapEditorButtons from './MapEditorButtons'

const makeGrid = (size, tileColour) => {
  let grid = [];

  for (let i = 0; i < size.height/16; i++) {
    let row = [];
    for (let j = 0; j < size.width/16; j++) {
      row.push(tileColour);
    }

    grid.push(row);
  }

  return grid;
};

const useStyles = makeStyles({
  buttonContainerStyle: {
    alignContent: "center",
    height: "20px",
    marginBottom: "241px",
  },
  mapImageStyles: {
    backgroundImage: "url(sprites/pallet_town.png)",
    backgroundRepeat: "no-repeat",
    zIndex: 4,
    height: "512px",
    width: "512px",
    marginTop: "60px",
    marginLeft: "-80px"
  }
});

export default function MapEditor() {
  const classes = useStyles();
  const [gridHeight, setHeight] = useState(417);
  const [gridWidth, setWidth] = useState(509);
  const [size, setSize] = useState({width: 509, height: 417});
  const [grid, setGrid] = useState([[]]);
  const [selectedColour, setColour] = useState("blue");
  const {mapState} = useContext(MapContext);

  useEffect(() => {
    const rawGrid = makeGrid(size, "blue");
    setGrid(rawGrid)
  // eslint-disable-next-line 
  }, [size])

  const handleClick = (position) => {
    const [y,x] = position.split(",");
    const tempGrid = grid.map(row => [...row]);
    tempGrid[y][x] = selectedColour;

    setGrid(tempGrid)
  }

  const handleLoadMap = () => {
    const loadedMap = mapState.savedMap;
    setGrid(loadedMap)
  }

  const handleHeightChange = (e) => {
    const gridHeight = e.target.value;
    if(gridHeight%16 === 0) {
      setHeight(e.target.value);
    }
    else setHeight(0);
  }

  const handleWidthChange = (e) => {
    const gridWidth = e.target.value;
    if(gridWidth%16 === 0) {
      setWidth(e.target.value);
    }
    else setWidth(0);  }
  
  return (
    <>
      <MapEditorButtons
        grid={grid}
        setSize={setSize}
        gridHeight={gridHeight}
        gridWidth={gridWidth}
        handleWidthChange={handleWidthChange} 
        handleHeightChange={handleHeightChange}
        setColour={setColour}
        handleLoadMap={handleLoadMap}
      />
      <div className={classes.mapImageStyles}>
        <div
          style={{
          width: "512px",
          height: "512px",
          zIndex: 5,
          marginLeft: "-18px",
          }}>
            {grid.map((row, rowIndex) => row.map((tile, tileIndex) => 
              <MapTile 
                key={`${rowIndex}-${tileIndex}`} 
                tileColour={tile} 
                position={[rowIndex, tileIndex]}
                onClick={handleClick}/>))
            }
        </div>
      </div>
    </>
  );
}
