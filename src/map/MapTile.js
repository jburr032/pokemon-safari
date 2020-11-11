import React, { useState, useContext, useEffect } from "react";
import {MapContext, mapTypes} from "../state/mapContext";

export default function MapTile({ position }){
    const [currColour, setCurrColour] = useState("blue");
    const {mapState, dispatch} = useContext(MapContext);

    useEffect(() => {
      dispatch({ type: mapTypes.UPDATE_MAP, payload: [currColour, position]})

    }, [currColour])

    const handleColourClick = () => {
      console.log(mapState.selectedColour)
      setCurrColour(mapState.selectedColour)
    }

   const styles= {
        width: "16px",
        transform: "translateY(25%) translateX(15px)",
        height: "16px",
        display: "inline-flex",
        zIndex: 2,
        color: "transparent",
        backgroundColor: currColour,
        opacity: "30%",
        position: "relative",
        border: "1px solid white",
        cursor: "pointer"
      }
    
    return <div onMouseEnter={() => console.log(position)} style={styles} onClick={handleColourClick}>0</div>
}