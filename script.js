/* eslint-disable no-restricted-syntax */
/* eslint-disable max-classes-per-file */
const addBookButton = document.querySelector(".add-book");
const addBookModal = document.querySelector(".new-book-modal");
const submitBookButton = document.querySelector(".add-book-button");
const titleInput = document.querySelector("#title");
const euthorInput = document.querySelector("#author");
const pageInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");
const libraryContainer = document.querySelector(".library-container");
const formInputs = document.querySelectorAll("input");
const book = [];
let targetBook = "";
let readSpan = "";
let currentBook = "";

class Book {
   constructor(title, author, pages, read) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.setRead(read);
   }

   get getRead() {
      return this.read;
   }

   /**
    * @param {(arg0: any) => void} read
    */
   set setRead(read) {
      this.read = read ? "Read" : "Unread";
   }

   changeRead = () => {
      if (this.getRead() === "Read") {
         this.read = "Unread";
      } else {
         this.read = "Read";
      }
   };
}

/* dom shelf can be a module that holds books and loops through each
 * this will connect the books to the dom
 * each row will have the same buttons
 */

const Library = (() => {
   const library = [];

   // method to remove a book from the library

   return {
      library,
   };
})();

class NewBookModal {
   constructor() {
      // can use getters and setters to prevent submit without adding and removing classes from each field
      this.modal = document.querySelector(".new-book-modal");
      this.titleInput = document.querySelector("#title");
      this.authorInput = document.querySelector("#author");
      this.pageInput = document.querySelector("#page");
      this.readInput = document.querySelector("#read");
      this.addBookButton = document.querySelector(".add-book-button");
   }

   resetInputs() {
      for (const key in this) {
         if (Object.prototype.hasOwnProperty.call(this, key)) {
            this.key.value = null;
         }
      }
   }

   closeModal = (e) => {
      const { target } = e;
      if (target.class === "header" || target.class === "library-container" || target.parentElement === null || target.className === "add-book-button") {
         this.modal.classList.toggle("show");
         window.removeEventListener("click", this.closeModal);
         this.resetInputs();
      } else if (target.classList[1] === "Invalid") {
         /* invalid class was used to stop a partially filled book
          * I don't think we can use getters and setters to validate
          * we can essentially have two functions:
          * one that checks for all the values in the form to be filled
          * an other that send the values of the form to library and then updates the dom
          */
      }
   };

   openModal = () => {
      console.log(this.classList);
      this.modal.classList.toggle("show");
      window.addEventListener("click", this.closeModal);
   };

   bookAttributes = () => [this.titleInput, this.authorInput, this.pageInput, this.readInput];

   checkAttributes = () => {
      const attributes = this.bookAttributes();
      let retBool = true;

      for (let i = 0; i < attributes.length; i += 1) {
         if (attributes[i].value === null) {
            retBool = false;
         }
      }
      return retBool;
   };
}

// once the above method can handle partially filled books then this can be deleted
// function resetInputs() {
//    titleInput.value = null;
//    authorInput.value = null;
//    pageInput.value = null;
//    readInput.checked = false;
//    submitBookButton.classList.remove("invalid");
//    formInputs.forEach((input) => {
//       input.classList.remove("invalid");
//    });
// }

function closeModal(e) {
   if (e.target.className === "header" || e.target.className === "library-container" || e.target.parentElement === null || e.target.className === "add-book-button") {
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
   Library.library.push(new Book({}));
   currentBook = book[book.length - 1];
   if (currentBook.title === "" || currentBook.author === "" || currentBook.pages === "") {
      submitBookButton.classList.add("invalid");
   } else {
      updateDOM(currentBook);
   }
}

const modal = new NewBookModal();
addBookButton.addEventListener("click", modal.openModal);
submitBookButton.addEventListener("click", addBook);
console.log(modal.bookAttributes());
