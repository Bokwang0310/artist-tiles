import { createImgElements } from "./tiles.js";
import { setGrid } from "./grid.js";
import { showModal } from "./modal.js";
import { wavesurfer } from "./wave.js";
import { addVolumeControlEvent } from "./volume.js";
import { spreadArrayOfKeys } from "./utils.js";

function handlePlayClick(e) {
  const playBtn = e.currentTarget.querySelector(".audio-player .play-btn");

  playBtn.classList.toggle("fa-play");
  playBtn.classList.toggle("fa-pause");

  wavesurfer.playPause();
}

function handleClickImg(e) {
  const focusing = document.querySelector(".focus");
  const hiddenMiniAudioPlayer = document.querySelector(
    ".mini-audio-player.show"
  );

  if (focusing !== null) {
    focusing.classList.remove("focus");
    hiddenMiniAudioPlayer.classList.remove("show");
  }

  e.target.classList.add("focus");
  e.target.parentElement
    .querySelector(".mini-audio-player")
    .classList.toggle("show");

  // TODO: check which one pressed
  // => new one : init modal icon and reload new music
  // => current one : leave all
  showModal();

  // TOOD: implement music loading logic and stop music when modal closed.. or diff way
  wavesurfer.load("./audios/Easy Life - Nightmares.mp3");

  wavesurfer.on("ready", () => {
    wavesurfer.play();
    const playBtnBox = document.querySelector(
      ".audio-player .play-btn-container"
    );
    playBtnBox.addEventListener("click", handlePlayClick);
    addVolumeControlEvent();
  });
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

  window.addEventListener("load", () => {
    const playBtnContainer = img.parentElement.querySelector(
      ".mini-audio-player .play-btn-container"
    );

    playBtnContainer.addEventListener("click", (e) => {
      e.currentTarget
        .querySelector(".play-btn")
        .classList.toggle("fa-pause-circle");
      e.currentTarget
        .querySelector(".play-btn")
        .classList.toggle("fa-play-circle");

      wavesurfer.playPause();
    });
  });
}

// TODO: export preprocessing to modal.js
// => if click "other" switch not current one
function preprocessChangeMusic() {
  const playBtn = document.querySelector(".audio-player .play-btn");
  const volumeBtn = document.querySelector(".audio-player .volume-btn");
}

async function getOrder(path) {
  return await fetch(path)
    .then((res) => res.json())
    .catch((err) => console.error(err));
}

async function init() {
  const orderObj = await getOrder("./order.json");

  const artistList = Object.keys(orderObj);
  const musicList = spreadArrayOfKeys(orderObj);

  createImgElements(artistList, musicList);

  window.addEventListener("load", setGrid);
  window.addEventListener("resize", setGrid);

  document.querySelectorAll("img").forEach(addImgEvent);
}

init();
