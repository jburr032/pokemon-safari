import React, { useContext, useEffect, useState } from "react";
import { MapContext } from "../state/mapContext";

export default function MapEditor() {
  const { mapState, dispatch } = useContext(MapContext);
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    setGrid(mapState.currMap);
  }, [mapState]);

  const mapEditorStyles = {
    width: "300px",
    height: "300px",
    position: "relative",
    backgroundColor: "blue"
  };

  console.log("grid", grid)

  return (
    <div style={mapEditorStyles}>
      {grid !== undefined && grid.map((row, index) => (
          <div key={index}>
            {row.map((cell) => (
              <div
                style={{
                  display: "inline-flex",
                  position: "relative",
                  width: "16px",
                  height: "16px"
                }}
                key={index}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}
