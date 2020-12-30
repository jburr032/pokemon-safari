import React, { useReducer } from "react";

export const mapTypes = {
  SAVE_MAP: "SAVE_MAP",
  CREATE_MAP: "CREATE_MAP",
  UPDATE_MAP: "UPDATE_MAP",
  CHANGE_COLOUR: "CHANGE_COLOUR",
  SET_COLOUR: "SET_COLOUR",
  CHANGE_MAP: "CHANGE_MAP"
};

const initialMapState = {
  currMap: [],
  currColour: "blue",
  savedMap: [],
  saveError: false,
  selectedColour: "blue",
  listOfMaps: ["pallet_town", "bills_house", "safari_zone"]
};

const mapReducer = (state, action) => {
  const { SAVE_MAP, CHANGE_MAP } = mapTypes;

  switch (action.type) {
    case SAVE_MAP:
      return {...state, savedMap: action.payload };
    case CHANGE_MAP:
      return {...state, currMap: action.payload }
    default:
      return state;
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
