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

const playBtnBox = document.querySelector(".play-btn-container");

playBtnBox.addEventListener("click", (e) => {
  const playBtn = e.currentTarget.querySelector(".play-btn");
  playBtn.classList.toggle("fa-play");
  playBtn.classList.toggle("fa-pause");
  wavesurfer.playPause();
});

const volumeBtnBox = document.querySelector(".volume-btn-container");
const previousStatus = null;

volumeBtnBox.addEventListener("click", (e) => {
  const volumeBtn = e.currentTarget.querySelector(".volume-btn");
  volumeBtn.classList.toggle("fa-volume-up");
  volumeBtn.classList.toggle("fa-volume-off");
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
  const sliderWidth = volumeSlider.offsetWidth;
  const newVolume = e.offsetX / parseInt(sliderWidth);
  wavesurfer.setVolume(newVolume);
  volumePercentage.style.width = `${newVolume * 100}%`;
  // audio.volume = newVolume;
  // audioPlayer.querySelector(".controls .volume-percentage").style.width =
  //   newVolume * 100 + "%";
});
