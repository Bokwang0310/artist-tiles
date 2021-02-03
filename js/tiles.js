import { getApiKey, storeChannelImg } from "./youtube_api.js";
import { shuffle, hasSameElements } from "./utils.js";

function createMusicElement(channelImgs, music) {
  const container = document.querySelector(".container");

  const imgBox = document.createElement("div");
  imgBox.classList.add("img-box");

  const channelImg = channelImgs[music.artist];

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

function isCached(oldObj, newArr) {
  if (!oldObj) {
    return false;
  }

  const oldArr = Object.keys(oldObj);

  if (oldArr.length !== newArr.length || !hasSameElements(oldArr, newArr)) {
    return false;
  }

  return true;
}

async function getChannelImgs(oldObj, newArr, API_KEY) {
  if (isCached(oldObj, newArr)) {
    return oldObj;
  }

  // const channelImgs = await storeChannelImg(newArr, API_KEY);
  // sessionStorage.setItem("channelImgs", JSON.stringify(channelImgs));
  // return channelImgs;

  return await fetch("./channel_img_list_example.json").then((res) =>
    res.json()
  );
}

export const createImgElements = async (artists, musics) => {
  const API_KEY = await getApiKey("./youtube_data_api_v3_key.txt");

  const oldObj = JSON.parse(sessionStorage.getItem("channelImgList"));

  const channelImgList = await getChannelImgs(oldObj, artists, API_KEY);

  shuffle(musics).forEach((music) => {
    createMusicElement(channelImgList, music);
  });
};
