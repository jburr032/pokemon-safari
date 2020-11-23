const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, __dirname + '/client/public/maps/');
   },
  filename: function (req, file, cb) {
      cb(null , file.originalname);
  }
});

const upload = multer({storage: storage });

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// Receive saved map
app.post("/save_map",(req, res) => {
  try{
    const reqJSON = JSON.stringify(req.body);
    fs.writeFile(`./grids/${req.body.mapName}.json`, reqJSON, () => {})
    res.send({ message: "Received"})
  }catch(err){
    console.error(err)
  }
})

app.post("/map_upload", upload.single("file"), (req, res) => {
  try {
    res.send(req.file);
  }catch(err) {
    res.send(400);
  }
})

app.get("/fetch_map/:map_name", async (req, res) => {
  const {params} = req;

  fs.readFile(`./grids/${params.map_name}.json`, "utf8", async (err, data)=>{
    try{
      const readMap = await JSON.parse(data);
      res.send(readMap)
    }catch(error){
      console.error(err)
      console.error(error)
    }
  });

})

app.get("/fetch_map_file/:map_filename", async (req, res) => {
  const {params} = req;

  fs.readFile(`./client/public/maps/${params.map_filename}.png`, "utf8", async (err, data)=>{
    try{
      res.send(data)
    }catch(error){
      console.error(err)
      console.error(error)
    }
  });

})
