/* eslint-disable no-restricted-syntax */
/* eslint-disable max-classes-per-file */
class Book {
   constructor(title, author, pages, read) {
      this.title = title.value;
      this.author = author.value;
      this.pages = pages.value;
      this.read = read.checked ? "Read" : "Unread";
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
      console.log(this);
      if (this.getRead === "Read") {
         this.read = "Unread";
      } else {
         this.read = "Read";
      }
      console.log(this);
   };
}

const Library = (() => {
   const library = [];

   const updateLibrary = (newBook) => {
      library.push(newBook);
   };

   const removeLibraryBook = (bookIndex) => {
      library.splice(bookIndex, 1);
   };

   return {
      library,
      updateLibrary,
      removeLibraryBook,
   };
})();

const Dom = (() => {
   const openModalButton = document.querySelector(".add-book");
   const libraryContainer = document.querySelector(".library-container");

   const removeBook = (e) => {
      const targetBook = document.querySelector(`#${e.target.parentNode.id}`);
      libraryContainer.removeChild(targetBook);
      Library.removeLibraryBook(e.target.classList[0]);
   };

   const addRemoveBookbutton = () => {
      const removeBookButton = document.createElement("div");
      removeBookButton.innerHTML = "Remove";
      removeBookButton.setAttribute("id", "remove");
      removeBookButton.addEventListener("click", removeBook);

      return removeBookButton;
   };

   const handleReadStatusClick = (e) => {
      const parentID = e.target.parentNode.id;
      const targetBook = Library.library[e.target.parentNode.classList[0]];
      const readElement = document.querySelector(`#${parentID}>#read`);
      const newClass = readElement.classList[0] === "Read" ? "Unread" : "Read";
      targetBook.changeRead();
      readElement.innerHTML = `${targetBook.read}`;
      readElement.removeAttribute("class");
      readElement.classList.add(newClass);
   };

   const updateDOM = (newBook) => {
      const newBookDiv = document.createElement("div");
      newBookDiv.setAttribute("id", `${newBook.title}-${newBook.author}`);
      newBookDiv.setAttribute("class", `${Library.library.length - 1}`);
      for (const props in newBook) {
         if (Object.prototype.hasOwnProperty.call(newBook, props) && props !== "changeRead") {
            const divSection = document.createElement("div");
            divSection.innerHTML = `${newBook[props]}`;
            divSection.setAttribute("id", `${props}`);
            divSection.setAttribute("class", `${newBook[props]}`);
            if (props === "read") {
               divSection.addEventListener("click", handleReadStatusClick);
            }
            newBookDiv.appendChild(divSection);
         }
      }
      newBookDiv.appendChild(addRemoveBookbutton());
      libraryContainer.appendChild(newBookDiv);
      console.log(libraryContainer);
   };

   return {
      updateDOM,
      openModalButton,
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

   bookAttributes = () => [this.titleInput, this.authorInput, this.pageInput, this.readInput];

   resetInputs = () => {
      const fields = this.bookAttributes();
      for (let i = 0; i < fields.length; i += 1) {
         fields[i].value = null;
      }
   };

   checkAttributes = () => {
      const attributes = this.bookAttributes();
      let retBool = true;
      for (let i = 0; i < attributes.length; i += 1) {
         if (attributes[i].value === "") {
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
      }
   };

   // currently errors out after the first book
   // saying not all fields are complete
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
      this.modal.classList.toggle("show");
      this.addBookButton.addEventListener("click", this.handleAddClick);
      window.addEventListener("click", this.closeModal);
   };
}

function main() {
   const modal = new NewBookModal();
   Dom.openModalButton.addEventListener("click", modal.openModal);
}

main();
