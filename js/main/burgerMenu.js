export const burgerMenu = () => {
  let burgerIcon = document.getElementById("icon");

  burgerIcon.addEventListener("click", () => {
    let nav = document.getElementById("nav");

    if (nav.style.display === "none") {
      nav.style.display = "block";
      burgerIcon.style.display = "block";
    } else nav.style.display = "none";
  });
};
