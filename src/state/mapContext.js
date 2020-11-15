import React, { useReducer } from "react";

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
  const { SAVE_MAP } = mapTypes;

  switch (action.type) {
    case SAVE_MAP:
      return {...state, savedMap: action.payload };

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
