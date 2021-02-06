import { objToQueryString } from "./utils.js";

export const getApiKey = async (path) => {
  return fetch(path).then((res) => res.text());
};

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

export const storeChannelImg = (artists, API_KEY) => {
  return artists.reduce(async (acc, curr) => {
    const img = await getChannelImg(API_KEY, curr);

    return Object.assign(await acc.then(), { [curr]: img });
  }, Promise.resolve({}));
};
// export const callFunctionByElement = (arr, API_KEY) => {
//   return arr.reduce(async (acc, curr) => {
//     const response = await getChannelImg(API_KEY, curr);

//     return Object.assign(await acc.then(), { [curr]: response });
//   }, Promise.resolve({}));
// };
