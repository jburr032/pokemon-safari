import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { ResizeProvider, ResizeConsumer } from "react-resize-context";

const useStyles = makeStyles({
  gridContainerStyle: {
    width: "75%",
    margin: "200px auto",
    border: "5px #f7d61b solid",
    height: "600px",
    backgroundColor: "#1698f0"
  },
  editMapContainerStyle: {
    // width: 400,
    // height: 400,
    // backgroundColor: "red",
    // opacity: "10%",
    // paddingRight: "325px"
  },
  buttonContainerStyle: {
    alignContent: "center",
    height: "20px",
    marginBottom: "30px"
  },
  verticalLine: {
    borderLeft: "2px #f7d61b solid",
    marginTop: "45px",
    height: "500px"
  },
  mapNameStyle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#b7c7bb",
    paddingTop: "15px"
  },
  inputStyles: {
    position: "relative",
    width: "250px",
    paddingLeft: "20px",
    marginTop: "10px",
    marginLeft: "25px"
  },
  resizeContentStyles: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  resizableContainer: {
    display: "inline-flex",
    flexDirection: "column",
    width: "509px",
    height: "417px",
    resize: "both",
    overflow: "hidden",
    background: "#d7dfe2",
    zIndex: 0,
    backgroundImage: "url(sprites/safari_zone.png)",
    backgroundRepeat: "no-repeat",
    marginLeft: "-40px"
  }
});

export default function App() {
  const classes = useStyles();
  const [size, setSize] = React.useState({width: 509, height: 417});

  const handleSizeChanged = (newSize) => {
    setSize(newSize);
  };

  const resizeTest = () => (
    <ResizeConsumer
      onSizeChanged={handleSizeChanged}
      className={classes.resizeContentStyles}
    >
      {`${size.width}x${size.height}`}
    </ResizeConsumer>
  );

  const generateGrid = () => {
    let grid = [];

    console.log(size.height, size.width);

    for (let i = 0; i < size.height * 1.9; i++) {
      let row = [];
      for (let j = 0; j < size.width * 1.8; j++) {
        row.push(
          <div
            style={{
              width: "16px",
              transform: "translateY(25%) translateX(15px)",
              height: "16px",
              display: "inline-flex",
              zIndex: 2,
              color: "black",
              position: "relative"
            }}
          ></div>
        );
      }

      grid.push(
        <div
          style={{
            width: "16px",
            transform: "translateY(25%) translateX(15px)",
            height: "16px",
            display: "inline-flex",
            zIndex: 2,
            color: "transparent",
            position: "relative",
            backgroundColor: "blue",
            border: "1px solid white",
            opacity: "25%"
          }}
        >
          0
        </div>
      );
    }

    return grid;
  };

  return (
    <>
      <Grid container className={classes.gridContainerStyle}>
        <Grid item md={5}>
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
              <Grid item md={6}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="140"
                      image="/static/images/cards/contemplative-reptile.jpg"
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Map Name
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item md={6}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="140"
                      image="/static/images/cards/contemplative-reptile.jpg"
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Map Name
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item md={6}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="140"
                      image="/static/images/cards/contemplative-reptile.jpg"
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Map Name
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Grid>
        <Grid item md={1}>
          <div className={classes.verticalLine}></div>
        </Grid>
        <Grid item md={6}>
          <Container style={{ textAlign: "center" }}>
            <Typography className={classes.mapNameStyle}>
              <a href="https://fontmeme.com/pokemon-font/">
                <img
                  src="https://fontmeme.com/permalink/201105/1750b3325da4237a1c5ef5d60e9a67df.png"
                  alt="pokemon-font"
                  border="0"
                  style={{ height: "50px", width: "200px" }}
                />
              </a>
            </Typography>
            <Container className={classes.buttonContainerStyle}>
              <Button color="primary">Walkable</Button>
              <Button color="secondary">Blockable</Button>
              <Button>Interactable</Button>
            </Container>
            <Container className={classes.editMapContainerStyle}>
              <ResizeProvider>
                <div className={classes.resizableContainer}>
                  <div
                    style={{
                      width: size.width,
                      height: size.height,
                      zIndex: 5,
                      marginLeft: "-10px"
                    }}
                  >
                    {generateGrid()}
                  </div>
                </div>
                <div>{resizeTest()}</div>
              </ResizeProvider>
            </Container>
          </Container>

        </Grid>
      </Grid>
    </>
  );
}
