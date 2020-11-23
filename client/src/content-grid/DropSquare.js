import React from "react";
import { useDrop } from "react-dnd";
import ITEM_TYPES from "./itemTypes"
import MapDraggable from "./MapDraggable";

const DropSquare = ({ style, tile, itemIndex }) => {

    return (
        <div style={style}>
            {tile.src && <MapDraggable map={tile} itemIndex={itemIndex} />}
        </div>
    )
}

export default DropSquare;
