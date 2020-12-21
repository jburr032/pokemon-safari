import React, { useEffect, useState, useContext } from "react";
import { dropTiles, dropZoneTypes, TEST_DATA } from "./data";
import ITEM_TYPES from "../misc/itemTypes";
import { handleMove } from "./utils/handleMove";
import { Table, TableContainer, List, Container, TableBody, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import processDropZones from "./utils/processDropZones";
import { EditorContext, editorTypes } from "../state/editorContext";
import ModalUploader from "../misc/ModalUploader";
import ModalEditor from "../misc/ModalEditor";


const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;
  
const ContentContainer = () => {
    // Conext and dispatch
    const { editorState, editorDispatcher }  = useContext(EditorContext);

    // Modal states
    const [openUploadModal, setModalUploader] = useState(false);

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
        let height = editorSquareHeight;
        let width = editorSquareWidth;

        if(keyPressed === 'Control' && leftBracketPress ){
            height = editorSquareHeight !== 168 ? editorSquareHeight - 50 : editorSquareHeight;
            width = editorSquareWidth !== 168 ? editorSquareWidth - 50 : editorSquareWidth;

            setLeftBracket(false);

        }else if(keyPressed === 'Control' && rightBracketPress ){
            height = editorSquareHeight !== 718 ? editorSquareHeight + 50 : editorSquareHeight;
            width = editorSquareWidth !== 718 ? editorSquareWidth + 50 : editorSquareWidth;

            setRightBracket(false);
        }

        setKeyDownPressed('');
        setSquareHeight(height);
        setSquareWidth(width);

        editorDispatcher({ type: editorTypes.SET_DIMENSIONS, payload: { width, height }})

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

    const handleSnackbarClose = () => setExpanded(false);

// Modal handlers
    const openModalUploader = () => {
        setModalUploader(true);
    }

    const closeModalUploader = () => {
        setModalUploader(false);
    }

    return (
        <>
            <Button onClick={openModalUploader}>Upload Map</Button>

            {/* <ModalUploader open={openUploadModal} closeModal={closeModalUploader}/> */}
            <ModalEditor open={true} />

            {/* <Container style={{ marginLeft: '38px', marginTop: '125px', marginBottom: '125px' }}>
                <Snackbar open={expanded} autoHideDuration={6000} onClose={handleSnackbarClose}>
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

            </Container> */}
        </>
    )
}

export default ContentContainer;
