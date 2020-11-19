const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const fs = require("fs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// Receive saved map
app.post("/save_map",(req, res) => {
    const reqJSON = JSON.stringify(req.body);
    fs.writeFile(`./grids/${req.body.mapName}.json`, reqJSON, () => {})
    res.send({ message: "Received"})
})

app.get("/fetch_map/:map_name", async (req, res) => {
  const {params} = req;
  console.log(params.map_name)
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