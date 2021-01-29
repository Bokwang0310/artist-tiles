import { queryObjToString } from "./utils.js";

export const getApiKey = (path) => {
  return fetch(path).then((res) => res.text());
};

function getChannelImg(API_KEY, artist) {
  const baseURL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}`;
  const url =
    baseURL +
    queryObjToString({
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

export const storeChannelImg = (artistList, API_KEY) => {
  return artistList.reduce(async (acc, curr) => {
    const resolvedAcc = await acc.then();

    const url = await getChannelImg(API_KEY, curr);

    return Object.assign(resolvedAcc, { [curr]: url });
  }, Promise.resolve({}));
};
