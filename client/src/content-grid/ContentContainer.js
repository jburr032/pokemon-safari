import React, {useEffect, useState} from "react";
import DropWrapper from "./DropWrapper";
import DropSquare from "./DropSquare";
import { dropTiles, dropZones, TEST_DATA } from "./data";
import ITEM_TYPES from "./itemTypes";
import { handleMove } from "./utils/handleMove";
import { Table, TableRow, TableCell, TableContainer, List, ListItem, Container, TableBody } from '@material-ui/core';


const ContentContainer = () => {
    // Sidebar and Editor tiles
    const [sidebarTiles, setSidebarTiles] = useState(dropTiles);
    const [editorSquares, setEditorSquare] = useState(TEST_DATA);
    
    // Handles editor scaling
    const [keyPressed, setKeyDownPressed] = useState('');
    const [leftBracketPress, setLeftBracket] = useState(false);
    const [rightBracketPress, setRightBracket] = useState(false);
    const [editorSquareHeight, setSquareHeight] = useState(368);
    const [editorSquareWidth, setSquareWidth] = useState(368);

    const onDrop = (item, family, index) => {
        let sideBarTiles = [...sidebarTiles];
        let editableSquares = [...editorSquares];            
        const { sideBarArr, editorArr } = handleMove(sideBarTiles, editableSquares, item, family, index);
        setSidebarTiles(sideBarArr);
        setEditorSquare(editorArr);       
    };

    useEffect(() => {
        if(keyPressed === 'Control' && leftBracketPress ){
            setSquareHeight(prev => prev !== 118 ? prev - 50 : prev);
            setSquareWidth(prev => prev !== 118 ? prev - 50 : prev);
            setKeyDownPressed('');
            setLeftBracket(false);
        }else if(keyPressed === 'Control' && rightBracketPress ){
            setSquareHeight(prev => prev + 50);
            setSquareWidth(prev => prev + 50);
            setKeyDownPressed('');
            setRightBracket(false);
        }

        window.removeEventListener('keyup', ()=>{});
        window.removeEventListener('keyup', ()=>{});
    }, [keyPressed, leftBracketPress, rightBracketPress]);

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
    };

    const editorSquareStyles = {
        border: "1px dashed black", 
        width: editorSquareWidth, 
        height: editorSquareHeight
    };

    const mapSquareStyles = {
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

    const handleEventAdd = () => {
        window.addEventListener('keydown', (event) => {
            const key = (' ' + event.key).slice(1);
            setKeyDownPressed(key);
        });

        window.addEventListener('keydown', (event) => {
            const key = (' ' + event.key).slice(1);
            if(key === "<") {setRightBracket(false); setLeftBracket(true);}
            else if(key === ">") {setLeftBracket(false); setRightBracket(true); }
        });
        
    }

    const handleExpansion = () => {
        setEditorSquare(prev => {
            const emptyEditorSquare = {family: ITEM_TYPES.EDITOR, type: ITEM_TYPES.MAP,src: "" };
            const expandedEditorArr = prev.map(editorArr => editorArr.push(emptyEditorSquare));

            for(let i=0; i <  expandedEditorArr.length; i++){
                expandedEditorArr.push(emptyEditorSquare);
            }
        })
    }

    const processDropZones = (zone) => {
        let tilesToProcess;
        let processedTiles;
        let windowStyle;

        if(zone.type === ITEM_TYPES.SIDE_BAR){
            tilesToProcess = [...sidebarTiles];
            windowStyle = sidebarWindow;

            // Sets a div the full width of the sidebar for a dropzone area
            if(tilesToProcess[0].length === 0){
                const emptySidebarTile = { family: ITEM_TYPES.EDITOR, type: ITEM_TYPES.MAP,src: "" };

                processedTiles = 
                <ListItem>
                    <DropWrapper onDrop={onDrop} family={zone.type} index={[0, 0]}>
                        <DropSquare tile={emptySidebarTile} style={{...windowStyle, width: "100%"}} family={zone.type} itemIndex={0} />
                    </DropWrapper>
                </ListItem>

            }else{
                processedTiles = tilesToProcess.map((tileRow, rowIndex) => tileRow.map((tile, index) => 
                    <ListItem key={`${tile.family}-${index}`}>
                        <DropWrapper onDrop={onDrop} family={zone.type} index={[rowIndex, index]} handleExpansion={handleExpansion}>
                            <DropSquare tile={tile} style={tile.src === "" ? sidebarEmptyTile : mapSquareStyles} family={zone.type} itemIndex={[rowIndex, index]} />
                        </DropWrapper>
                    </ListItem>
                ))
            }


        }else{
            tilesToProcess = [...editorSquares];
            windowStyle = editorWindow;

            // Somewhat repetitive code but need to map through nested array here
            processedTiles = tilesToProcess.map((tileRow, rowIndex) => 
             <TableRow key={`${rowIndex}`}>
                {tileRow.map((tile, tileIndex) => 
                <TableCell key={`${tileRow}-${tileIndex}`} style={{ padding: 0 }}>
                    <DropWrapper onDrop={onDrop} family={zone.type} index={[rowIndex, tileIndex]} editorSquaresArr={tilesToProcess} style={{ width: "100%", height: "100%" }} handleExpansion={handleExpansion}>
                        <DropSquare tile={tile} style={editorSquareStyles} family={zone.type} itemIndex={[rowIndex, tileIndex]} />
                    </DropWrapper>
                </TableCell>
                )}
             </TableRow>

            );

        }
        return processedTiles;
    };

    return (
        <Container style={{ marginLeft: '38px', marginTop: '125px', marginBottom: '125px' }}>
             <List style={{ marginLeft: '-23px', position: 'absolute' }}>{processDropZones(dropZones[0])}</List>
             <TableContainer style={{ width: "1176px", height: "725px", overflowX: 'auto', marginLeft: '244px'}}>
                        <Table onClick={handleEventAdd} style={{ width: "50%" }}>
                            <TableBody>
                            {processDropZones(dropZones[1])}
                            </TableBody>
                        </Table>
                    </TableContainer>
        </Container>
    )
}

export default ContentContainer;
