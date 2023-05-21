// define book constructor
// allow it to take arguments from the console
// format page to allow rows of books
// connect the constructor to a form on the page
// could also maybe use regular text input and innerHTML
// add attribute that changes based on read or not read

const addBookButton = document.querySelector(".add-book");
const addBookModal = document.querySelector(".new-book-modal");
const body = document.querySelector("body");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function info() {
    return `$[title], $[author], $[pages], $[read]`;
  };
}

function closeModal() {
  addBookModal.classList.toggle("show");
  body.removeEventListener("click", closeModal);
  console.log(addBookModal.classList);
}

function openModal() {
  addBookModal.classList.toggle("show");
//   body.addEventListener("click", closeModal);
  console.log(addBookModal.classList);
}

addBookButton.addEventListener("click", openModal);
