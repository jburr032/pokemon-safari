import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

import MapEditorContainer from "./map/MapEditorContainer";
import MapCardContainer from "./map/MapCardContainer";

import { DndProvider, DragPreviewImage, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


import ContentContainer from "./content-grid/ContentContainer";


const useStyles = makeStyles({
  gridContainerStyle: {
    width: "75%",
    margin: "200px auto",
    border: "5px #f7d61b solid",
    height: "600px",
    backgroundColor: "#1698f0"
  },
  verticalLine: {
    borderLeft: "2px #f7d61b solid",
    marginTop: "45px",
    height: "500px"
  }
});

const SquareContainer = ({children}) => {

  return <div style={{ border: 'solid 1px black', margin: 'auto', height: '750px', width: '750px', display: 'flex', flexWrap: 'wrap' }}>
    {children}
  </div>
};

const Square = ({ content, position, setGrid }) => {
  const [, drop] = useDrop({
    accept: 'map',
    drop: item => {
      move(item, position, setGrid);
    }
  });

  return <div ref={drop} style={{ maxWidth: '50%', border: 'solid 1px black', display: 'inline-flex', flex: '40%' }}>
    <ImagePlaceholder content={content} position={position}/>
  </div>
};

const ImagePlaceholder = ({ content, position }) => {
  const [{ isDragging }, drag, preview] = useDrag({
    item: {type: 'map', id: `${position}-${content.id}`},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  });
  
  return  <>
    <DragPreviewImage connect={preview} src={<div>{content.src}</div>} />
      <div
        ref={drag}
        style={{ opacity: isDragging ? 0 : 1 }}
      >
        {content.src && <img src={content.src} height='100%' width='100%'/>}
      </div>
  </>

}

const imgData = [
  [
    [
      {src: '/maps/safari_zone.png', id: 1},
      {src: '/maps/safari_zone.png', id: 2}
    ],
    [
      {src: '/maps/safari_zone.png', id: 3},
      {src: '', id: 4}
    ]
  ],
  [
    [
      {src: '/maps/safari_zone.png', id: 5},
      {src: '/maps/safari_zone.png', id: 6}
    ],
    [
      {src: '/maps/safari_zone.png', id: 7},
      {src: '', id: 8}
    ]
  ]
]

const move = (item, to, setGrid) => {
  let currPos =  item.id.split('-');
  currPos = currPos[0].split(',');
  
  const updatedImgData = imgData.map(row => [...row]);

  updatedImgData[to[0]][to[1]] = imgData[currPos[0]][currPos[1]];
  updatedImgData[currPos[0]][currPos[1]] = imgData[to[0]][to[1]]
  console.log(updatedImgData);
 
  const newGrid = createGrid(updatedImgData, setGrid);
  setGrid(newGrid);
}

const createGrid = (imgData, setGrid) => imgData.map((row, rowIndex) => row.map((item, itemIndex) => <Square content={item} position={[rowIndex, itemIndex]} setGrid={setGrid}/>));


export default function App() {
  const classes = useStyles();
  const [droppableGrid, setDroppableGrid] = useState([]);

  useEffect(() => {
    
    const getDroppableGrid = imgData.map(col => <SquareContainer>
                              {createGrid(col, setDroppableGrid)}
                          </SquareContainer>)

    setDroppableGrid(getDroppableGrid);
  }, [setDroppableGrid])

    
  return (
    <>
    {/* <Grid container className={classes.gridContainerStyle}>
      <Grid item md={5}>
        <MapCardContainer />
        <MyUploader />
      </Grid>
      <Grid item md={1}>
        <div className={classes.verticalLine}></div>
      </Grid>
      <Grid item md={5}>
        <MapEditorContainer/>
      </Grid>
    </Grid> */}  
            <DndProvider backend={HTML5Backend}>
              <ContentContainer />
            </DndProvider>
    </>
  );
}
