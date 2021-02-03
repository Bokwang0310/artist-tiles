const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".modal-close");

export const showModal = () => {
  modal.style.display = "block";
};

// TODO: init audio, css (play btn) ..etc
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// show / hide
