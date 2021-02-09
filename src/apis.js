import { isCached, objToQueryString } from "./utils";

export const getApiKey = (path) => fetch(path).then((res) => res.text());

async function getChannelImg(API_KEY, artist) {
  const baseURL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}`;
  const url =
    baseURL +
    objToQueryString({
      part: "snippet",
      maxResults: "1",
      q: artist,
      type: "channel",
    });

  return fetch(url)
    .then((res) => res.json())
    .then((obj) => obj.items[0].snippet.thumbnails.medium.url)
    .catch((err) => console.error(err));
}

export const getChannelImgs = async (oldObj, newArr, API_KEY) => {
  if (isCached(oldObj, newArr)) {
    return oldObj;
  }

  // unused err
  API_KEY;
  storeChannelImg;

  // const channelImgs = await storeChannelImg(newArr, API_KEY);
  // sessionStorage.setItem("channelImgs", JSON.stringify(channelImgs));
  // return channelImgs;

  return fetch("../channel_img_list_example.json").then((res) => res.json());
};

// unexport warning
export function storeChannelImg(artists, API_KEY) {
  return artists.reduce(async (acc, curr) => {
    const img = await getChannelImg(API_KEY, curr);

    return Object.assign(await acc.then(), { [curr]: img });
  }, Promise.resolve({}));
}
