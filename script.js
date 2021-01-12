import { showModal } from "./modal.js";

const imgs = document.querySelectorAll("img");

imgs.forEach((img) => {
  img.addEventListener("mouseover", (e) => {
    if (!e.target.classList.contains("focus")) {
      e.target.style.cssText = "filter: brightness(40%) blur(0.2em);";
    }
  });

  img.addEventListener("mouseout", (e) => {
    e.target.style.cssText = "";
  });

  img.addEventListener("click", (e) => {
    const focusing = document.querySelector(".focus");
    if (focusing !== null) {
      focusing.classList.remove("focus");
    }
    e.target.classList.add("focus");
    showModal();
  });
});

document.querySelector("h1").addEventListener("click", () => {
  const audio = new Audio("audios/Easy Life - Nightmares.mp3");
  audio.volume = 0.1;
  audio.play();
});
