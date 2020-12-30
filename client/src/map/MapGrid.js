import React, { useState, useEffect, useContext, useRef } from "react"
import MapTile from "./MapTile";
import { EditorContext } from "../state/editorContext";
import DropWrapper from "../content-grid/DropWrapper";
import MonsterPlayer from "../monsters/MonsterPlayer";
import { MapContext } from "../state/mapContext";

const gridContainerStyles = {
  width: "488px",
  height: "530px",
  zIndex: 5,
  marginLeft: "7%",
  marginTop: "80px"
};

const mapTilesContainerStyles = { 
  position: "absolute", 
  width: "500px", 
  height: "468px",
  top: "153px"
};

const makeGrid = (size, tileColour) => {
    let grid = [];
  
    for (let i = 0; i < size.height/39; i++) {
      let row = [];
      for (let j = 0; j < size.width/39; j++) {
        row.push(tileColour);
      }
  
      grid.push(row);
    }
  
    return grid;
  };

const MapGrid = ({ monsterToRemoveId, setMonsterToRemove }) => {
    const { editorState, editorDispatcher }  = useContext(EditorContext);
    const { mapState, dispatch } = useContext(MapContext);

    const [grid, setGrid] = useState([[]]);
    const [size, setSquareGrid] = useState({ width: 439, height: 440 });
    const [monstersToAdd, setMonsterToAdd] = useState([]);
    const [selectedColour, setColour] = useState("red");
    const mapRef = useRef(<img src="/maps/bills.png" alt="map" width="100%" height="100%" style={{ paddingLeft: "20px", paddingTop: "23px", position: ""}} />);

    useEffect(() => {
      const grid = makeGrid(size, "blue");
      setGrid(grid);
      dispatch({ type: "CHANGE_MAP", payload: grid });


    // eslint-disable-next-line 
    }, [])

    useEffect(() => {
      if(monsterToRemoveId === "all"){
        setMonsterToAdd([]);
        setMonsterToRemove("");
      }
      
      else if(monsterToRemoveId.length > 0){
        let tempMonsters = [...monstersToAdd];
        tempMonsters = tempMonsters.filter(monster => monsterToRemoveId !== monster.monster.id);
        setMonsterToAdd(tempMonsters);
      }

    // eslint-disable-next-line 
    }, [monsterToRemoveId])

    const onDrop = (item, family, index) => {
      let tempMonsters = [...monstersToAdd];
      tempMonsters = tempMonsters.filter(monster => item.id !== monster.monster.id);

      tempMonsters.push({
        index, monster: item
      });

      setMonsterToAdd(tempMonsters);
    };

    const handleClick = (position) => {
        const [y,x] = position.split(",");
        const tempGrid = grid.map(row => [...row]);
        tempGrid[y][x] = selectedColour;
    
        console.log('COLOURED', position)
        setGrid(tempGrid);
        dispatch({ type: "CHANGE_MAP", payload: tempGrid });
      }

    return (
        <div style={gridContainerStyles}>
          <div style={mapTilesContainerStyles}>
            {grid && grid.map((row, rowIndex) => row.map((tile, tileIndex) => 
                <DropWrapper key={`${rowIndex}-${tileIndex}`} onDrop={onDrop} styles={{display: "inline-flex" }} index={[rowIndex, tileIndex]}>
                  <MapTile 
                    key={`${rowIndex}-${tileIndex}`} 
                    tileColour={tile} 
                    position={[rowIndex, tileIndex]}
                    onClick={handleClick}/>
                </DropWrapper>))}
          {monstersToAdd.map(monster => <MonsterPlayer pokemonObj={monster}/>)}
          </div>
            {mapRef.current}
        </div>
    )
}

export default MapGrid


