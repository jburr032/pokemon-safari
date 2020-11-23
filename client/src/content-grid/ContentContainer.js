import React, {useState} from "react";
import DropWrapper from "./DropWrapper";
import DropColumns from "./DropColumns";
import DropSquare from "./DropSquare";
import { dropTiles, dropZones } from "./data";
import ITEM_TYPES from "./itemTypes";

const ContentContainer = () => {
    const [tiles, setTiles] = useState(dropTiles);

    const onDrop = (item, family, index) => {
        setTiles(prevState => {
            const newItems = [...prevState];
            let editorArr = newItems.filter(item => item.family === ITEM_TYPES.EDITOR);
            let sideBarArr = newItems.filter(item => item.family === ITEM_TYPES.SIDE_BAR);
            
            item.map.family = family;
            
            if(family === ITEM_TYPES.EDITOR){
                editorArr[index] = item.map;
                sideBarArr.splice(item.itemIndex, 1, item);
                console.log(sideBarArr)
            }else{
                sideBarArr[index] = item.map;
            }
            
            return [...sideBarArr, ...editorArr];
        });
    };

    const editorSquareStyles = {
        border: "1px solid black", 
        width: "350px", 
        height: "350px",
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

    return (
        <div style={{ height: "75%", width: "1216px", display: "inline-flex"}}>
            {dropZones.map((zone) => {
                const returnedTiles = tiles.filter(tile => tile.family === zone.type);
                const tileStyle = zone.type === ITEM_TYPES.SIDE_BAR ? mapSquareStyles : editorSquareStyles;

                const renderTiles = returnedTiles.map((tile, index) => 
                        <DropWrapper onDrop={onDrop} family={zone.type} index={index}>
                            <DropSquare tile={tile} style={tileStyle} family={zone.type} itemIndex={index} />
                        </DropWrapper>
                )

                return <div style={zone.style}>{renderTiles}</div>
            })}
        </div>
    )
}

export default ContentContainer;
