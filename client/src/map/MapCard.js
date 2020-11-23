import React, {useContext} from "react";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import {MapContext, mapTypes} from "../state/mapContext";

export default function MapCard({name}){
    const {dispatch} = useContext(MapContext);
    const processedName = name.replace("_", " ");

    const handleClick = () => {
      dispatch({ type: mapTypes.CHANGE_MAP, payload: name})
    }

    return (
        <Grid item md={6}>
        <Card>
          <CardActionArea style={{ backgroundColor: "#e6f5f3" }}>
            <CardMedia
              component="img"
              alt={processedName}
              height="140"
              src={`./sprites/${name}.png`}
              title={processedName}
              onClick={handleClick}
            />
            <CardContent>
              <Typography gutterBottom variant="subtitle2" component="h6" >
                {processedName}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    )
}