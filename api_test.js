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
      const url = `${baseURL}&part=snippet&maxResults=1&q=BENEE&type=channel`;

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

function getVideo() {
  fetch("./youtube_data_api_v3_key.txt")
    .then((res) => {
      return res.text();
    })
    .then((text) => {
      const API_KEY = text;
      const baseURL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}`;
      // TODO: obj to url
      const url = `${baseURL}&part=snippet&maxResults=1&q=Glitter&type=video`;

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

function parse_str(str) {
  return str.split("&").reduce(function (params, param) {
    var paramSplit = param.split("=").map(function (value) {
      return decodeURIComponent(value.replace("+", " "));
    });
    params[paramSplit[0]] = paramSplit[1];
    return params;
  }, {});
}

function ex2() {
  const videoID = "1ptPHjQi5v4";
  fetch(
    "https://cors-anywhere.herokuapp.com/" +
      "https://www.youtube.com/get_video_info?video_id=" +
      videoID
  )
    .then((res) => {
      if (res.ok) {
        return res.text();
      }
    })
    .then((text) => {
      const ytplayer = parse_str(text);
      console.log(ytplayer);
      console.log(JSON.parse(ytplayer.player_response));
      const videoUrls = ytplayer.config.args.adaptive_fmts
        .split(",")
        .map((item) =>
          item
            .split("&")
            .reduce(
              (prev, curr) => (
                (curr = curr.split("=")),
                Object.assign(prev, { [curr[0]]: decodeURIComponent(curr[1]) })
              ),
              {}
            )
        )
        .reduce(
          (prev, curr) =>
            Object.assign(prev, {
              [curr.quality_label || curr.type]: curr,
            }),
          {}
        );

      console.log(videoUrls);
    });
}

// part, maxResults, q, type

// Info about amount used -> google console
// About Search API -> https://developers.google.com/youtube/v3/docs/search/list

// Youtube Channel URL : https://www.youtube.com/channel/{id}
// Youtube Video URL : https://youtu.be/{id}
