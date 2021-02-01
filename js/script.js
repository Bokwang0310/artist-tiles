import { setGrid } from "./grid.js";
import { getOrder, spreadArrayEachKey } from "./utils.js";
import { createImgElements } from "./tiles.js";
import { handleClickMiniPlayer, addImgEvent } from "./event.js";

async function init() {
  // ERR: Doesn't call setGrid() when first entered the page
  window.addEventListener("load", setGrid);
  window.addEventListener("resize", setGrid);

  const orderObj = await getOrder("./order.json");
  const artistList = Object.keys(orderObj);
  const musicList = spreadArrayEachKey(orderObj, "artist", "name");

  await createImgElements(artistList, musicList);
  setGrid();

  const miniPlayerList = document.querySelectorAll(".mini-audio-player");
  miniPlayerList.forEach((miniPlayer) => {
    miniPlayer.addEventListener("click", handleClickMiniPlayer);
  });

  document.querySelectorAll("img").forEach((img) => addImgEvent(img));
}

init();

// TODO: edit img hover effect
