import React, { useContext } from "react";

export default function MapTile({ tileColour }){
    
   const styles= {
        width: "16px",
        transform: "translateY(25%) translateX(15px)",
        height: "16px",
        display: "inline-flex",
        zIndex: 2,
        color: "transparent",
        backgroundColor: tileColour,
        opacity: "30%",
        position: "relative",
        border: "1px solid white",
      }
    
    return <div style={styles}>0</div>
}