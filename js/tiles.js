function shuffle(array) {
  const copy = [...array];
  let currentIndex = copy.length;

  while (0 !== currentIndex) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    const temporaryValue = copy[currentIndex];
    copy[currentIndex] = copy[randomIndex];
    copy[randomIndex] = temporaryValue;
  }

  return copy;
}

// will use
function getImgSrc(url, size = "big") {
  if (url === null) {
    return "";
  }

  const results = url.match("[\\?&]v=([^&#]*)");
  const video = results === null ? url : results[1];

  if (size === "small") {
    return "http://img.youtube.com/vi/" + video + "/2.jpg";
  }
  return "http://img.youtube.com/vi/" + video + "/0.jpg";
}

export const createImgElements = (artistList) => {
  const shuffledList = shuffle(artistList);

  const container = document.querySelector(".container");

  shuffledList.forEach((artist) => {
    const imgBox = document.createElement("div");
    imgBox.classList.add("img-box");

    const img = document.createElement("img");
    // TODO: use youtube profile
    // const thumb = getImgSrc("https://www.youtube.com/watch?v=D3gmU0GOTXI");
    // img.src = thumb;
    img.src = `./images/${artist}.jpg`;
    img.alt = artist;

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
  });
};
