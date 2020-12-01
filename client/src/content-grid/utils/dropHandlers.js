import ITEM_TYPES from "../itemTypes";

export const handleDrop =(newItems, baseItem, family, index) => {
    const item = {...baseItem};
    const emptyEditSquare = {family: ITEM_TYPES.EDITOR, type: ITEM_TYPES.MAP,src: "" };
    const emptySideBarSquare = {family: ITEM_TYPES.SIDE_BAR, type: ITEM_TYPES.MAP,src: "" };
    let editorArr = [];
    let sideBarArr = [];

    [...newItems].forEach(tile => tile.src !== "" ? sideBarArr.push({...tile}) : editorArr.push({...tile}))

    const switchString = `${item.family}-${family}`;

    switch(switchString){
        case("SIDE_BAR-EDITOR"):
            return moveSidebarToEditor(item, sideBarArr, editorArr, index, family, emptySideBarSquare);

        case("EDITOR-SIDE_BAR"):
            return moveEditorToSidebar(item, sideBarArr, editorArr, index, family, emptySideBarSquare, emptyEditSquare);

        case("EDITOR-EDITOR"):
            return moveEditorToEditor(item, sideBarArr, editorArr, index, emptyEditSquare);

        case("SIDE_BAR-SIDE_BAR"):
            return moveSidebarToSidebar(item, sideBarArr, editorArr, index);
        
        default:
            return newItems;
    }
}

// utils for side-bar to editor
const checkTargetInEditor = (sideBarArr, editorArr, index, item) => {
    if(editorArr[index].src !== ""){
        const emptyTiles = [];
        const mapTiles = [];

        // Get the item in the editor that will swapped out
        const itemInEditor = {...editorArr[index]};
        itemInEditor.family = ITEM_TYPES.SIDE_BAR;

        sideBarArr.splice(item.itemIndex, 1);

        sideBarArr.forEach(tile => tile.src !== "" ? mapTiles.push({...tile}) : emptyTiles.push({...tile}));

        mapTiles.push(itemInEditor);
        sideBarArr = [...mapTiles, ...emptyTiles];

        editorArr.splice(index, 1, item);            
    }else{
        editorArr[index] = item;
        sideBarArr.splice(item.itemIndex, 1);
    }

    return [sideBarArr, editorArr]
}

const moveSidebarToEditor = (item, sideBarArr, editorArr, index, family, emptySideBarSquare) => {
    item.family = family;

    const [updatedSidebar, updatedEditorArr] = checkTargetInEditor(sideBarArr, editorArr, index, item);

    if(updatedSidebar.length < 5) updatedSidebar.push({...emptySideBarSquare});
    else updatedSidebar.pop();

    return [...updatedSidebar, ...updatedEditorArr]

}

const moveEditorToSidebar = (item, sideBarArr, editorArr, index, family, emptySideBarSquare, emptyEditSquare) => {
    const emptyTiles = [];
    const mapTiles = [];

    item.family = family;
    console.log('index', index)
    console.log('item', item)

    sideBarArr.splice(index, 0, item);
    console.log('sideBarArr', sideBarArr)

    sideBarArr.forEach(tile => tile.src !== "" ? mapTiles.push({...tile}) : emptyTiles.push({...tile}))

    // const emptyTiles = sideBarArr.filter(tile => tile.src === "");
    // const mapTiles = sideBarArr.filter(tile => tile.src !== "");

    emptyTiles.pop();

    sideBarArr = [...mapTiles, ...emptyTiles];
    editorArr[item.itemIndex] = {...emptyEditSquare};

    if(sideBarArr.length < 5) sideBarArr.push(emptySideBarSquare);
    
    return [...sideBarArr, ...editorArr]
}

const moveEditorToEditor = (item, sideBarArr, editorArr, index, emptyEditSquare) => {
    if(editorArr[index].src === ""){
        editorArr[index] = item;
        editorArr[item.itemIndex] = {...emptyEditSquare};
    }

    return [...sideBarArr, ...editorArr]
}

const moveSidebarToSidebar = (item, sideBarArr, editorArr, index) => {
    const emptyTiles = [];
    const mapTiles = [];

    const itemInEditor = {...sideBarArr[index]};

    sideBarArr[index] = item;
    sideBarArr[item.itemIndex] = itemInEditor;

    sideBarArr.forEach(tile => tile.src !== "" ? mapTiles.push({...tile}) : emptyTiles.push({...tile}))

    // const emptyTiles = sideBarArr.filter(tile => tile.src === "");
    // const mapTiles = sideBarArr.filter(tile => tile.src !== "");

    sideBarArr = [...mapTiles, ...emptyTiles];

    return [...sideBarArr, ...editorArr]
}

