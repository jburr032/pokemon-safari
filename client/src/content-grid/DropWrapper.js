import React from "react";
import { useDrop } from "react-dnd";
import ITEM_TYPE from "./itemTypes";

const DropWrapper = ({ onDrop, family, children, index, editorSquaresArr, handleExpansion = () => {} }) => {
    const [{ isOver }, drop] = useDrop({
        accept: `${ITEM_TYPE.MAP}`,
        // canDrop: (item, monitor) => {
        //     // TODO: implement canDrop
        // },
        drop: (item, monitor, map) => {
            onDrop(item, family, index);
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    });

    return (
        <div ref={drop}>
            {React.cloneElement(children, { isOver })}
        </div>
    )
}

export default DropWrapper;
