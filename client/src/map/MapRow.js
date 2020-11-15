import React, {useContext, useEffect, useState} from "react";
import MapContext from "../state/mapContext"

export default function MapRow(){
  const {mapState, dispatch} = useContext(MapContext);
  const [pokeMap, setMap] = useState([]);

  return null;

}