import { setGrid } from "./grid.js";
import { showModal } from "./modal.js";
import { wavesurfer } from "./wave.js";

function addImgsEvent() {
  const imgList = document.querySelectorAll("img");

  imgList.forEach((img) => {
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
      // TOOD: implement music loading logic and stop music when modal closed.. or diff way
      wavesurfer.load("./audios/Easy Life - Nightmares.mp3");
      wavesurfer.on("ready", () => {
        wavesurfer.play();
      });
    });
  });
}

function addPlayEvent() {
  const playBtnBox = document.querySelector(".play-btn-container");

  playBtnBox.addEventListener("click", (e) => {
    const playBtn = e.currentTarget.querySelector(".play-btn");
    playBtn.classList.toggle("fa-play");
    playBtn.classList.toggle("fa-pause");
    wavesurfer.playPause();
  });
}

function addMuteEvent(isDown) {
  const volumeBtnBox = document.querySelector(".volume-btn-container");

  volumeBtnBox.addEventListener("click", () => {
    const volumeBtn = document.querySelector(".volume-btn");

    if (isDown) {
      volumeBtn.classList.toggle("fa-volume-down");
    } else {
      volumeBtn.classList.toggle("fa-volume-up");
    }
    volumeBtn.classList.toggle("fa-volume-off");

    wavesurfer.toggleMute();
  });
}

function addToggleSliderEvent(volumeControl, volumeSlider) {
  // TODO: set delay
  // => failed with a general method and removeHandler, gonna try with removing timer
  volumeControl.addEventListener("mouseout", () => {
    volumeSlider.classList.remove("hover");
  });

  volumeControl.addEventListener("mouseover", () => {
    volumeSlider.classList.add("hover");
  });
}

function addVolumeChangeEvent(isDown, volumeSlider) {
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
}

function addVolumeControlEvent() {
  let isDown = false;

  addMuteEvent(isDown);

  const volumeControl = document.querySelector(".volume-control");
  const volumeSlider = document.querySelector(".volume-slider");

  addToggleSliderEvent(volumeControl, volumeSlider);
  addVolumeChangeEvent(isDown, volumeSlider);

  // TODO: setPercentageWidthWithDefaultVolume()
  // => set percentage's width value by wavesurfer's default volume not editing css.
  // => the setting will implement after adjusting music volume.
}

function init() {
  window.addEventListener("load", setGrid);
  window.addEventListener("resize", setGrid);

  addImgsEvent();

  // TODO: Make control event enable after wavesurfer is loaded
  addPlayEvent();
  addVolumeControlEvent();
}
init();
