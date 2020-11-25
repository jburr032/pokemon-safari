import React from "react";
import { useDrop } from "react-dnd";
import ITEM_TYPES from "./itemTypes"
import MapDraggable from "./MapDraggable";

const DropSquare = ({ style, tile, family, itemIndex }) => {

    return (
        <div style={style}>
            {tile.src && <MapDraggable map={tile} family={family} itemIndex={itemIndex} />}
        </div>
    )
}

export default DropSquare;
