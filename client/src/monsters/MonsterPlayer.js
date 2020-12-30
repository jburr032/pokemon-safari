import React, { useState, useEffect, useContext, useCallback } from "react";
import { useDrag } from "react-dnd";
import ITEM_TYPES from "../misc/itemTypes";
import { MapContext } from "../state/mapContext";

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


const MONSTER_STEP = 20;

const MonsterPlayer = ({ pokemonObj }) => {
    const { mapState } = useContext(MapContext);

    const [positionIndex, setPositionIndex] = useState([]);
    const [walkingImg, setWalkingImg] = useState([DIRECTIONS.DOWN, FRAMES.FRAME_1]);
    const [monsterMovement, setCalculateMonsterMovement] = useState({
        top: 0,
        left: 0,
        direction: DIRECTIONS.DOWN,
 
      });
    const [calculatedMovement, setCalculatedMovement] = useState({
        top: 0,
        left: 0,
        direction: DIRECTIONS.DOWN
      })

    // Places monster on dropped area
    useEffect(() => {
        setCalculateMonsterMovement(() => ({
            top: 0 + (pokemonObj.index[0] * 41),
            left: 0 + (pokemonObj.index[1] * 41),
            direction: DIRECTIONS.DOWN,
 
        }));

        // Set the monster's position according to the 2D map array from mapState
        setPositionIndex(pokemonObj.index)

    }, [pokemonObj.index]);

    const handleMovement = useCallback((e) => {
        switch(e.key){
            case("ArrowDown"):
                setCalculateMonsterMovement(prev => {
                    if(Math.round((prev.top/41) + 2) > 11){
                        return prev;
                    } 
                    else {
                        return { ...prev, top: prev.top + MONSTER_STEP, direction: DIRECTIONS.DOWN } }});
                break;
        
            case("ArrowUp"):
                setCalculateMonsterMovement(prev => {
                    if(Math.round((prev.top/41)) < 0){
                        return prev;
                    } 
                    else return { ...prev, top: prev.top - MONSTER_STEP, direction: DIRECTIONS.UP } });
                break;
        
            case("ArrowLeft"):
                setCalculateMonsterMovement(prev => {
                    if(Math.round((prev.left/41)) < 0){
                        return prev;
                    } 
                    else return { ...prev, left: prev.left - MONSTER_STEP, direction: DIRECTIONS.LEFT }
                });
                break;
        
            case("ArrowRight"):
                setCalculateMonsterMovement(prev => {
                    if(Math.round((prev.left/41) + 2) > 11){
                        return prev;
                    } 
                    else return { ...prev, left: prev.left + MONSTER_STEP, direction: DIRECTIONS.RIGHT }
                
                });
                break;
            
            default:
                return monsterMovement;
        }

    }, [])
      
    useEffect(() => {
        window.removeEventListener("keydown", handleMovement)
        window.addEventListener("keydown", handleMovement);

        return() => window.removeEventListener("keydown", handleMovement)
    }, [mapState.currMap]);

    useEffect(() => {
        let location;
        let up;
        let down;
        let right;
        let left;

        switch(monsterMovement.direction){
            case("down"):
                right = Math.round(((monsterMovement.left/41) + 2)) > 11 ? 11 : Math.round(((monsterMovement.left/41) + 2));
                left = Math.round(((monsterMovement.left/41))) < 0 || Math.round(((monsterMovement.left/41))) === -0  ? 0 : Math.round(((monsterMovement.left/41)));

                console.log(Math.round(((monsterMovement.left/41) + 2)))
                location = Math.round(((monsterMovement.top/41) + 2)) > 11 ? 11 : Math.trunc(Math.round(((monsterMovement.top/41) + 2))) === 11 ? 10 : Math.round(((monsterMovement.top/41) + 2));

                console.log({
                    direction: 'down',
                    right: [right, mapState.currMap[location][right]],
                    left: [left, mapState.currMap[location][left]],
                    middle: [left+1, mapState.currMap[location][left+1]],
                })

                // Unwind calculation
                if(mapState.currMap[location][positionIndex[1]] === "red"){
                    setCalculatedMovement({ ...monsterMovement, top: monsterMovement.top - MONSTER_STEP });
                }

                setCalculatedMovement(monsterMovement);

                setWalkingImg(prev => prev[1] === FRAMES.FRAME_1 ? [DIRECTIONS.DOWN, FRAMES.FRAME_2] : [DIRECTIONS.DOWN, FRAMES.FRAME_1]);
                setPositionIndex(prev => [location, prev[1]]);

                break;
        
            case("up"):
                right = Math.round(((monsterMovement.left/41) + 2));
                left = Math.round(((monsterMovement.left/41))) < 0 || Math.round(((monsterMovement.left/41))) === -0  ? 0 : Math.round(((monsterMovement.left/41)));

                location = Math.round(((monsterMovement.top/41))) < 0 || Math.round(((monsterMovement.top/41))) === -0  ? 0 : Math.round(((monsterMovement.top/41)));

                console.log({
                    direction: 'up',
                    right: [right, mapState.currMap[location][right]],
                    left: [left, mapState.currMap[location][left]]
                })


                // Unwind calculation
                if(mapState.currMap[location][positionIndex[1]] === "red"){
                    setCalculatedMovement({ ...monsterMovement, top: monsterMovement.top + MONSTER_STEP });
                }
        
                setCalculatedMovement(monsterMovement);
                setWalkingImg(prev => prev[1] === FRAMES.FRAME_1 ? [DIRECTIONS.UP, FRAMES.FRAME_2] : [DIRECTIONS.UP, FRAMES.FRAME_1]);
                setPositionIndex(prev => [location, prev[1]]);

                break;
        
            case("left"):
                up = Math.round(((monsterMovement.top/41))) < 0 || Math.round(((monsterMovement.top/41))) === -0  ? 0 : Math.round(((monsterMovement.top/41)));
                down = Math.round(((monsterMovement.top/41) + 2)) > 11 ? 11 : Math.trunc(Math.round(((monsterMovement.top/41) + 2))) === 11 ? 10 : Math.round(((monsterMovement.top/41) + 2)) 

                location = Math.round(((monsterMovement.left/41))) < 0 || Math.round(((monsterMovement.left/41))) === -0  ? 0 : Math.round(((monsterMovement.left/41)));

                console.log({
                    direction: 'left',
                    up: [up, mapState.currMap[up][location]],
                    down: [down, mapState.currMap[down][location]]
                })


                // Unwind calculation
                if(mapState.currMap[positionIndex[0]][location] === "red"){
                    setCalculatedMovement({ ...monsterMovement, left: monsterMovement.left + MONSTER_STEP });
                }

                setCalculatedMovement(monsterMovement);
                setWalkingImg(prev => prev[1] === FRAMES.FRAME_1 ? [DIRECTIONS.LEFT, FRAMES.FRAME_2] : [DIRECTIONS.LEFT, FRAMES.FRAME_1]);
                setPositionIndex(prev => [prev[0], location]);

                break;
        
            case("right"):
                up = Math.round(((monsterMovement.top/41))) < 0 || Math.round(((monsterMovement.top/41))) === -0  ? 0 : Math.round(((monsterMovement.top/41)));
                down = Math.round(((monsterMovement.top/41) + 2)) > 11 ? 11 : Math.trunc(Math.round(((monsterMovement.top/41) + 2))) === 11 ? 10 : Math.round(((monsterMovement.top/41) + 2));

                location = Math.round(((monsterMovement.left/41) + 2)) > 11 ? 11 : Math.round(((monsterMovement.left/41) + 2));

                console.log({
                    direction: 'right',
                    right: [location, mapState.currMap[up][location]],
                    up: [up, mapState.currMap[up][location]],
                    down: [down, mapState.currMap[down][location]]
                })

                // Unwind calculation
                if(mapState.currMap[positionIndex[0]][location] === "red"){
                    setCalculatedMovement({ ...monsterMovement, left: monsterMovement.left - MONSTER_STEP });
                }

                setCalculatedMovement(monsterMovement);
                setWalkingImg(prev => prev[1] === FRAMES.FRAME_1 ? [DIRECTIONS.RIGHT, FRAMES.FRAME_2] : [DIRECTIONS.RIGHT, FRAMES.FRAME_1]);
                setPositionIndex(prev => [prev[0], location]);

                break;
        }
    }, [monsterMovement])


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
                    height: "130px", 
                    width: "130px", 
                    zIndex: 2000, 
                    position: "absolute", 
                    top: calculatedMovement.top, 
                    left: calculatedMovement.left,
                 }} 
                src={pokemonObj.monster[walkingImg[0]][walkingImg[1]]} />
    )
}

export default MonsterPlayer
