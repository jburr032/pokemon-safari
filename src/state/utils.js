export const createMapHelper = (axis) => {
  let grid = [];
  const { x, y } = axis;

  for (let i = 0; i < y; i++) {
    let row = [];
    for (let j = 0; j < x; j++) {
      row.push(0);
    }

    grid.push(row);
  }
  console.log("grid", grid)

  return grid;
};
