import { interval } from "./main/slyder.js";
import validation from "./helper/validation.js";
import { burgerMenu } from "./main/burgerMenu.js";
import { searchBooks } from "./helper/booksApi.js";

validation();
burgerMenu();
searchBooks();
