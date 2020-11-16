import React from "react";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

export default function MapCard(){

    return (
        <Grid item md={6}>
        <Card>
          <CardActionArea style={{ backgroundColor: "#e6f5f3" }}>
            <CardMedia
              component="img"
              alt="Bill's house"
              height="140"
              src="./sprites/bills.png"
              title="Bill's House"
            />
            <CardContent>
              <Typography gutterBottom variant="subtitle2" component="h6" >
                Bill's House
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    )
}