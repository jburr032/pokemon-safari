import React, { useEffect, useState, useContext } from "react";
import { Snackbar } from "@material-ui/core";
import MapTile from "./MapTile";
import { MapContext } from "../state/mapContext";
import MapEditorButtons from './MapEditorButtons';
import MuiAlert from '@material-ui/lab/Alert';
import axios from "axios";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

export default function MapEditor() {
  const [gridHeight, setHeight] = useState(417);
  const [gridWidth, setWidth] = useState(509);
  const [size, setSize] = useState({width: 512, height: 512});
  const [grid, setGrid] = useState([[]]);
  const [selectedColour, setColour] = useState("blue");
  const {mapState} = useContext(MapContext);
  const [loadingMap, setLoading] = useState(false);
  const [fetchedMapfile, setMapFile] = useState('');

  const mapImageStyles = {
    backgroundImage: `url(maps/${fetchedMapfile}.png)`,
    backgroundRepeat: "no-repeat",
    zIndex: 4,
    height: "512px",
    width: "512px",
    marginTop: "60px",
    marginLeft: "-80px"
  }

  useEffect(() => {
    setGrid(makeGrid(size, "blue"))
  }, [])

  useEffect(() => {
    if(mapState.currMap) handleLoadMap();
  }, [mapState.currMap])

  const handleClick = (position) => {
    const [y,x] = position.split(",");
    const tempGrid = grid.map(row => [...row]);
    tempGrid[y][x] = selectedColour;

    setGrid(tempGrid)
  }

  const handleLoadMap = async () => {
    try{
      setLoading(true);
      const resGrid = await axios.get(`/fetch_map/${mapState.currMap}`);
      setGrid(resGrid.data.savedGrid);
      setMapFile(mapState.currMap);

      setLoading(false);

    }catch(err){
      console.error(err);
      setLoading(false);
    }

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
    else setWidth(0);  
  }

  return (
    <>
      {loadingMap && <Snackbar open={loadingMap}>
                    <Alert severity="info">
                      Loading map...
                    </Alert>
                  </Snackbar>}
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
      <div style={mapImageStyles}>
        <div
          style={{
          width: "512px",
          height: "512px",
          zIndex: 5,
          marginLeft: "-18px",
          }}>
            {grid && grid.map((row, rowIndex) => row.map((tile, tileIndex) => 
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
