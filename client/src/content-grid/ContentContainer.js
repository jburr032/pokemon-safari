import React, {useState} from "react";
import DropWrapper from "./DropWrapper";
import DropSquare from "./DropSquare";
import { dropTiles, dropZones, TEST_DATA } from "./data";
import ITEM_TYPES from "./itemTypes";
import { handleMove } from "./utils/handleMove";
import {Paper, Table, TableRow, TableCell, TableContainer, Grid, List, ListItem, Container} from '@material-ui/core';


const ContentContainer = () => {
    const [tiles, setTiles] = useState(dropTiles);

    const expandEditorGrid = (index) => {
        const editorTiles = tiles.filter(tile => tile.family === ITEM_TYPES.EDITOR);

        console.log(editorTiles)
        console.log(editorTiles[index])
    }

    const onDrop = (item, family, index) => {
        setTiles(prevState => {
            let newItems = [...prevState];
            
            newItems = handleMove(newItems, item, family, index);
            return newItems;
        });
    };

    const editorWindow = {
        border: "1px solid black", 
        width: "1544px", 
        height: "800px", 
        display: "flex", 
        flexWrap: "wrap" 
    };

    const sidebarWindow = {
        border: "1px solid black", 
        float: "left", 
        width: "21%", 
        height: "800px", 
        overflow: "auto" 
    }

    const editorSquareStyles = {
        border: "1px dashed black", 
        width: "368px", 
        height: "368px"
        
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
        <Container style={{ marginLeft: '38px', marginTop: '125px', marginBottom: '125px' }}>
                    <List style={{ marginLeft: '-23px', position: 'absolute' }}>
                        <ListItem>
                            <img width='180px' height='180px' src='/maps/safari_zone.png' />
                        </ListItem>
                        <ListItem>
                            <img width='180px' height='180px' src='/maps/bills.png' />
                        </ListItem>
                    </List>
                    <TableContainer style={{ width: "800px", height: "800px", overflowX: 'auto', marginLeft: '244px'}}>
                        <Table style={{ tableLayout: "fixed" }}>
                            {
                                TEST_DATA.map(d => <TableRow>
                                    {d.map(t => <TableCell style={editorSquareStyles}>{t.src}</TableCell>)}
                                </TableRow>)
                            }
                        </Table>
                    </TableContainer>
        </Container>
        
        // <div style={{ height: "75%", width: "1900px", display: "inline-flex", whiteSpace: "nowrap"}}>
        //     {dropZones.map((zone) => {
        //         let renderTiles;
                   // filter tiles based on family
        //         const returnedTiles = tiles.filter(tile => tile.family === zone.type);

                   // Then filter each type to add style
        //         const tileStyle = zone.type === ITEM_TYPES.SIDE_BAR ? mapSquareStyles : editorSquareStyles;
        //         const windowStyle =  zone.type === ITEM_TYPES.SIDE_BAR ? sidebarWindow : editorWindow;

                   // Checks length of non-empty tiles to then generate a number of empty placeholder tiles
        //         const mapTilesLength = returnedTiles.filter(tile => tile.src !== "").length;

                   // Checks length of non-empty tiles to then generate a number of empty placeholder tiles
        //         if(zone.type === ITEM_TYPES.SIDE_BAR && mapTilesLength === 0){

        //             if(mapTilesLength === 0){
        //                 console.log('returnedTiles if')
        //                 const emptySidebarTile = { family: ITEM_TYPES.EDITOR, type: ITEM_TYPES.MAP,src: "" };
        //                 renderTiles = <DropWrapper onDrop={onDrop} family={zone.type} index={0}>
        //                                             <DropSquare tile={emptySidebarTile} style={{...windowStyle, width: "100%"}} family={zone.type} itemIndex={0} />
        //                                     </DropWrapper>;
        //             }

        //         }

        //         else{
        //             renderTiles = returnedTiles.map((tile, index) => 
        //                 <DropWrapper onDrop={onDrop} family={zone.type} index={index} expandEditorGrid={expandEditorGrid}>
        //                     <DropSquare tile={tile} style={tile.family === ITEM_TYPES.SIDE_BAR && tile.src === "" ? sidebarEmptyTile : tileStyle} family={zone.type} itemIndex={index} />
        //                 </DropWrapper>
        //         )}

        //          return <TableRow><div style={windowStyle}>{renderTiles}</div></TableRow>
        //     })}
        // </div>
    )
}

export default ContentContainer;
