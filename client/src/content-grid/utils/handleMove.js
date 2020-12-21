/**
 * 
 * See attempted refactor in dropHandlers.js
 * 
 */
import ITEM_TYPES from "../../misc/itemTypes";

// @PARAMETER baseItem is the item being moved
// @PARAMETER index is the target's zone - will need to be an array even if only one element
// handleMove(sidebarArr, editorArr, baseItem, family, index)
export const handleMove = (sideBarArr, editorArr, baseItem, family, index) => {
    const item = {...baseItem};
    const emptyDroppableSquare = {family: ITEM_TYPES.EDITOR, type: ITEM_TYPES.MAP,src: "" };
    
    if(item.family === ITEM_TYPES.SIDE_BAR && family === ITEM_TYPES.EDITOR){
        item.family = family;


        if(editorArr[index[0]][index[1]].src !== ""){
            // Get the item in the editor that will swapped out
            const itemInEditor = {...editorArr[index[0]][index[1]]};
            itemInEditor.family = ITEM_TYPES.SIDE_BAR;

            sideBarArr[0].splice(item.itemIndex[1], 1);

            const emptyTiles = sideBarArr[0].filter(tile => tile.src === "");
            const mapTiles = sideBarArr[0].filter(tile => tile.src !== "");
            mapTiles.push(itemInEditor);
            sideBarArr[0] = [...mapTiles, ...emptyTiles];

            editorArr[index[0]].splice(index[1], 1, item);            
        }else{
            editorArr[index[0]][index[1]] = item;
            sideBarArr[0].splice(item.itemIndex[1], 1);
        }

        if(sideBarArr[0].length < 5){
               sideBarArr[0].push({family: ITEM_TYPES.SIDE_BAR, type: ITEM_TYPES.MAP,src: "" });
        }else{
            sideBarArr[0].pop();
        }
    }

    else if(item.family === ITEM_TYPES.EDITOR && family === ITEM_TYPES.SIDE_BAR){
        item.family = family;

        sideBarArr[index[0]].splice(index[1], 0, item);
        const emptyTiles = sideBarArr[index[0]].filter(tile => tile.src === "");
        const mapTiles = sideBarArr[index[0]].filter(tile => tile.src !== "");
        emptyTiles.pop();
        sideBarArr[index[0]] = [...mapTiles, ...emptyTiles];
        editorArr[item.itemIndex[0]][item.itemIndex[1]] = {...emptyDroppableSquare};

        if(sideBarArr[index[0]].length < 5){
            sideBarArr[index[0]].push({family: ITEM_TYPES.SIDE_BAR, type: ITEM_TYPES.MAP,src: "" });
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
        const [y, x] = index;
        const itemInEditor = {...sideBarArr[y][x]};
        
        sideBarArr[y][x] = item;
        sideBarArr[item.itemIndex[0]][item.itemIndex[1]] = itemInEditor;

        const emptyTiles = sideBarArr[y].filter(tile => tile.src === "");
        const mapTiles = sideBarArr[y].filter(tile => tile.src !== "");
        sideBarArr = [[...mapTiles, ...emptyTiles]];
    }

    return { sideBarArr, editorArr };

};