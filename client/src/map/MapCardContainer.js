import React, {useContext} from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import {Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MapCard from "./MapCard";
import {MapContext} from "../state/mapContext";

const useStyles = makeStyles({
    mapNameStyle: {
      fontSize: 20,
      fontWeight: 700,
      color: "#b7c7bb",
      paddingTop: "15px"
    }
});
export default function MapCardContainer(){
    const classes = useStyles();
    const {mapState} = useContext(MapContext);

    return (
        <Container style={{ textAlign: "center" }}>
            <Typography className={classes.mapNameStyle}>
            <a href="https://fontmeme.com/pokemon-font/">
                <img
                src="https://fontmeme.com/permalink/201105/8df4d8b73a70cd880cae996d3bcec7fe.png"
                alt="pokemon-font"
                border="0"
                style={{ height: "50px", width: "200px" }}
                />
            </a>
            </Typography>
            <Grid container spacing={2} style={{ marginTop: "15px" }}>
                {mapState.listOfMaps.map(mapName => <MapCard name={mapName}/>)}
            </Grid>
        </Container>
    )
}