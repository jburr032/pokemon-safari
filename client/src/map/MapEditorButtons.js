import { Button, Container, FormHelperText, OutlinedInput, InputAdornment, Snackbar, TextField } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from "@material-ui/core/styles";
import { MapContext, mapTypes } from "../state/mapContext";
import React, { useContext, useState } from "react";
import axios from "axios";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
    buttonContainerStyle: {
      alignContent: "center",
      height: "20px",
      marginBottom: "241px",
    }
  });
export default function MapEditorButtons({
    grid,
    setSize,
    gridHeight,
    gridWidth,
    handleWidthChange,
    handleHeightChange,
    setColour,
    handleLoadMap
}){
    const classes = useStyles();
    const {mapState,dispatch} = useContext(MapContext);
    const [err, setErr] = useState(false);
    const [save, setSave] = useState(false);

    const handleSave = async () => {
      try{      
        await axios.post("/save_map", { mapName: mapState.currMap, savedGrid: grid });
        dispatch({ type: mapTypes.SAVE_MAP, payload: grid });
        setErr(false);
        setSave(true);

      }catch(err){
        console.log("ERROR", err);
        setErr(true);
      }

    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      err && setErr(false);
      save && setSave(false);
    };

    return (
        <Container className={classes.buttonContainerStyle}>
          {err && <Snackbar open={err} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                      Save was unsuccessful!
                    </Alert>
                  </Snackbar>}
          {save && <Snackbar open={save} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                      Save was successful!
                    </Alert>
                  </Snackbar>}
        <div>
          <Button color="primary" onClick={() => setColour("blue")}>Walkable</Button>
          <Button color="secondary" onClick={() => setColour("red")}>Blockable</Button>
          <Button onClick={() => setColour("yellow")}>Interactable</Button>
        </div>
        <div>
          <Button style={{ marginRight: "10px" }} variant="contained" onClick={handleSave}>Save</Button>
          <Button variant="contained" onClick={handleLoadMap}>Load</Button>
        </div>
        <hr />
          <OutlinedInput
            endAdornment={<InputAdornment position="end"><Button disabled={gridHeight === 0 ? true : false } style={{ width: '100px'}} onClick={() => setSize(prev => ({width: prev.width, height: gridHeight}))}>Height</Button></InputAdornment>}
            labelWidth={0}
            placeholder={gridHeight}
            onChange={(e) => handleHeightChange(e)}
            error={gridHeight === 0 ? true : false}
          />
          {gridHeight === 0 && <FormHelperText id="filled-weight-helper-text">Must be divisible by 16</FormHelperText>}

          <OutlinedInput
            endAdornment={<InputAdornment position="end"><Button disabled={gridWidth === 0 ? true : false } style={{ width: '100px'}} onClick={() => setSize(prev => ({width: gridWidth, height: prev.height}))}>Width</Button></InputAdornment>}
            labelWidth={0}
            placeholder={gridWidth}
            onChange={(e) => handleWidthChange(e)}
            error={gridWidth === 0 ? true : false} />
                    
          {gridWidth === 0 && <FormHelperText id="filled-weight-helper-text">Must be divisible by 16</FormHelperText>}

      </Container>
    )
}