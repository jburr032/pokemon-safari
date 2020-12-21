import React from "react";
import { useDrop } from "react-dnd";
import ITEM_TYPE from "../misc/itemTypes";

const DropWrapper = ({ onDrop, family = "", children, index = 0, styles={} }) => {
    const [{ isOver }, drop] = useDrop({
        accept: `${ITEM_TYPE.MAP}`,
        drop: (item, monitor, map) => {
            onDrop(item, family, index);
        },

        collect: monitor => ({
            isOver: monitor.isOver()
        })
    });


    return (
        <div ref={drop} style={styles}>
            {React.cloneElement(children, { isOver })}
        </div>
    )
}

export default DropWrapper;
