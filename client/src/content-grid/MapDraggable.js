import React, { useState } from "react";
import { useDrag } from "react-dnd";
import ITEM_TYPES from "./itemTypes";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  editButtonStyles: { 
    position: "relative", 
    float: "left", 
    marginLeft: "10%", 
    width: "29%" 
  },
  resetButtonStyles: { 
    position: "relative", 
    float: "right", 
    marginRight: "10%", 
    width: "29%"  
  }
})

const MapDraggable = ({ map, family, itemIndex }) => {
    const [showBtns, setBtns] = useState(false);
    const classes = useStyles();
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
    
    const handleMouseEnter = () => {
      setBtns(true);
    }
    
    const handleMouseExit = () => {
      setBtns(false);
    }
    
    return (
            <div style={{ opacity: isDragging ? 0 : 1, width: "100%", height: "100%" }} ref={drag}>
                    {(map.src !== "" && map.family === ITEM_TYPES.EDITOR ) ? 
                     <div style={{ position: "relative", height: "100%", width: "100%" }}>
                        <img 
                            onMouseEnter={handleMouseEnter} 
                            onMouseLeave={handleMouseExit}
                            style={{ position: 'absolute' }} 
                            src={map.src} 
                            alt="map" 
                            width="100%" 
                            height="100%"
                          />
                          {showBtns && <div style={{ top: "75%", position: "relative" }}>
                            <Button className={classes.editButtonStyles} onMouseEnter={handleMouseEnter} variant="contained" color="primary">EDIT</Button>
                            <Button className={classes.resetButtonStyles} onMouseEnter={handleMouseEnter} variant="contained" color="secondary">RESET</Button>
                          </div>}
                      </div> : 
                      
                     <img src={map.src} alt="map" width="100%" height="100%" />
                    }
            </div>
    )
}

export default MapDraggable
