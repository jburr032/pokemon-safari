import React, { useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import ITEM_TYPES from "./itemTypes";
import MapTile from "../map/MapTile";

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

const MapDraggable = ({ map, family, itemIndex }) => {
    const [grid, setGrid] = useState([[]]);
    const [size, setSize] = useState({width: 352, height: 256 });
    const [selectedColour, setColour] = useState("red");

    const handleClick = (position) => {
      const [y,x] = position.split(",");
      const tempGrid = grid.map(row => [...row]);
      tempGrid[y][x] = selectedColour;
  
      setGrid(tempGrid)
    }

    useEffect(() => {
      setGrid(makeGrid(size, "blue"))
    }, [])

    const [{ isDragging }, drag] = useDrag({
        item: {
          type: `${ITEM_TYPES.MAP}`,
          ...map,
          itemIndex
        },
        collect: (monitor) => {
          return { isDragging: !!monitor.isDragging() }
        },
      });
    
    return (
            <div style={{ opacity: isDragging ? 0 : 1, width: "100%", height: "100%" }} ref={drag}>
                    {(map.src !== "" && map.family === ITEM_TYPES.EDITOR )? <>
                    <div
                      style={{
                      width: 368,
                      height: 0,
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
                  <img src={map.src} alt="map" width="100%" height="100%" />
                </>
                                  :
                 <img src={map.src} alt="map" width="100%" height="100%" />

                }
            </div>
    )
}

export default MapDraggable
