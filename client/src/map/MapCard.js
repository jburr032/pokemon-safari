import React, {useContext} from "react";
import Grid from "@material-ui/core/Grid";
import {Typography, Button} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import {MapContext, mapTypes} from "../state/mapContext";

export default function MapCard({ src, name }){
    const {dispatch} = useContext(MapContext);

    // const handleClick = () => {
    //   dispatch({ type: mapTypes.CHANGE_MAP, payload: name})
    // }

    return (
        <Card style={{ height: "100%", position: "relative" }}>            
            <CardMedia
              component="img"
              alt={name}
              height="100%"
              src={src}
              title={name}
              style={{ position: "relative", height: "90%" }}
            />
            <div style={{ zIndex: 30000, position: "absolute" }}>
            <CardContent>
            <Button>Click</Button>
            </CardContent>
            </div>
     </Card>
    )
}