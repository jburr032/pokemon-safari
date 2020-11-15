import React, { useEffect, useState, useContext } from "react";
import { Button, Container, FormControl, OutlinedInput, InputAdornment } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MapTile from "./MapTile";
import {MapContext, mapTypes} from "../state/mapContext";

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
  const [gridHeight, setHeight] = useState(0);
  const [gridWidth, setWidth] = useState(0);
  const [size, setSize] = useState({width: 509, height: 417});
  const [grid, setGrid] = useState([[]]);
  const [selectedColour, setColour] = useState("blue")
  const {mapState, dispatch} = useContext(MapContext);

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
    console.log(e.target.value)

    setHeight(e.target.value);
  }

  const handleWidthChange = (e) => {
    console.log(e.target.value)
    setWidth(e.target.value);
  }
  
  return (
    <>
      <Container className={classes.buttonContainerStyle}>
        <div>
          <Button color="primary" onClick={() => setColour("blue")}>Walkable</Button>
          <Button color="secondary" onClick={() => setColour("red")}>Blockable</Button>
          <Button onClick={() => setColour("yellow")}>Interactable</Button>
        </div>
        <div>
          <Button style={{ marginRight: "10px" }} variant="contained" onClick={() => dispatch({ type: mapTypes.SAVE_MAP, payload: grid })}>Save</Button>
          <Button variant="contained" onClick={handleLoadMap}>Load</Button>
        </div>
        <hr />
          <OutlinedInput
            // value={values.weight}
            // onChange={handleChange('weight')}
            endAdornment={<InputAdornment position="end"><Button style={{ width: '100px'}} onClick={() => setSize(prev => ({width: prev.width, height: gridHeight}))}>Height</Button></InputAdornment>}
            labelWidth={0}
            onChange={(e) => handleHeightChange(e)}
          />
          <OutlinedInput
            // value={values.weight}
            // onChange={handleChange('weight')}
            endAdornment={<InputAdornment position="end"><Button style={{ width: '100px'}} onClick={() => setSize(prev => ({width: gridWidth, height: prev.height}))}>Width</Button></InputAdornment>}
            labelWidth={0}
            onChange={(e) => handleWidthChange(e)}
          />
      </Container>
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
