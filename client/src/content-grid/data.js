import ITEM_TYPES from "./itemTypes";

export const dropTiles = [
    {family: ITEM_TYPES.SIDE_BAR, type: ITEM_TYPES.MAP, src: "/maps/safari_zone.png", id: 0},
    {family: ITEM_TYPES.SIDE_BAR, type: ITEM_TYPES.MAP,src: "/maps/bills.png", id: 1},
    {family: ITEM_TYPES.EDITOR, type: ITEM_TYPES.MAP,src: "", id: 2},
    {family: ITEM_TYPES.EDITOR, type: ITEM_TYPES.MAP,src: "", id: 3},
    {family: ITEM_TYPES.EDITOR, type: ITEM_TYPES.MAP,src: "", id: 4},
    {family: ITEM_TYPES.EDITOR, type: ITEM_TYPES.MAP,src: "", id: 5}
];

export const dropZones = [
    { 
        id: 0, 
        type: ITEM_TYPES.SIDE_BAR, 
        style: { border: "1px solid black", float: "left", width: "21%", height: "800px" } 
    },
    { 
        id: 1, 
        type: ITEM_TYPES.EDITOR, 
        style: { border: "1px solid black", width: "900px", height: "800px", display: "flex",flexWrap: "wrap" }
    }
];