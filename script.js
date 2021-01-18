import { createImgElements } from "./tiles.js";
import { setGrid } from "./grid.js";
import { showModal } from "./modal.js";
import { wavesurfer } from "./wave.js";
import { addVolumeControlEvent } from "./volume.js";

function handlePlayClick(e) {
  const playBtn = e.currentTarget.querySelector(".play-btn");

  playBtn.classList.toggle("fa-play");
  playBtn.classList.toggle("fa-pause");

  wavesurfer.playPause();
}

function handleClickImg(e) {
  const focusing = document.querySelector(".focus");

  if (focusing !== null) {
    focusing.classList.remove("focus");
  }

  e.target.classList.add("focus");
  showModal();

  // TOOD: implement music loading logic and stop music when modal closed.. or diff way
  wavesurfer.load("./audios/Easy Life - Nightmares.mp3");

  wavesurfer.on("ready", () => {
    wavesurfer.play();
    const playBtnBox = document.querySelector(".play-btn-container");
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
}

// TODO: export preprocessing to modal.js
function preprocessCloseModal() {}

function init() {
  createImgElements([
    "Ariana Grande",
    "Easy Life",
    "Jack Stauber",
    "Heyden",
    "Ariana Grande",
    "Clay And Friends",
    "Jack Stauber",
  ]);

  window.addEventListener("load", setGrid);
  window.addEventListener("resize", setGrid);

  document.querySelectorAll("img").forEach(addImgEvent);
}

init();
