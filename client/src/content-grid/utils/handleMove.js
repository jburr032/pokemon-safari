/**
 * 
 * See attempted refactor in dropHandlers.js
 * 
 */
import ITEM_TYPES from "../itemTypes";

// @PARAMETER baseItem is the item being moved
// @PARAMETER index is the target's zone - will need to be an array even if only one element
// handleMove(sidebarArr, editorArr, baseItem, family, index)
export const handleMove = (sideBarArr, editorArr, baseItem, family, index) => {
    const item = {...baseItem};
    const emptyDroppableSquare = {family: ITEM_TYPES.EDITOR, type: ITEM_TYPES.MAP,src: "" }

    // let editorArr = [...newItems].filter(item => item.family === ITEM_TYPES.EDITOR);
    // let sideBarArr = [...newItems].filter(item => item.family === ITEM_TYPES.SIDE_BAR);

    
    if(item.family === ITEM_TYPES.SIDE_BAR && family === ITEM_TYPES.EDITOR){
        item.family = family;


        if(editorArr[index[0]][index[1]].src !== ""){
            // Get the item in the editor that will swapped out
            const itemInEditor = {...editorArr[index[0]][index[1]]};
            itemInEditor.family = ITEM_TYPES.SIDE_BAR;

            sideBarArr.splice(item.itemIndex, 1);

            const emptyTiles = sideBarArr.filter(tile => tile.src === "");
            const mapTiles = sideBarArr.filter(tile => tile.src !== "");
            mapTiles.push(itemInEditor);
            sideBarArr = [...mapTiles, ...emptyTiles];

            editorArr[index[0]].splice(index[1], 1, item);            
        }else{
            editorArr[index[0]][index[1]] = item;
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
        editorArr[item.itemIndex[0]][item.itemIndex[1]] = {...emptyDroppableSquare};

        if(sideBarArr.length < 5){
            sideBarArr.push({family: ITEM_TYPES.SIDE_BAR, type: ITEM_TYPES.MAP,src: "" });
        }

    }

    else if(item.family === ITEM_TYPES.EDITOR && family === ITEM_TYPES.EDITOR){
        if(editorArr[index[0]][index[1]].src === ""){
            editorArr[index[0]][index[1]] = item;
            editorArr[item.itemIndex[0]][item.itemIndex[1]] = {...emptyDroppableSquare};
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

    return { sideBarArr, editorArr };

};