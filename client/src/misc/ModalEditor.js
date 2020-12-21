import React, { useState } from "react";
import "react-dropzone-uploader/dist/styles.css";
import { Dialog, Button, Slide, AppBar, Toolbar, Typography, IconButton,  Grid, Tabs, Tab } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useContext } from "react";
import { EditorContext, editorTypes } from "../state/editorContext";
import MapGrid from "../map/MapGrid";
import MonsterDraggable from "../monsters/MonsterDraggable";
import pokemonObjs from "../fetched_pokemon.json";
import DropWrapper from "../content-grid/DropWrapper";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalEditor = ({ open }) => {    
  const { editorDispatcher } = useContext(EditorContext);
  const [selectedTab, setTab] = useState(0);
  const [monsterToRemoveId, setMonsterToRemove] = useState("");

  const handleClose = () => editorDispatcher({ type: editorTypes.CLOSE_EDITOR_MODAL, payload: false });

  const handleTabChange = (event, value) => {
    setTab(value);
  }

  const onSidePanelDrop = (item, family, index) => {
    setMonsterToRemove(item.id)
  }

  const pokemonSidePanelStyles = { 
    position: "absolute", 
    width: "400px", 
    borderRight: "3px black #979dc1", 
    paddingLeft: "20px", 
    height: "595px", 
    overflow: "auto" 
  };

  return (
    <Dialog fullScreen onClose={handleClose} open={open} TransitionComponent={Transition}>
      <AppBar style={{ position: "relative" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
          <CloseIcon />
          </IconButton>
          <Typography variant="h6">
              Editor
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
              Save
          </Button>
          <Button color="inherit" onClick={() => setMonsterToRemove("all")}>Reset Pokemon</Button>
        </Toolbar>
      </AppBar>
      <Grid container style={{ height: "100%"}}>
        <Grid item md={4} >
          <div style={{ borderRight: "3px black #979dc1", height: "100%", width: "340px" }}>
              <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
                <Tab label="Pokemon" value={0} index={0}/>
                <Tab label="Items" value={1} index={1}/>
                <Tab label="Sprites" value={2} index={2}/>
            </Tabs>
            {selectedTab === 0 &&
            <DropWrapper onDrop={onSidePanelDrop}>
              <div style={pokemonSidePanelStyles}>
                {pokemonObjs.map((pokemon, index) =>
                  <MonsterDraggable key={`${pokemon.name}-${index}`} spriteIndex={index} pokemonDetails={pokemon}/>)}
              </div>
            </DropWrapper>

            }
          </div>
        </Grid>
        <Grid item md={8}>
          <MapGrid monsterToRemoveId={monsterToRemoveId} setMonsterToRemove={setMonsterToRemove}/>
        </Grid>
      </Grid>
    </Dialog>
  )
}

export default ModalEditor;