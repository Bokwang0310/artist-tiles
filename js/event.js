import { wavesurfer } from "./wave.js";
import { showModal } from "./modal.js";
import { addVolumeControlEvent, togglePlay } from "./audio_control.js";

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

export const addImgEvent = (img) => {
  img.addEventListener("mouseover", (e) => {
    if (!e.target.classList.contains("focus")) {
      e.target.style.cssText = "filter: brightness(40%) blur(0.2em);";
    }
  });

  img.addEventListener("mouseout", (e) => {
    e.target.style.cssText = "";
  });

  img.addEventListener("click", handleClickImg);
};

export const handleClickMiniPlayer = (e) => {
  if (e.target.classList[0] === "mini-audio-player") {
    showModal();
  } else {
    togglePlay();
  }
};
