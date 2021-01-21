// TODO: learn about how to reduce cost for api
function getList() {
  fetch("./youtube_data_api_v3_key.txt")
    .then((res) => {
      return res.text();
    })
    .then((text) => {
      const API_KEY = text;
      const baseURL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}`;
      // TODO: obj to url
      const url = `${baseURL}&part=id&maxResults=1&q=BENEE&type=channel`;

      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          console.log(json);
          console.log(JSON.stringify(json));
        });
    });
}

// part, maxResults, q, type

// Info about amount used -> google console
// About Search API -> https://developers.google.com/youtube/v3/docs/search/list

// Youtube Channel URL : https://www.youtube.com/channel/{id}
// Youtube Video URL : https://youtu.be/{id}
