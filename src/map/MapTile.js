import React, { useState } from "react";

export default function MapTile({ tileColour }){
    const [defaultColour, setDefault] = useState("blue");

    const handleColourClick = () => {
      if(tileColour !== defaultColour) setDefault(tileColour);
    }

   const styles= {
        width: "16px",
        transform: "translateY(25%) translateX(15px)",
        height: "16px",
        display: "inline-flex",
        zIndex: 2,
        color: "transparent",
        backgroundColor: defaultColour,
        opacity: "30%",
        position: "relative",
        border: "1px solid white",
        cursor: "pointer"
      }
    
    return <div style={styles} onClick={handleColourClick}>0</div>
}