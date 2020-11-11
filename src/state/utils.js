export const saveMapHelper = (grid) => {
  return grid.map(row => row.map(tile => console.log(tile.style)))
}