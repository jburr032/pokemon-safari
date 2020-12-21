import React, { useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import ITEM_TYPES from "../misc/itemTypes";

const FRAMES = {
    FRAME_1: "frame1",
    FRAME_2: "frame2"
};

const DIRECTIONS = {
    UP: "up",
    DOWN: "down",
    LEFT: "left",
    RIGHT: "right"
};

const MonsterPlayer = ({ pokemonObj }) => {
    const [walkingImg, setWalkingImg] = useState([DIRECTIONS.DOWN, FRAMES.FRAME_1]);
    const [monsterMovement, setMonsterMovement] = useState({
        top: 0,
        left: 0,
        direction: DIRECTIONS.DOWN
      });

    // Places monster on dropped area
    useEffect(() => {
        setMonsterMovement(() => ({
            top: 0 + (pokemonObj.index[0] * 38),
            left: 0 + (pokemonObj.index[1] * 43.7),
            direction: DIRECTIONS.DOWN
        }))

    }, [pokemonObj.index]);


    const handleMovement = (e) => {
        switch(e.key){
            case("ArrowDown"):
                setMonsterMovement(prev => ({ ...prev, top: prev.top + 19, direction: DIRECTIONS.DOWN }));
                setWalkingImg(prev => prev[1] === FRAMES.FRAME_1 ? [DIRECTIONS.DOWN, FRAMES.FRAME_2] : [DIRECTIONS.DOWN, FRAMES.FRAME_1]);
                break;
        
            case("ArrowUp"):
                setMonsterMovement(prev => ({ ...prev, top: prev.top - 19, direction: DIRECTIONS.UP }));
                setWalkingImg(prev => prev[1] === FRAMES.FRAME_1 ? [DIRECTIONS.UP, FRAMES.FRAME_2] : [DIRECTIONS.UP, FRAMES.FRAME_1]);
                break;
        
            case("ArrowLeft"):
                setMonsterMovement(prev => ({ ...prev, left: prev.left - 19, direction: DIRECTIONS.LEFT }));
                setWalkingImg(prev => prev[1] === FRAMES.FRAME_1 ? [DIRECTIONS.LEFT, FRAMES.FRAME_2] : [DIRECTIONS.LEFT, FRAMES.FRAME_1]);
                break;
        
            case("ArrowRight"):
                setMonsterMovement(prev => ({ ...prev, left: prev.left + 19, direction: DIRECTIONS.RIGHT }));
                setWalkingImg(prev => prev[1] === FRAMES.FRAME_1 ? [DIRECTIONS.RIGHT, FRAMES.FRAME_2] : [DIRECTIONS.RIGHT, FRAMES.FRAME_1]);
                break;
        }

    }
      
    useEffect(() => {
        window.addEventListener("keydown", handleMovement);

        return() => window.removeEventListener("keydown", () => {}, true)
    }, []);

    const [{ isDragging }, drag, preview] = useDrag({
    item: {
            type: `${ITEM_TYPES.MAP}`,
            ...pokemonObj.monster,
            index: pokemonObj.index
        },
    });
    
    return (
        // Only renders an img if the object has properties
        Object.keys(pokemonObj.monster).length > 0 && 
            <img alt={pokemonObj.name} ref={drag}
                style={{ 
                    marginLeft: "-23px",
                    marginTop: "-35px",
                    height: "136px", 
                    width: "136px", 
                    zIndex: 2000, 
                    position: "absolute", 
                    top: monsterMovement.top, 
                    left: monsterMovement.left }} 
                src={pokemonObj.monster[walkingImg[0]][walkingImg[1]]} />
    )
}

export default MonsterPlayer
