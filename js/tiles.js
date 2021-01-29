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
  // console.log(channelImgList);
  const channelImgList = {
    BENEE:
      "https://yt3.ggpht.com/ytc/AAUvwninsslw_7HKA70ldU4z0C88dItlPwFCGrQkp-1b-Q=s240-c-k-c0xffffffff-no-rj-mo",
    "Ariana Grande":
      "https://yt3.ggpht.com/ytc/AAUvwngICx3BtKy8ZhsJUl37xoYPeaWWtZ3qXTVWG6gvug=s240-c-k-c0xffffffff-no-rj-mo",
    "Almost Monday":
      "https://yt3.ggpht.com/ytc/AAUvwnj-EPICaxF0w-bB6gfhUQx-2bbIItL071FoK6Pv=s240-c-k-c0xffffffff-no-rj-mo",
    "Easy Life":
      "https://yt3.ggpht.com/ytc/AAUvwnjIbYeAsseRgfKhZOZA-w6EwT8WwL5tLoRcifkmAg=s240-c-k-c0xffffffff-no-rj-mo",
    Heyden:
      "https://yt3.ggpht.com/ytc/AAUvwnhk7R8mLP5HIBzm9biGOXM5FTcguiz9IesXOApbGg=s240-c-k-c0xffffffff-no-rj-mo",
  };

  shuffle(musicList).forEach((music) => {
    createMusicElement(channelImgList, music);
  });

  setGrid();
};
