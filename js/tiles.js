import { getApiKey, storeChannelImg } from "./youtube_api.js";

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function getThumbnail(videoId, size = "big") {
  if (size === "small") {
    return `https://img.youtube.com/vi/${videoId}/2.jpg`;
  }
  return `https://img.youtube.com/vi/${videoId}/0.jpg`;
}

function createMusicElement(container, channelImgList, music) {
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
  const API_KEY = await getApiKey("./youtube_data_api_v3_key.txt");

  const container = document.querySelector(".container");

  const channelImgList = await storeChannelImg(artistList, API_KEY);

  shuffle(musicList).forEach((music) => {
    createMusicElement(container, channelImgList, music);
  });
};
