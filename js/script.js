let counter = 1;
setInterval(function () {
  document.getElementById("radio" + counter).checked = true;
  counter++;
  if (counter > 3) {
    counter = 1;
  }
}, 2000);

// form validation

let submitButton = document.getElementById("form");
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
  api.style.display = "none";
  background.style.display = "none";
  document.getElementById("registr").style.display = "none";
});

// burgerMenu

let burgerIcon = document.getElementById("icon");
burgerIcon.addEventListener("click", () => {
  let nav = document.getElementById("nav");
  if (nav.style.display === "none") {
    nav.style.display = "block";
    burgerIcon.style.display = "block";
  } else nav.style.display = "none";
});
//books api
const search = document.getElementById("url");
const submit = document.getElementById("searchBooks");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const table = document.getElementById("tab");
const api = document.getElementById("api");
const baseUrl = "https://openlibrary.org/search.json?q=";
let page = 1;
let total;
let totalPages;
let searchTerm;
let fillRows = (data) => {
  let temp = document.createElement("tbody");
  for (let b of data) {
    let tr = document.createElement("tr");
    let title = document.createElement("td");
    if (b.title === undefined) {
      title.innerText = "does not exist";
    } else title.innerText = b.title;
    let author = document.createElement("td");
    if (b.author_name === undefined) {
      author.innerText = "does not exist";
    } else author.innerText = b.author_name;
    let year = document.createElement("td");
    if (b.publish_year === undefined) {
      year.innerText = "does not exist";
    } else year.innerText = b.publish_year;
    tr.appendChild(title);
    tr.appendChild(author);
    tr.appendChild(year);
    temp.appendChild(tr);
    // table.appendChild(temp);
  }
  return temp;
};
const fetchBook = (book) => {
  const tableBody = document.querySelector("tbody");
  searchTerm = search.value;
  fetch(`${baseUrl}${book}&page=${page}`)
    .then((res) => res.json())
    .then((data) => {
      total = data.numFound;
      totalPages = Math.ceil(total / 100);
      tableBody.replaceWith(fillRows(data.docs));
      console.log(data);
    });
};
// fetchBook(searchTerm);
submit.addEventListener("click", (event) => {
  event.preventDefault();
  if (search.value !== "") {
    setTimeout(() => {
      api.style.display = "block";
    }, 5000);
    fetchBook(search.value);
    background.style.display = "block";
  }
});
prevBtn.addEventListener("click", () => {
  if (total && page > 1) {
    --page;
    fetchBook(searchTerm);
  }
});
nextBtn.addEventListener("click", () => {
  if (total && page < totalPages) {
    ++page;
    fetchBook(searchTerm);
  }
});
