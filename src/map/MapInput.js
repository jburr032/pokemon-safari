import React, { useContext, useState } from "react";
import { MapContext, mapTypes } from "../state/mapContext";

export default function MapInput() {
  const { mapState, dispatch } = useContext(MapContext);
  const [axis, setAxis] = useState("");

  const mapInputStyles = {
    marginLeft: "70px",
    marginTop: "15px",
    position: "relative"
  };

  const mapInputBtnStyles = {
    marginLeft: "115px",
    marginTop: "15px",
    position: "relative"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let [x,y] = axis.split(",");
    x = parseInt(x);
    y = parseInt(y);

    const currAxis = {x, y}
    
    dispatch({ type: mapTypes.CREATE_MAP, payload: currAxis });
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          value={axis}
          onChange={(e) => setAxis(e.target.value)}
          placeholder="Input x and y axis"
          style={mapInputStyles}
        />
        <button style={mapInputBtnStyles}>Create Map</button>
      </form>
    </div>
  );
}
