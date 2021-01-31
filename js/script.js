import { createImgElements } from "./tiles.js";
import { setGrid } from "./grid.js";
import { showModal } from "./modal.js";
import { wavesurfer } from "./wave.js";
import { addVolumeControlEvent } from "./volume.js";
import { spreadArrayOfKeys, getOrder } from "./utils.js";

function handleClickImg(e) {
  if (!wavesurfer.isPlaying()) {
    const modalPlay = document.querySelector(".audio-player .play-btn");
    const miniPlayList = document.querySelectorAll(
      ".mini-audio-player .play-btn"
    );

    modalPlay.classList.remove("fa-play");
    modalPlay.classList.add("fa-pause");

    miniPlayList.forEach((miniPlay) => {
      miniPlay.classList.remove("fa-play-circle");
      miniPlay.classList.add("fa-pause-circle");
    });
  }

  const focusing = document.querySelector(".focus");

  if (focusing !== null) {
    focusing.classList.remove("focus");
    document.querySelector(".mini-audio-player.show").classList.remove("show");
  }

  if (!e.target.classList.contains("focus")) {
    const playBtnBox = document.querySelector(
      ".audio-player .play-btn-container"
    );
    playBtnBox.removeEventListener("click", togglePlay);

    wavesurfer.load(`./audios/${e.target.alt}.mp3`);
    wavesurfer.on("ready", () => {
      wavesurfer.play();

      playBtnBox.addEventListener("click", togglePlay);
      addVolumeControlEvent();
    });
  }

  e.target.classList.add("focus");
  e.target.parentElement
    .querySelector(".mini-audio-player")
    .classList.toggle("show");

  showModal();
}

function addImgEvent(img) {
  img.addEventListener("mouseover", (e) => {
    if (!e.target.classList.contains("focus")) {
      e.target.style.cssText = "filter: brightness(40%) blur(0.2em);";
    }
  });

  img.addEventListener("mouseout", (e) => {
    e.target.style.cssText = "";
  });

  img.addEventListener("click", handleClickImg);
}

function handleClickMiniPlayer(e) {
  if (e.target.classList[0] === "mini-audio-player") {
    showModal();
  } else {
    togglePlay();
  }
}

function togglePlay() {
  const modalPlay = document.querySelector(".audio-player .play-btn");
  const miniPlayList = document.querySelectorAll(
    ".mini-audio-player .play-btn"
  );

  modalPlay.classList.toggle("fa-play");
  modalPlay.classList.toggle("fa-pause");

  miniPlayList.forEach((miniPlay) => {
    miniPlay.classList.toggle("fa-play-circle");
    miniPlay.classList.toggle("fa-pause-circle");
  });

  wavesurfer.playPause();
}

// TODO: export preprocessing to modal.js
// => if click "other" switch not current one
function preprocessChangeMusic() {
  const playBtn = document.querySelector(".audio-player .play-btn");
  const volumeBtn = document.querySelector(".audio-player .volume-btn");
}

async function init() {
  // window.addEventListener("load", setGrid);
  // document.addEventListener("load", setGrid);
  // window.addEventListener("resize", setGrid);

  const orderObj = await getOrder("./order.json");
  const artistList = Object.keys(orderObj);
  const musicList = spreadArrayOfKeys(orderObj);

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
