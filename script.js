import { showModal } from "./modal.js";
import { wavesurfer } from "./wave.js";

const imgs = document.querySelectorAll("img");

imgs.forEach((img) => {
  img.addEventListener("mouseover", (e) => {
    if (!e.target.classList.contains("focus")) {
      e.target.style.cssText = "filter: brightness(40%) blur(0.2em);";
    }
  });

  img.addEventListener("mouseout", (e) => {
    e.target.style.cssText = "";
  });

  img.addEventListener("click", (e) => {
    const focusing = document.querySelector(".focus");
    if (focusing !== null) {
      focusing.classList.remove("focus");
    }
    e.target.classList.add("focus");
    showModal();
    // TOOD: music loading logic
    wavesurfer.load("./audios/Easy Life - Nightmares.mp3");
    wavesurfer.on("ready", () => {
      wavesurfer.play();
    });
  });
});

// TODO: Make control evente nable after waveserfer is loaded

const playBtnBox = document.querySelector(".play-btn-container");

playBtnBox.addEventListener("click", (e) => {
  const playBtn = e.currentTarget.querySelector(".play-btn");
  playBtn.classList.toggle("fa-play");
  playBtn.classList.toggle("fa-pause");
  wavesurfer.playPause();
});

const volumeBtnBox = document.querySelector(".volume-btn-container");
let isDown = false;

volumeBtnBox.addEventListener("click", (e) => {
  const volumeBtn = document.querySelector(".volume-btn");

  if (isDown) {
    volumeBtn.classList.toggle("fa-volume-down");
  } else {
    volumeBtn.classList.toggle("fa-volume-up");
  }
  volumeBtn.classList.toggle("fa-volume-off");

  wavesurfer.toggleMute();
});

const volumeControl = document.querySelector(".volume-control");
const volumeSlider = document.querySelector(".volume-slider");

// TODO: set delay
volumeControl.addEventListener("mouseover", (e) => {
  volumeSlider.classList.add("hover");
});

volumeControl.addEventListener("mouseout", (e) => {
  volumeSlider.classList.remove("hover");
});

const volumePercentage = document.querySelector(".volume-percentage");

volumeSlider.addEventListener("click", (e) => {
  const volumeBtn = document.querySelector(".volume-btn");

  if (wavesurfer.getMute()) {
    wavesurfer.setMute(false);
    volumeBtn.classList.remove("fa-volume-off");
  }

  const sliderWidth = volumeSlider.offsetWidth;
  const newVolume = e.offsetX / parseInt(sliderWidth);

  if (newVolume * 100 < 50) {
    volumeBtn.classList.remove("fa-volume-up");
    volumeBtn.classList.add("fa-volume-down");
    isDown = true;
  } else {
    volumeBtn.classList.remove("fa-volume-down");
    volumeBtn.classList.add("fa-volume-up");
    isDown = false;
  }

  wavesurfer.setVolume(newVolume);
  volumePercentage.style.width = `${newVolume * 100}%`;
});
