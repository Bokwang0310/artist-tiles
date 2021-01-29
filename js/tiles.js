import { getApiKey, storeChannelImg } from "./youtube_api.js";
import { shuffle } from "./utils.js";

function createMusicElement(channelImgList, music) {
  const container = document.querySelector(".container");

  const imgBox = document.createElement("div");
  imgBox.classList.add("img-box");

  const channelImg = channelImgList[music.artist];

  const img = document.createElement("img");
  img.src = channelImg;
  img.alt = `${music.artist} - ${music.name}`;

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

  // const channelImgList = await storeChannelImg(artistList, API_KEY);
  const channelImgList = await fetch(
    "./channel_img_list_example.json"
  ).then((res) => res.json());

  shuffle(musicList).forEach((music) => {
    createMusicElement(channelImgList, music);
  });
};
