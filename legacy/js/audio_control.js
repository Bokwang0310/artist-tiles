import { wavesurfer } from "./wave.js";

// TODO: consider turning volumeSlider into global variable

// :(
let isQuiet = false;

function handleClickMute() {
  const volumeBtn = document.querySelector(".audio-player .volume-btn");

  if (isQuiet) {
    volumeBtn.classList.toggle("fa-volume-down");
  } else {
    volumeBtn.classList.toggle("fa-volume-up");
  }
  volumeBtn.classList.toggle("fa-volume-off");

  wavesurfer.toggleMute();
}

function handleClickSlider(e) {
  const volumeSlider = document.querySelector(".volume-slider");
  const volumeBtn = document.querySelector(".audio-player .volume-btn");
  const volumePercentage = document.querySelector(".volume-percentage");

  if (wavesurfer.getMute()) {
    wavesurfer.setMute(false);
    volumeBtn.classList.remove("fa-volume-off");
  }

  const sliderWidth = volumeSlider.offsetWidth;
  const newVolume = e.offsetX / parseInt(sliderWidth);

  if (newVolume * 100 < 50) {
    volumeBtn.classList.remove("fa-volume-up");
    volumeBtn.classList.add("fa-volume-down");
    isQuiet = true;
  } else {
    volumeBtn.classList.remove("fa-volume-down");
    volumeBtn.classList.add("fa-volume-up");
    isQuiet = false;
  }

  wavesurfer.setVolume(newVolume);
  volumePercentage.style.width = `${newVolume * 100}%`;
}

function handleMouseOutVolumeControl() {
  const volumeSlider = document.querySelector(".volume-slider");
  volumeSlider.classList.remove("hover");
}

function handleMouseOverVolumeControl() {
  const volumeSlider = document.querySelector(".volume-slider");
  volumeSlider.classList.add("hover");
}

export const addVolumeControlEvent = () => {
  const volumeBtnContainer = document.querySelector(
    ".audio-player .volume-btn-container"
  );

  volumeBtnContainer.removeEventListener("click", handleClickMute);
  volumeBtnContainer.addEventListener("click", handleClickMute);

  const volumeSlider = document.querySelector(".volume-slider");
  volumeSlider.removeEventListener("click", handleClickSlider);
  // TODO: change volume by dragging
  volumeSlider.addEventListener("click", handleClickSlider);

  const volumeControl = document.querySelector(".volume-control");

  volumeControl.removeEventListener("mouseout", handleMouseOutVolumeControl);
  volumeControl.removeEventListener("mouseover", handleMouseOverVolumeControl);

  // TODO: set delay
  volumeControl.addEventListener("mouseout", handleMouseOutVolumeControl);
  volumeControl.addEventListener("mouseover", handleMouseOverVolumeControl);

  // TODO: setPercentageWidthWithDefaultVolume()
  // => set percentage's width value by wavesurfer's default volume not editing css.
  // => the setting will implement after adjusting music volume.
};

export const togglePlay = () => {
  const modalPlayBtn = document.querySelector(".audio-player .play-btn");
  const miniPlayBtns = document.querySelectorAll(
    ".mini-audio-player .play-btn"
  );

  modalPlayBtn.classList.toggle("fa-play");
  modalPlayBtn.classList.toggle("fa-pause");

  miniPlayBtns.forEach((miniPlayBtn) => {
    miniPlayBtn.classList.toggle("fa-play-circle");
    miniPlayBtn.classList.toggle("fa-pause-circle");
  });

  wavesurfer.playPause();
};
