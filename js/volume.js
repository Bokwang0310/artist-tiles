import { wavesurfer } from "./wave.js";

function handleClickMute(isDown) {
  const volumeBtn = document.querySelector(".audio-player .volume-btn");

  if (isDown) {
    volumeBtn.classList.toggle("fa-volume-down");
  } else {
    volumeBtn.classList.toggle("fa-volume-up");
  }
  volumeBtn.classList.toggle("fa-volume-off");

  wavesurfer.toggleMute();
}

function addToggleSliderEvent(volumeSlider) {
  const volumeControl = document.querySelector(".volume-control");
  // TODO: set delay
  // => failed with a general method and removeHandler, gonna try with removing timer
  volumeControl.addEventListener("mouseout", () => {
    volumeSlider.classList.remove("hover");
  });

  volumeControl.addEventListener("mouseover", () => {
    volumeSlider.classList.add("hover");
  });
}

function handleClickSlider(e, isDown, volumeSlider) {
  const volumePercentage = document.querySelector(".volume-percentage");
  const volumeBtn = document.querySelector(".audio-player .volume-btn");

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
}

export const addVolumeControlEvent = () => {
  let isDown = false;

  const volumeBtnBox = document.querySelector(
    ".audio-player .volume-btn-container"
  );
  volumeBtnBox.addEventListener("click", () => {
    handleClickMute(isDown);
  });

  const volumeSlider = document.querySelector(".volume-slider");

  addToggleSliderEvent(volumeSlider);
  // TODO: change volume by dragging

  volumeSlider.addEventListener("click", (e) => {
    handleClickSlider(e, isDown, volumeSlider);
  });

  // TODO: setPercentageWidthWithDefaultVolume()
  // => set percentage's width value by wavesurfer's default volume not editing css.
  // => the setting will implement after adjusting music volume.
};
