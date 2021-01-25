export const getApiKey = (path) => {
  return fetch(path).then((res) => res.text());
};

function queryObjToString(obj) {}

// TODO: to using real api
export const getChannelImg = (API_KEY, artist) => {
  const baseURL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}`;
  const url = `${baseURL}&part=snippet&maxResults=1&q=${artist}&type=channel`;
  return fetch("./snippet_example.json")
    .then((res) => res.json())
    .then((obj) => obj.items[0].snippet.thumbnails.medium.url)
    .catch((err) => console.error(err));
};

export const getAudio = (API_KEY, musicName) => {
  const baseURL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}`;
  const url = `${baseURL}&part=snippet&maxResults=1&q=${artist}&type=channel`;
  return fetch("./video_example.json")
    .then((res) => res.json())
    .then((obj) => console.log(obj))
    .catch((err) => console.error(err));
};
