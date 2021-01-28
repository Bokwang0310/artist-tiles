import { getApiKey, storeChannelImg } from "./youtube_api.js";
import { shuffle } from "./utils.js";
import { setGrid } from "./grid.js";

function createMusicElement(channelImgList, music) {
  const container = document.querySelector(".container");

  const imgBox = document.createElement("div");
  imgBox.classList.add("img-box");

  const img = document.createElement("img");

  const channelImg = channelImgList[music.artist];
  img.src = channelImg;
  img.alt = music.name;

  const miniAudioPlayer = document.createElement("div");
  miniAudioPlayer.classList.add("mini-audio-player");

  const playBtn = document.createElement("i");
  playBtn.classList.add("play-btn", "far", "fa-pause-circle", "fa-2x");

  const playBtnContainer = document.createElement("div");
  playBtnContainer.classList.add("play-btn-container");

  playBtnContainer.appendChild(playBtn);
  miniAudioPlayer.appendChild(playBtnContainer);

  imgBox.appendChild(img);
  imgBox.appendChild(miniAudioPlayer);
  container.appendChild(imgBox);
}

export const createImgElements = async (artistList, musicList) => {
  // const API_KEY = await getApiKey("./youtube_data_api_v3_key.txt");

  // const channelImgList = await storeChannelImg(artistList, API_KEY);
  const channelImgList = {
    BENEE:
      "https://yt3.ggpht.com/ytc/AAUvwninsslw_7HKA70ldU4z0C88dItlPwFCGrQkp-1b-Q=s240-c-k-c0xffffffff-no-rj-mo",
  };

  shuffle(musicList).forEach((music) => {
    createMusicElement(channelImgList, music);
  });
  setGrid();
};
