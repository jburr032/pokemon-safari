import React, {useState} from "react";
import DropWrapper from "./DropWrapper";
import DropSquare from "./DropSquare";
import { dropTiles, dropZones } from "./data";
import ITEM_TYPES from "./itemTypes";

const handleMove = (newItems, baseItem, family, index) => {
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

const ContentContainer = () => {
    const [tiles, setTiles] = useState(dropTiles);

    const onDrop = (item, family, index) => {
        setTiles(prevState => {
            let newItems = [...prevState];
            
            newItems = handleMove(newItems, item, family, index);
            return newItems;
        });
    };

    const editorSquareStyles = {
        border: "1px dashed black", 
        width: "386.9px", 
        height: "397.5px",
        flex: "33.4%"
    };

    const mapSquareStyles = {
        border: "1px solid black", 
        float: "left", 
        width: "175px", 
        height: "125px",
        marginLeft: "30px",
        marginTop: "20px"
    };

    const sidebarEmptyTile = {
        float: "left", 
        width: "254px", 
        height: "125px"
    }

    return (
        <div style={{ height: "75%", width: "1416px", display: "inline-flex"}}>
            {dropZones.map((zone) => {
                let renderTiles;
                const returnedTiles = tiles.filter(tile => tile.family === zone.type);
                const tileStyle = zone.type === ITEM_TYPES.SIDE_BAR ? mapSquareStyles : editorSquareStyles;
                const mapTilesLength = returnedTiles.filter(tile => tile.src !== "").length;

                if(zone.type === ITEM_TYPES.SIDE_BAR && mapTilesLength === 0){
                    console.log('tiles', tiles)

                    if(mapTilesLength === 0){
                        console.log('returnedTiles if')
                        const emptySidebarTile = { family: ITEM_TYPES.EDITOR, type: ITEM_TYPES.MAP,src: "" };
                        renderTiles = <DropWrapper onDrop={onDrop} family={zone.type} index={0}>
                                                    <DropSquare tile={emptySidebarTile} style={{...zone.style, width: "100%"}} family={zone.type} itemIndex={0} />
                                            </DropWrapper>;
                    }

                }

                else{
                    renderTiles = returnedTiles.map((tile, index) => 
                        <DropWrapper onDrop={onDrop} family={zone.type} index={index}>
                            <DropSquare tile={tile} style={tile.family === ITEM_TYPES.SIDE_BAR && tile.src === "" ? sidebarEmptyTile : tileStyle} family={zone.type} itemIndex={index} />
                        </DropWrapper>
                )}

                return <div style={zone.style}>{renderTiles}</div>
            })}
        </div>
    )
}

export default ContentContainer;
