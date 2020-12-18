import React from "react";

export default function MapTile({ tileColour, position, onClick }){
    const styles = {
      width: "72px",
      transform: "translateY(25%) translateX(15px)",
      height: "72px",
      display: "inline-flex",
      zIndex: 2,
      color: "transparent",
      backgroundColor: tileColour,
      opacity: "30%",
      position: "relative",
      border: "1px solid white",
      cursor: "pointer"
    }
    return <div id={position} style={styles} onClick={(e) => onClick(e.target.id)}>0</div>
}


