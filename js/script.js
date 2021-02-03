import { setGrid } from "./grid.js";
import { getOrder } from "./utils.js";
import { createImgElements } from "./tiles.js";
import { handleClickMiniPlayer, addImgEvent } from "./event.js";

async function init() {
  // ERR: Doesn't call setGrid() when first entered the page
  window.addEventListener("load", setGrid);
  window.addEventListener("resize", setGrid);

  const orders = await getOrder("./order.json");

  const artists = orders.map((order) => order.artist);
  const musicInfos = orders.reduce((acc, { artist, musics }) => {
    const musicsOfCurrArtist = musics.map((music) => {
      return { artist, music };
    });
    return [...acc, ...musicsOfCurrArtist];
  }, []);

  await createImgElements(artists, musicInfos);
  setGrid();

  document.querySelectorAll(".mini-audio-player").forEach((miniPlayer) => {
    miniPlayer.addEventListener("click", handleClickMiniPlayer);
  });

  document.querySelectorAll("img").forEach((img) => addImgEvent(img));
}

init();

// TODO: edit img hover effect
