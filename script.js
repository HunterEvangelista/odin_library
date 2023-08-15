/* eslint-disable no-restricted-syntax */
/* eslint-disable max-classes-per-file */
const addBookButton = document.querySelector(".add-book");
const addBookModal = document.querySelector(".new-book-modal");
const submitBookButton = document.querySelector(".add-book-button");
// const libraryContainer = document.querySelector(".library-container");
const book = [];
// let targetBook = "";
let readSpan = "";
let currentBook = "";

class Book {
   constructor(title, author, pages, read) {
      this.title = title.value;
      this.author = author.value;
      this.pages = pages.value;
      this.setRead(read);
   }

   get getRead() {
      return this.read;
   }

   /**
    * @param {(arg0: any) => void} read
    */
   set setRead(read) {
      this.read = read.value ? "Read" : "Unread";
   }

   changeRead = () => {
      if (this.getRead() === "Read") {
         this.read = "Unread";
      } else {
         this.read = "Read";
      }
   };
}

const Library = (() => {
   const library = [];

   const updateLibrary = (newBook) => {
      library.push(newBook);
   };

   const removeLibraryBook = (bookIndex) => {
      // stuff here
      // change the id of each div to its index in the library
      // change this to removeBook from library
      // add remove book from dom to the Dom module
      library.splice(bookIndex, 1);
   };

   return {
      library,
      updateLibrary,
      removeLibraryBook,
   };
})();

const Dom = (() => {
   const openModalButton = document.querySelector("add-book");
   const libraryContainer = document.querySelector(".library-container");

   const removeBook = (e) => {
      const targetBook = document.querySelector(`div#${e.target.id}`);
      libraryContainer.removeChild(targetBook);
      Library.removeLibraryBook(e.target.id);
   };

   const addRemoveBookbutton = () => {
      const removeBookButton = document.createElement("div");
      removeBookButton.innerHTML = "Remove";
      removeBookButton.setAttribute("id", "remove");
      removeBookButton.addEventListener("click", removeBook);

      return removeBookButton;
   };

   const handleReadStatusClick = (e) => {
      const { target } = e.target;
      const targetBook = Library.library[target.id];
      const readElement = document.querySelector(`#${target.parentNode.id}`);
      targetBook.changeRead();
      readElement.innerHTML = `${targetBook.read}`;
   };

   const updateDOM = (newBook) => {
      const newBookDiv = document.createElement("div");
      newBookDiv.setAttribute("id", `${Library.library.length() - 1}`);
      newBookDiv.setAttribute("class", "book");
      for (const key in Object.keys(newBook)) {
         if (Object.prototype.hasOwnProperty.call(newBook, key)) {
            const divSection = document.createElement("div");
            divSection.innerHTML = `${newBook.key}`;
            divSection.setAttribute("id", `${key}`);
            divSection.setAttiribute("class", `${newBook.key}`);
            if (key === "read") {
               divSection.addEventListener("click", handleReadStatusClick);
            }
            newBookDiv.appendChild(divSection);
         }
      }
      newBookDiv.appendChild(addRemoveBookbutton);
   };

   return {
      updateDOM,
   };
})();

class NewBookModal {
   constructor() {
      this.modal = document.querySelector(".new-book-modal");
      this.titleInput = document.querySelector("#title");
      this.authorInput = document.querySelector("#author");
      this.pageInput = document.querySelector("#pages");
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

   closeModal = (e) => {
      const { target } = e;
      if (target.class === "header" || target.class === "library-container" || target.parentElement === null || target.className === "add-book-button") {
         this.modal.classList.toggle("show");
         window.removeEventListener("click", this.closeModal);
         this.resetInputs();
      }
   };

   handleAddClick = (e) => {
      if (this.checkAttributes()) {
         const newBook = new Book(...this.bookAttributes());
         Library.updateLibrary(newBook);
         Dom.updateDOM(newBook);
         this.resetInputs();
         this.closeModal(e);
      } else {
         // could create a custom alert here
         alert("Not all fields are completed.");
      }
   };

   openModal = () => {
      console.log(this.classList);
      this.modal.classList.toggle("show");
      window.addEventListener("click", this.closeModal);
   };
}

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
   // Library.library.push(new Book(...));
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
console.log(Library.library);
