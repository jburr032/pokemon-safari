import React from "react";
import { useDrop } from "react-dnd";
import ITEM_TYPE from "./itemTypes";
import { editorList } from "./data";

const DropWrapper = ({ onDrop, family, children, index, expandEditorGrid }) => {
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
        }),
        hover(item){
            expandEditorGrid(index);
        }
    });

    return (
        <div ref={drop}>
            {React.cloneElement(children, { isOver })}
        </div>
    )
}

export default DropWrapper;
