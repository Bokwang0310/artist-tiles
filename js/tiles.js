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

export const createImgElements = (artistList) => {
  const shuffledList = shuffle(artistList);

  const container = document.querySelector(".container");

  shuffledList.forEach((artist) => {
    const imgBox = document.createElement("div");
    imgBox.classList.add("img-box");

    const img = document.createElement("img");
    // TODO: use youtube profile
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
