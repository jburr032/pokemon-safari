import React from "react";
import { useDrag, DragPreviewImage } from "react-dnd";
import { Typography } from "@material-ui/core";
import ITEM_TYPES from "../misc/itemTypes";
import { v4 as uuidv4 } from "uuid";

const MonsterDraggable = ({ spriteIndex, pokemonDetails }) => {
    const [{ isDragging }, drag, preview] = useDrag({
        item: {
          type: `${ITEM_TYPES.MAP}`,
          ...pokemonDetails,
          spriteIndex, 
          id: uuidv4()
        },
        collect: (monitor) => {
          return { isDragging: !!monitor.isDragging() }
        },
      });
    
    return <div
            style={{
            display: "inline-flex",
            position: "relative",
            width: "110px",
            opacity: isDragging ? 0 : 1
            }}
            ref={drag}>
                <DragPreviewImage src={pokemonDetails.down.frame1} connect={preview} />
                
                <img src={pokemonDetails.battleSprite} style={{ cursor: "pointer", paddingBottom: "20px" }} />
                <Typography style={{ position: "absolute", bottom: 0 }}>{pokemonDetails.name}</Typography>
        </div>
}

export default MonsterDraggable;