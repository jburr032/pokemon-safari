import React, { useReducer } from "react";
import {createMapHelper} from "./utils"

export const mapTypes = {
  SAVE_MAP: "SAVE_MAP",
  CREATE_MAP: "CREATE_MAP",
  UPDATE_MAP: "UPDATE_MAP",
  CHANGE_COLOUR: "CHANGE_COLOUR"
};

const initialMapState = {
  currMap: { mapArray: [[0]], mapName: "", mapFilepath: "" },
  currColour: "blue"
};

const mapReducer = (state, action) => {
  const { SAVE_MAP, CREATE_MAP, UPDATE_MAP } = mapTypes;

  switch (action.type) {
    case SAVE_MAP:
      // saves current map to JSON file
      return null;
    case CREATE_MAP:
      return {...state, currMap: createMapHelper(action.payload)};
    case CHANGE_COLOUR:
      return {...state, currColour: action.payload}
    case UPDATE_MAP:
      // accesses array based on coordinates and updates with value
      return null;
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
