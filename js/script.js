import { setGrid } from "./grid.js";
import { getOrder } from "./utils.js";
import { createImgElements } from "./tiles.js";
import { handleClickMiniPlayer, addImgEvent } from "./event.js";

async function init() {
  // ERR: Doesn't call setGrid() when first entered the page
  window.addEventListener("load", setGrid);
  window.addEventListener("resize", setGrid);

  const orders = await getOrder("./order.json");

  const artists = orders.map((order) => order.name);
  const musics = orders.reduce((acc, { name, musics }) => {
    const musicsOfCurrArtist = musics.map((e) => {
      return { artist: name, music: e };
    });
    return [...acc, ...musicsOfCurrArtist];
  }, []);

  await createImgElements(artists, musics);
  setGrid();

  const miniPlayers = document.querySelectorAll(".mini-audio-player");
  miniPlayers.forEach((miniPlayer) => {
    miniPlayer.addEventListener("click", handleClickMiniPlayer);
  });

  document.querySelectorAll("img").forEach((img) => addImgEvent(img));
}

init();

// TODO: edit img hover effect
