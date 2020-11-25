import React from "react";
import { useDrag } from "react-dnd";
import ITEM_TYPES from "./itemTypes";

const MapDraggable = ({ map, family, itemIndex }) => {
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
    
    return (
            <div style={{ opacity: isDragging ? 0 : 1 }} ref={drag}>
                <img src={map.src} alt="map" width="100%" height="100%" />
            </div>
    )
}

export default MapDraggable
