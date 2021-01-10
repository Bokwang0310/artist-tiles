function setGrid() {
  let grid = document.getElementsByClassName("container")[0];
  let rowHeight = parseInt(
    window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
  );
  let rowGap = parseInt(
    window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
  );

  let item = grid.getElementsByClassName("img-box");
  for (let i = 0; i < item.length; ++i) {
    item[i].style.gridRowEnd = `span ${Math.floor(
      item[i].children[0].offsetHeight / 25
    )}`;
  }
}

window.addEventListener("load", setGrid);
window.addEventListener("resize", setGrid);
