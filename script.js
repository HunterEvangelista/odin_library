// define book constructor
// allow it to take arguments from the console
// format page to allow rows of books
// connect the constructor to a form on the page
// could also maybe use regular text input and innerHTML
// add attribute that changes based on read or not read

const addBookButton = document.querySelector(".add-book");
const addBookModal = document.querySelector(".new-book-modal");
const submitBookButton = document.querySelector(".add-book-button");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pageInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");
const libraryContainer = document.querySelector(".library-container");
const book = [];

// can handle new books by creating an empty array
// each time a book is created by the user add the object to the array
// user adds book > triggers constructor > book is appended into list
// call other function that iterates through each book and adds to dom

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  if (read) {
    this.read = "Read";
  } else {
    this.read = "Unread";
  }
}

function closeModal(e) {
  if (
    e.target.className === "header" ||
    e.target.className === "library-container" ||
    e.target.parentElement === null ||
    e.target.className === "add-book-button"
  ) {
    addBookModal.classList.toggle("show");
    window.removeEventListener("click", closeModal);
  }
}

function openModal() {
  addBookModal.classList.toggle("show");
  window.addEventListener("click", closeModal);
}

function resetInputs() {
  titleInput.value = null;
  authorInput.value = null;
  pageInput.value = null;
  readInput.checked = false;
}

let functionVar = "";
function updateDOM(newBook) {
  functionVar = document.createElement("div");
  functionVar.setAttribute("id", `${newBook.title}`);
  let localVar = "";
  // eslint-disable-next-line no-restricted-syntax
  for (const property in newBook) {
    if (Object.hasOwn(newBook, property)) {
      localVar = document.createElement("span");
      localVar.innerHTML = `${newBook[property]}`;
      functionVar.appendChild(localVar);
    }
  }
  libraryContainer.appendChild(functionVar);
}

function addBook() {
  book.push(
    new Book(
      titleInput.value,
      authorInput.value,
      pageInput.value,
      readInput.checked
    )
  );
  updateDOM(book[book.length - 1]);
  resetInputs();
}

addBookButton.addEventListener("click", openModal);
submitBookButton.addEventListener("click", addBook);
