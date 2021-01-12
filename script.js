const imgs = document.querySelectorAll("img");

imgs.forEach((img) => {
  img.addEventListener("click", (e) => {
    e.target.style.filter = "brightness(50%)";
    console.log(e.target.style.filter);
  });
});
