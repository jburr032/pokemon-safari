import React from "react";
import MapSquare from "./DropSquare";
import { mapList } from "./data";

const DropColumns = ({ children, style }) => {

    return (
        <div style={style}>
            {children}
        </div>
    )
}

export default DropColumns;
