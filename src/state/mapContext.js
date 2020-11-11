import React, { useReducer } from "react";
import {saveMapHelper} from "./utils"

export const mapTypes = {
  SAVE_MAP: "SAVE_MAP",
  CREATE_MAP: "CREATE_MAP",
  UPDATE_MAP: "UPDATE_MAP",
  CHANGE_COLOUR: "CHANGE_COLOUR",
  SET_COLOUR: "SET_COLOUR"
};

const initialMapState = {
  currMap: { mapArray: [[0]], mapName: "", mapFilepath: "" },
  currColour: "blue",
  savedMap: [],
  selectedColour: "blue"
};

const mapReducer = (state, action) => {
  const { SAVE_MAP, UPDATE_MAP, CHANGE_COLOUR, CREATE_MAP, SET_COLOUR } = mapTypes;

  switch (action.type) {
    case CREATE_MAP:
      return {...state, currMap: {...state.currMap, mapArray: action.payload }}
    case SAVE_MAP:      
      console.log(state.currMap.mapArray)
      return {...state, savedMap: state.currMap.mapArray };
    case SET_COLOUR:
      return {...state, selectedColour: action.payload }
    case CHANGE_COLOUR:
      return {...state, currColour: action.payload}
    case UPDATE_MAP:
      const tempMap = [...state.currMap.mapArray];
      const [colour, position] = action.payload;
      tempMap[position[0]][position[1]] = colour;
      return {...state, currMap: {...state.currMap, mapArray: tempMap}};
    default:
      return initialMapState;
  }
};

export const MapContext = React.createContext(initialMapState);

export const MapProvider = ({ children }) => {
  const [mapState, dispatch] = useReducer(mapReducer, initialMapState);

  return (
    <MapContext.Provider value={{ mapState, dispatch }}>
      {children}
    </MapContext.Provider>
  );
};
