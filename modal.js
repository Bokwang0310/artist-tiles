const modal = document.querySelector(".modal");

const closeBtn = document.querySelector(".modal-close");
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

export const showModal = () => {
  modal.style.display = "block";
};
