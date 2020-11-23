import React, {useRef} from "react";
import { useDrag, useDrop, DragPreviewImage } from "react-dnd";
import ITEM_TYPES from "./itemTypes";

const MapDraggable = ({ map, family, itemIndex }) => {

    const [{ isDragging }, drag, preview] = useDrag({
        item: {
          type: `${ITEM_TYPES.MAP}`,
          map: {...map},
          itemIndex
        },
        collect: (monitor) => {
          return { isDragging: !!monitor.isDragging() }
        },
      });
    
    return (
        <>
            <DragPreviewImage connect={<div>{preview}</div>} src={map.src} />
            <div style={{ opacity: isDragging ? 0 : 1 }} ref={drag}>
                <img src={map.src} width="100%" height="100%" />
            </div>
        </>
    )
}

export default MapDraggable
