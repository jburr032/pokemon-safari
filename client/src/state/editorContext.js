import React, { useReducer } from "react";

export const editorTypes = {
    SET_DIMENSIONS: "SET_DIMENSIONS",
    CLOSE_EDITOR_MODAL: "CLOSE_EDITOR_MODAL"
}

const initialEditorState = {
    currDimensions: {
      currWidth: 368,
      currHeight: 368
    },
    editorModal: false
};

const editorReducer = (state, action) => {
  const { SET_DIMENSIONS, CLOSE_EDITOR_MODAL } = editorTypes;

  switch (action.type) {
    case SET_DIMENSIONS:
      return {...state, currDimensions: action.payload };

    case CLOSE_EDITOR_MODAL:
      return {...state, editorModal: action.payload };

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