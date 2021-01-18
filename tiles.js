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

    imgBox.appendChild(img);
    container.appendChild(imgBox);
  });
};
