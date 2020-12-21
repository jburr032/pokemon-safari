import React from "react";

export default function MapTile({ tileColour, position, onClick }){
    const styles = {
      width: "39px",
      transform: "translateY(25%) translateX(15px)",
      height: "39px",
      display: "inline-flex",
      zIndex: 2,
      color: "transparent",
      backgroundColor: tileColour,
      opacity: "30%",
      position: "relative",
      border: "1px solid white",
      cursor: "pointer"
    }
  
  return <div id={position} style={styles} onClick={(e) => onClick(e.target.id)} />


}


