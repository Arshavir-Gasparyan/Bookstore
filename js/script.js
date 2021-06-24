let counter = 1;
setInterval(function () {
  document.getElementById("radio" + counter).checked = true;
  counter++;
  if (counter > 3) {
    counter = 1;
  }
}, 4000);

let submitButton = document.querySelector("button");
let inputs = document.querySelectorAll("input");
let form = document.querySelector("form");
let userNameError = document.getElementById("inp1");
let lastNameError = document.getElementById("inp2");
let emailError = document.getElementById("inp3");
let passError = document.getElementById("inp4");
submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  let status = true;
  let [firstname, lastname, email, password] = Array.from(inputs).map(
    (item) => item.value
  );

  if (firstname.length === 0 || !isNaN(firstname)) {
    document.getElementById("inp1").value = "";
    userNameError.placeholder = "Մուտքագրեք անունը";
    status = false;
  }
  if (lastname.length === 0 || !isNaN(lastname)) {
    document.getElementById("inp2").value = "";
    lastNameError.placeholder = "Մուտքագրեք ազգանունը";
    status = false;
  }
  if (
    !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      email
    )
  ) {
    document.getElementById("inp3").value = "";
    emailError.placeholder = "Մուտքագրեք էլ․ փուստը";
    status = false;
  }
  if (password.length < 5) {
    document.getElementById("inp4").value = "";
    passError.placeholder = "Մուտքագրեք գաղտնաբառը";
    status = false;
  }
  if (status) {
    alert("successfuly submited");

    return;
  }
});

let registration = document.getElementById("registration");
registration.addEventListener("click", (event) => {
  event.preventDefault();
  document.getElementById("background").style.display = "block";
  document.getElementById("registr").style.display = "block";
});
let background = document.getElementById("background");
background.addEventListener("click", (event) => {
  event.preventDefault();
  background.style.display = "none";
  document.getElementById("registr").style.display = "none";
});

let burgerIcon = document.getElementById("icon");
burgerIcon.addEventListener("click", () => {
  let nav = document.getElementById("nav");
  if (nav.style.display === "none") {
    nav.style.display = "block";
    burgerIcon.style.display = "block";
  } else nav.style.display = "none";
});
