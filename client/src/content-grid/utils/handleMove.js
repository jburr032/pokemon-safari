/**
 * 
 * See attempted refactor in dropHandlers.js
 * 
 */
import ITEM_TYPES from "../itemTypes";

export const handleMove = (newItems, baseItem, family, index) => {
    const item = {...baseItem};
    const emptyDroppableSquare = {family: ITEM_TYPES.EDITOR, type: ITEM_TYPES.MAP,src: "" }

    let editorArr = [...newItems].filter(item => item.family === ITEM_TYPES.EDITOR);
    let sideBarArr = [...newItems].filter(item => item.family === ITEM_TYPES.SIDE_BAR);

    
    if(item.family === ITEM_TYPES.SIDE_BAR && family === ITEM_TYPES.EDITOR){
        item.family = family;


        if(editorArr[index].src !== ""){
            // Get the item in the editor that will swapped out
            const itemInEditor = {...editorArr[index]};
            itemInEditor.family = ITEM_TYPES.SIDE_BAR;

            sideBarArr.splice(item.itemIndex, 1);

            const emptyTiles = sideBarArr.filter(tile => tile.src === "");
            const mapTiles = sideBarArr.filter(tile => tile.src !== "");
            mapTiles.push(itemInEditor);
            sideBarArr = [...mapTiles, ...emptyTiles];

            editorArr.splice(index, 1, item);            
        }else{
            editorArr[index] = item;
            sideBarArr.splice(item.itemIndex, 1);
        }

        if(sideBarArr.length < 5){
               sideBarArr.push({family: ITEM_TYPES.SIDE_BAR, type: ITEM_TYPES.MAP,src: "" });
        }else{
            sideBarArr.pop();
        }
    }

    else if(item.family === ITEM_TYPES.EDITOR && family === ITEM_TYPES.SIDE_BAR){
        item.family = family;

        sideBarArr.splice(index, 0, item);
        const emptyTiles = sideBarArr.filter(tile => tile.src === "");
        const mapTiles = sideBarArr.filter(tile => tile.src !== "");
        emptyTiles.pop();
        sideBarArr = [...mapTiles, ...emptyTiles];
        editorArr[item.itemIndex] = {...emptyDroppableSquare};

        if(sideBarArr.length < 5){
            sideBarArr.push({family: ITEM_TYPES.SIDE_BAR, type: ITEM_TYPES.MAP,src: "" });
        }

    }

    else if(item.family === ITEM_TYPES.EDITOR && family === ITEM_TYPES.EDITOR){
        if(editorArr[index].src === ""){
            editorArr[index] = item;
            editorArr[item.itemIndex] = {...emptyDroppableSquare};
        }

    }

    // Move map within sidebar
    else{
        const itemInEditor = {...sideBarArr[index]};

        sideBarArr[index] = item;
        sideBarArr[item.itemIndex] = itemInEditor;

        const emptyTiles = sideBarArr.filter(tile => tile.src === "");
        const mapTiles = sideBarArr.filter(tile => tile.src !== "");
        sideBarArr = [...mapTiles, ...emptyTiles];
    }

    return [...sideBarArr, ...editorArr]

};