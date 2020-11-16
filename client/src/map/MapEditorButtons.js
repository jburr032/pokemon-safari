import { Button, Container, FormHelperText, OutlinedInput, InputAdornment } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MapContext, mapTypes } from "../state/mapContext";
import React, {useContext, useState, useEffect} from "react";
import axios from "axios";

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
    const {dispatch, mapState} = useContext(MapContext);
    const [err, setErr] = useState(false);

    const handleSave = async () => {
      try{      
        await axios.post("/save_map", { message: grid });
        dispatch({ type: mapTypes.SAVE_MAP, payload: grid });
        setErr(false);

      }catch(err){
        console.log("ERROR", err);
        setErr(true);
      }

    }

    return (
        <Container className={classes.buttonContainerStyle}>
          {err && alert("Save unsuccessful")}
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
            onChange={(e) => handleHeightChange(e)}
            error={gridHeight === 0 ? true : false}
          />
          {gridHeight === 0 && <FormHelperText id="filled-weight-helper-text">Must be divisible by 16</FormHelperText>}

          <OutlinedInput
            endAdornment={<InputAdornment position="end"><Button disabled={gridWidth === 0 ? true : false } style={{ width: '100px'}} onClick={() => setSize(prev => ({width: gridWidth, height: prev.height}))}>Width</Button></InputAdornment>}
            labelWidth={0}
            onChange={(e) => handleWidthChange(e)}
            error={gridWidth === 0 ? true : false}
          />
          {gridWidth === 0 && <FormHelperText id="filled-weight-helper-text">Must be divisible by 16</FormHelperText>}

      </Container>
    )
}