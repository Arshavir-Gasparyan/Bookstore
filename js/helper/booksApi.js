export const searchBooks = () => {
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
};
