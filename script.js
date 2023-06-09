const addBookButton = document.querySelector(".add-book");
const addBookModal = document.querySelector(".new-book-modal");
const submitBookButton = document.querySelector(".add-book-button");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pageInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");
const libraryContainer = document.querySelector(".library-container");
const formInputs = document.querySelectorAll("input");
const book = [];
let targetBook = "";
let readSpan = "";
let currentBook = "";

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

function resetInputs() {
  titleInput.value = null;
  authorInput.value = null;
  pageInput.value = null;
  readInput.checked = false;
  submitBookButton.classList.remove("invalid");
  formInputs.forEach((input) => {
    input.classList.remove("invalid");
  });
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
    resetInputs();
  } else if (e.target.classList[1] === "invalid") {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(currentBook)) {
      if (value === "") {
        // eslint-disable-next-line prefer-const
        let wrongInputLocation = document.querySelector(`input#${key}`);
        wrongInputLocation.classList.add("invalid");
      }
    }
    book.pop();
    submitBookButton.classList.remove("invalid");
  }
}

function openModal() {
  addBookModal.classList.toggle("show");
  window.addEventListener("click", closeModal);
}

function removeBook(e) {
  targetBook = document.querySelector(`div.book#${e.target.parentNode.id}`);
  libraryContainer.removeChild(targetBook);
}

function changeReadStatus(e) {
  readSpan = document.querySelector(`#${e.target.id}.${e.target.classList[0]}`);
  if (readSpan.classList[0] === "Unread") {
    readSpan.classList.remove("Unread");
    readSpan.classList.add("Read");
    readSpan.innerHTML = "Read";
  } else {
    readSpan.classList.remove("Read");
    readSpan.classList.add("Unread");
    readSpan.innerHTML = "Unread";
  }
}

let functionVar = "";
let newBookVar = "";
function updateDOM(newBook) {
  functionVar = document.createElement("div");
  functionVar.setAttribute("id", `${newBook.title}`);
  functionVar.setAttribute("class", "book");
  newBookVar = "";
  // eslint-disable-next-line no-restricted-syntax
  for (const property in newBook) {
    if (Object.hasOwn(newBook, property)) {
      newBookVar = document.createElement("div");
      newBookVar.innerHTML = `${newBook[property]}`;
      newBookVar.setAttribute("id", `${newBook.title}`);
      newBookVar.setAttribute("class", `${newBook[property]}`);
      functionVar.appendChild(newBookVar);
    }
  }
  newBookVar = document.createElement("div");
  newBookVar.innerHTML = "Remove";
  newBookVar.setAttribute("id", "remove");
  newBookVar.addEventListener("click", removeBook);
  functionVar.appendChild(newBookVar);
  libraryContainer.appendChild(functionVar);

  readSpan = document.querySelector(`#${newBook.title}.${newBook.read}`);
  readSpan.addEventListener("click", changeReadStatus);
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
  currentBook = book[book.length - 1];
  if (
    currentBook.title === "" ||
    currentBook.author === "" ||
    currentBook.pages === ""
  ) {
    submitBookButton.classList.add("invalid");
  } else {
    updateDOM(currentBook);
  }
}

addBookButton.addEventListener("click", openModal);
submitBookButton.addEventListener("click", addBook);
