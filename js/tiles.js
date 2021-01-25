import { getApiKey, getChannelImg } from "./youtube_api.js";

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function getThumbnail(videoId, size = "big") {
  if (size === "small") {
    return `https://img.youtube.com/vi/${videoId}/2.jpg`;
  }
  return `https://img.youtube.com/vi/${videoId}/0.jpg`;
}

async function createMusicElement(API_KEY, container, music) {
  const imgBox = document.createElement("div");
  imgBox.classList.add("img-box");

  const img = document.createElement("img");

  // const channelImg = await getChannelImg(music.artist, API_KEY)
  // img.src = channelImg;
  // img.alt = music.name;

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

export const createImgElements = async (musicList) => {
  const API_KEY = await getApiKey("./youtube_data_api_v3_key.txt");

  const container = document.querySelector(".container");

  const shuffledList = shuffle(musicList);
  shuffledList.forEach((music) => {
    createMusicElement(API_KEY, container, music);
  });
};
