import { queryObjToString } from "./utils.js";

export const getApiKey = (path) => {
  return fetch(path).then((res) => res.text());
};

function getChannelImg(API_KEY, artist) {
  const baseURL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}`;
  const queryObj = {
    part: "snippet",
    maxResults: "1",
    q: artist,
    type: "channel",
  };

  const url = baseURL + queryObjToString(queryObj);
  return fetch(url)
    .then((res) => res.json())
    .then((obj) => obj.items[0].snippet.thumbnails.medium.url)
    .catch((err) => console.error(err));
}

// TODO: use real url
export const getAudio = (API_KEY, musicName) => {
  const baseURL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}`;
  const url = `${baseURL}&part=snippet&maxResults=1&q=${musicName}&type=video`;
  return fetch("./video_example.json")
    .then((res) => res.json())
    .then((obj) => console.log(obj))
    .catch((err) => console.error(err));
};

export const storeChannelImg = (artistList, API_KEY) => {
  const channelImgList = artistList.reduce(async (prev, curr) => {
    const resolvedPrev = await prev.then();

    const url = await getChannelImg(API_KEY, curr);

    return Object.assign(resolvedPrev, { [curr]: url });
  }, Promise.resolve({}));

  return channelImgList;
};
