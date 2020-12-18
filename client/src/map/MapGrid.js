import React, { useState, useEffect, useContext } from 'react'
import MapTile from "./MapTile";
import { EditorContext } from "../state/editorContext";

const gridContainerStyles = {
  width: "511px",
  height: "512px",
  zIndex: 5,
  marginLeft: "7%",
  marginTop: "80px"
};

const mapTilesContainerStyles = { 
  position: "absolute", 
  width: "520px", 
  height: "516px" 
};

const makeGrid = (size, tileColour) => {
    let grid = [];
  
    for (let i = 0; i < size.height/72; i++) {
      let row = [];
      for (let j = 0; j < size.width/72; j++) {
        row.push(tileColour);
      }
  
      grid.push(row);
    }
  
    return grid;
  };

const MapGrid = () => {
    const { editorState }  = useContext(EditorContext);

    const [grid, setGrid] = useState([[]]);
    const [size, setSquareGrid] = useState({ width: 504, height: 504 });
    const [editorSquareWith, setEditorSquareWith] = useState(366)
    const [selectedColour, setColour] = useState("red");

    useEffect(() => {
        setGrid(makeGrid(size, "blue"))
      }, [size]);

    const handleClick = (position) => {
        const [y,x] = position.split(",");
        const tempGrid = grid.map(row => [...row]);
        tempGrid[y][x] = selectedColour;
    
        setGrid(tempGrid)
      }

    return (
        <div
          style={gridContainerStyles}>
          <div style={mapTilesContainerStyles}>
            {grid && grid.map((row, rowIndex) => row.map((tile, tileIndex) => 
              <MapTile 
                key={`${rowIndex}-${tileIndex}`} 
                tileColour={tile} 
                position={[rowIndex, tileIndex]}
                onClick={handleClick}/>))
            }
          </div>
          <img src="/maps/bills.png" alt="map" width="100%" height="100%" style={{ paddingLeft: "20px", paddingTop: "23px" }} />
        </div>
    )
}

export default MapGrid


