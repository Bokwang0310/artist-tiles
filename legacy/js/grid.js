export const setGrid = () => {
  const grid = document.querySelector(".container");
  const rowHeight = parseInt(
    window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
  );
  const rowGap = parseInt(
    window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
  );

  const items = grid.querySelectorAll(".img-box");
  items.forEach((item) => {
    item.style.gridRowEnd = `span ${Math.floor(
      item.children[0].offsetHeight / 25
    )}`;
  });
};
