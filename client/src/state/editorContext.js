import React, { useReducer } from "react";

export const editorTypes = {
    SET_DIMENSIONS: "SET_DIMENSIONS"
}

const initialEditorState = {
    currDimensions: {
      currWidth: 368,
      currHeight: 368
    }
};

const editorReducer = (state, action) => {
  const { SET_DIMENSIONS } = editorTypes;

  switch (action.type) {
    case SET_DIMENSIONS:
      return {...state, currDimensions: action.payload };

    default:
      return state;
  }
};

export const EditorContext = React.createContext(initialEditorState);

export const EditorProvider = ({ children }) => {
  const [editorState, editorDispatcher] = useReducer(editorReducer, initialEditorState);

  return (
    <EditorContext.Provider value={{ editorState, editorDispatcher }}>
      {children}
    </EditorContext.Provider>
  );
};