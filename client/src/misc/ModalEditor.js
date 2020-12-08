import React from "react";
import "react-dropzone-uploader/dist/styles.css";
import { Dialog, DialogActions, DialogTitle, Button, Slide, AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { useContext } from "react";
import { EditorContext, editorTypes } from "../state/editorContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalEditor = ({ open }) => {    
  const { editorDispatcher } = useContext(EditorContext);

  const handleClose = () => editorDispatcher({ type: editorTypes.CLOSE_EDITOR_MODAL, payload: false });
  
  return (
    <Dialog fullScreen onClose={handleClose} open={open} TransitionComponent={Transition}>
      <AppBar style={{ position: "relative" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
          <CloseIcon />
          </IconButton>
          <Typography variant="h6">
              Sound
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
              save
          </Button>
        </Toolbar>
      </AppBar>
    </Dialog>
  )
}

export default ModalEditor;