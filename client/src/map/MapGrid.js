import React, { useState, useEffect, useContext } from 'react'
import MapTile from "./MapTile";
import { EditorContext } from "../state/editorContext";

const scaleDimensions = [
    { gridWidth: 179, gridSquareWidth: 144, gridSquareHeight: 128 },
    { gridWidth: 233, gridSquareWidth: 192, gridSquareHeight: 160 },
    { gridWidth: 283, gridSquareWidth: 240, gridSquareHeight: 208 },
    { gridWidth: 319, gridSquareWidth: 272, gridSquareHeight: 240 },
    { gridWidth: 366, gridSquareWidth: 320, gridSquareHeight: 272 },
    { gridWidth: 430, gridSquareWidth: 360, gridSquareHeight: 308 },
    { gridWidth: 485, gridSquareWidth: 472, gridSquareHeight: 292 },
    { gridWidth: 517, gridSquareWidth: 520, gridSquareHeight: 324 },
    { gridWidth: 573, gridSquareWidth: 596, gridSquareHeight: 340 },
    { gridWidth: 629, gridSquareWidth: 612, gridSquareHeight: 405 },
    { gridWidth: 680, gridSquareWidth: 730, gridSquareHeight: 405 },
    { gridWidth: 726, gridSquareWidth: 794, gridSquareHeight: 448 },
]

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

const MapGrid = () => {
    const { editorState }  = useContext(EditorContext);

    const [grid, setGrid] = useState([[]]);
    const [size, setSquareGrid] = useState({  width: 472, height: 292 });
    const [editorSquareWith, setEditorSquareWith] = useState(366)
    const [selectedColour, setColour] = useState("red");

    useEffect(() => {
        setGrid(makeGrid(size, "blue"))
      }, [size]);

    useEffect(() => {
        const dimensionIndex = Math.floor(editorState.currDimensions.width/50) - 3;
        if(scaleDimensions[dimensionIndex]){
            const { gridWidth, gridSquareWidth, gridSquareHeight } = scaleDimensions[dimensionIndex];
            setSquareGrid({ width: gridSquareWidth, height: gridSquareHeight });
            setEditorSquareWith(gridWidth);
        }


    }, [editorState.currDimensions])

    const handleClick = (position) => {
        const [y,x] = position.split(",");
        const tempGrid = grid.map(row => [...row]);
        tempGrid[y][x] = selectedColour;
    
        setGrid(tempGrid)
      }

    return (
        <div
          style={{
            width: editorSquareWith,
            height: 0,
            zIndex: 5,
            marginLeft: "-10px",
        }}>
          {grid && grid.map((row, rowIndex) => row.map((tile, tileIndex) => 
            <MapTile 
              key={`${rowIndex}-${tileIndex}`} 
              tileColour={tile} 
              position={[rowIndex, tileIndex]}
              onClick={handleClick}/>))
          }
        </div>
    )
}

export default MapGrid
