import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import ITEM_TYPE from "./itemTypes";

const DropWrapper = ({ onDrop, family, children, index, editorSquaresArr, handleExpansion = () => {} }) => {
    const indexRef = useRef([0,0]);
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
        hover(){
            indexRef.current = indexRef.current[0] !== index[0] && indexRef.current[1] !== index[1];
            console.log(indexRef.current)
            // if(editorSquaresArr){
            //     setTimeout(() => {
            //         const editorArrLength = editorSquaresArr.length-1;
            //         if((index[0] === editorArrLength) || index[1] === editorSquaresArr[index[0]].length -1){
            //             // handleExpansion();
            //         }
            //     }, 2000)
            // }
             
        }
    });

    return (
        <div ref={drop}>
            {React.cloneElement(children, { isOver })}
        </div>
    )
}

export default DropWrapper;
