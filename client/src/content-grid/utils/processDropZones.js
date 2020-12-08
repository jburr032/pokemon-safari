import { TableRow, TableCell, ListItem } from '@material-ui/core';
import ITEM_TYPES from "../itemTypes";
import { editorWindow, sidebarWindow, mapSquareStyles, sidebarEmptyTile } from "./dropZoneStyles";
import DropWrapper from "../DropWrapper";
import DropSquare from "../DropSquare";

const defineSidebarComponents = (dropFunction, zone, index, tile, styling, editorSquaresArr = ()=>{}) => {
    return <DropWrapper onDrop={dropFunction} family={zone.type} index={index} editorSquaresArr={editorSquaresArr}>
            <DropSquare tile={tile} style={styling} family={zone.type} itemIndex={index} />
        </DropWrapper>
}

export default (zone, onDrop, prevTileState, editorSquareStyles="") => {
    let tilesToProcess;
    let processedTiles;
    let windowStyle;

    if(zone.type === ITEM_TYPES.SIDE_BAR){
        tilesToProcess = [...prevTileState];
        windowStyle = sidebarWindow;

        // Sets a div the full width of the sidebar for a dropzone area
        if(tilesToProcess[0].length === 0){
            const tile = { family: ITEM_TYPES.EDITOR, type: ITEM_TYPES.MAP,src: "" };

            processedTiles =
            <ListItem>
                {defineSidebarComponents(onDrop, zone, 0, tile, {...windowStyle, width: "100%"})}
            </ListItem>

        }else{
            processedTiles = tilesToProcess.map((tileRow, rowIndex) => tileRow.map((tile, index) => 
                <ListItem key={`${tile.family}-${index}`}>
                    {defineSidebarComponents(onDrop, zone, [rowIndex, index], tile, tile.src === "" ? sidebarEmptyTile : mapSquareStyles)}
                </ListItem>
            ))
        }


    }else{
        tilesToProcess = [...prevTileState];
        windowStyle = editorWindow;

        // Somewhat repetitive code but need to map through nested array here
        processedTiles = tilesToProcess.map((tileRow, rowIndex) => 
         <TableRow key={`${rowIndex}`}>
            {tileRow.map((tile, tileIndex) => 
            <TableCell key={`${tileRow}-${tileIndex}`} style={{ padding: 0, border: "0px" }}>
                <DropWrapper onDrop={onDrop} family={zone.type} index={[rowIndex, tileIndex]} editorSquaresArr={tilesToProcess} style={{ width: "100%", height: "100%" }}>
                    <DropSquare tile={tile} style={editorSquareStyles} family={zone.type} itemIndex={[rowIndex, tileIndex]} />
                </DropWrapper>
            </TableCell>
            )}
         </TableRow>

        );

    }
    return processedTiles;
};