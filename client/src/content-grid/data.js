import ITEM_TYPES from "./itemTypes";

export const dropTiles = [
    {family: ITEM_TYPES.SIDE_BAR, type: ITEM_TYPES.MAP, src: "/maps/safari_zone.png"},
    {family: ITEM_TYPES.SIDE_BAR, type: ITEM_TYPES.MAP, src: "/maps/bills.png"},
    {family: ITEM_TYPES.SIDE_BAR, type: ITEM_TYPES.MAP, src: "/maps/safari_zone.png"},
    {family: ITEM_TYPES.SIDE_BAR, type: ITEM_TYPES.MAP, src: "/maps/bills.png"},
    // {family: ITEM_TYPES.SIDE_BAR, type: ITEM_TYPES.MAP, src: "/maps/bills.png"},

    // {family: ITEM_TYPES.SIDE_BAR, type: ITEM_TYPES.MAP, src: ""},
    // {family: ITEM_TYPES.SIDE_BAR, type: ITEM_TYPES.MAP, src: ""},
    // {family: ITEM_TYPES.SIDE_BAR, type: ITEM_TYPES.MAP, src: ""},

    {family: ITEM_TYPES.EDITOR, type: ITEM_TYPES.MAP, src: ""},
    {family: ITEM_TYPES.EDITOR, type: ITEM_TYPES.MAP, src: ""},
    {family: ITEM_TYPES.EDITOR, type: ITEM_TYPES.MAP, src: ""},
    {family: ITEM_TYPES.EDITOR, type: ITEM_TYPES.MAP, src: ""},
    {family: ITEM_TYPES.EDITOR, type: ITEM_TYPES.MAP, src: ""},
    {family: ITEM_TYPES.EDITOR, type: ITEM_TYPES.MAP, src: ""},
];

export const dropZones = [
    { 
        id: 0, 
        type: ITEM_TYPES.SIDE_BAR, 
        style: { border: "1px solid black", float: "left", width: "21%", height: "800px", overflow: "auto" } 
    },
    { 
        id: 1, 
        type: ITEM_TYPES.EDITOR, 
        style: { border: "1px solid black", width: "100%", height: "800px", display: "flex", flexWrap: "wrap" }
    }
];