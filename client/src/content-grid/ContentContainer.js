import React, {useEffect, useState} from "react";
import { dropTiles, dropZoneTypes, TEST_DATA } from "./data";
import ITEM_TYPES from "./itemTypes";
import { handleMove } from "./utils/handleMove";
import { Table, TableContainer, List, Container, TableBody, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import processDropZones from "./utils/processDropZones";

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;
  
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

    // Alerts for size changes
    const [expanded, setExpanded] = useState(false);

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

    const editorSquareStyles = {
        border: "1px dashed black", 
        width: editorSquareWidth, 
        height: editorSquareHeight
    };

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
        const additionalRow = [];
        const emptyEditorSquare = {family: ITEM_TYPES.EDITOR, type: ITEM_TYPES.MAP, src: ""};

        const currEditorArr = [...editorSquares];
        currEditorArr.forEach(editorArr => editorArr.push(emptyEditorSquare));

        for(let i=0; i <  currEditorArr[0].length; i++){
            additionalRow.push(emptyEditorSquare);
        }

        currEditorArr.push(additionalRow);

        setExpanded(true);
        setEditorSquare(currEditorArr);
    };

    const handleDecrease = () => {
        const currEditorArr = [...editorSquares];
        const currSidebarArr = [...sidebarTiles];
        const emptyTiles = [];
        const mapTiles = [];

        currSidebarArr[0].forEach(tile => tile.src !== "" ? mapTiles.push({...tile}) : emptyTiles.push({...tile}));

        if(currEditorArr.length >= 2){
            // Iterate through each array and pop off the last element (represents the last column)
            currEditorArr.forEach(editorArr => {
                const poppedColumnTile = editorArr.pop();
                // Add the tile to the mapTiles if the tile has a map
                poppedColumnTile.src !== "" && mapTiles.push({...poppedColumnTile, family: ITEM_TYPES.SIDE_BAR});
            });

            // Pop off the last row
            const poppedRowMaps = currEditorArr.pop().filter(tile => tile.src !== "");
            // Filter and add any map tiles to mapTiles
            poppedRowMaps.forEach(mapTile => mapTiles.push({ ...mapTile, family: ITEM_TYPES.SIDE_BAR }));

            setEditorSquare(currEditorArr);
            setSidebarTiles([[...mapTiles, ...emptyTiles]]);
        }
    };

    const handleClose = () => setExpanded(false);

    return (
        <Container style={{ marginLeft: '38px', marginTop: '125px', marginBottom: '125px' }}>
            <Snackbar open={expanded} autoHideDuration={6000} onClose={handleClose}>
                <Alert severity="info">
                    Expanded to {editorSquares.length}x{editorSquares[0].length}
                </Alert>
            </Snackbar>
             <List style={{ marginLeft: '-23px', position: 'absolute' }}>{processDropZones(dropZoneTypes[0], onDrop, sidebarTiles)}</List>
             <TableContainer style={{ width: "1176px", height: "725px", overflowX: 'auto', marginLeft: '244px'}}>
                        <Table onClick={handleEventAdd} style={{ width: "20%" }}>
                            <TableBody>
                            {processDropZones(dropZoneTypes[1], onDrop, editorSquares, editorSquareStyles)}
                            </TableBody>
                        </Table>
                    </TableContainer>
            <Button onClick={handleExpansion}>Expand</Button>
            <Button onClick={handleDecrease}>Decrease</Button>

        </Container>
    )
}

export default ContentContainer;
