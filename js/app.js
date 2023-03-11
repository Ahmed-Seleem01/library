// Array to store books
// Load it from localStorage if it is existed
const lib = localStorage.getItem("myLibraryStorage")
  ? JSON.parse(localStorage.getItem("myLibraryStorage"))
  : [];
const myLibrary = [...lib];

// Add function to display form 
const addBook = document.querySelector("button#add-book");
  addBook.addEventListener("click", (e)=>{
    const myForm = document.querySelector("#myForm")
    myForm.classList.add("show-form")
  })
// Class to create book objects
class Book {
  constructor(title = "", author = "", pagesNum = "", read = "Not read yet") {
    this.author = author;
    this.title = title;
    this.pagesNum = pagesNum;
    this.read = read;
  }

  // Change read status
  readStatus(e) {
    if (this.read === "Not read yet") {
      this.read = "Read";
      e.target.style.backgroundColor = "green";
    } else {
      this.read = "Not read yet";
      e.target.style.backgroundColor = "red";
    }
    return this.read;
  }
}

/*
  Functions to manipulate book objects in the array 
*/
function addBookToLibrary(book) {
  myLibrary.push(book);
}

function createBtn(name) {
  const btn = document.createElement("button");
  btn.textContent = name;
  btn.setAttribute("class", name.toLowerCase());
  return btn;
}

function removeElms(e) {
  const parentElm = e.target.parentElement.parentElement;
  const elmIndex = parentElm.getAttribute("data-index");
  myLibrary.splice(elmIndex, 1);
  localStorage.setItem("myLibraryStorage", JSON.stringify(myLibrary));
  showBooks(myLibrary);
}

// Change read status
function readCondition(e) {
  const parentElm = e.target.parentElement.parentElement;
  const elmIndex = parentElm.getAttribute("data-index");
  e.target.textContent = myLibrary[elmIndex].readStatus(e);
  localStorage.setItem("myLibraryStorage", JSON.stringify(myLibrary));
}

// Function to add buttons to book div
function addButtons() {
  const removeBtn = createBtn("Remove");
  const readBtn = createBtn("Read");
  removeBtn.addEventListener("click", removeElms);
  readBtn.addEventListener("click", readCondition);
  const btnContainer = document.createElement("div");
  btnContainer.appendChild(removeBtn);
  btnContainer.appendChild(readBtn);
  return btnContainer;
}

// Function to show books in divs each time change happen
function showBooks(arr) {
  const arr1 = [...arr];
  const container = document.querySelector(".container");
  container.textContent = "";
  for (let i = 0; i < arr1.length; i++) {
    if (!("readStatus" in arr1[i]) && !(arr1[i] instanceof Book)) {
      arr1[i] = Object.assign(arr1[i], {
        readStatus: Book.prototype.readStatus,
      });
    }
    const bookDiv = document.createElement("div");
    const bookInfo = document.createElement("div");

    bookInfo.innerText = `Title: ${arr[i].title} 
                        Author: ${arr[i].author} 
                        Pages: ${arr[i].pagesNum}`;

    bookDiv.setAttribute("data-index", i);
    const btnContainer = addButtons();
    btnContainer.querySelector(".read").textContent = arr[i].read;
    if (arr[i].read === "Read")
      btnContainer.querySelector(".read").style.backgroundColor = "green";
    else if (arr[i].read === "Not read yet")
      btnContainer.querySelector(".read").style.backgroundColor = "red";
    bookDiv.appendChild(bookInfo);
    bookDiv.appendChild(btnContainer);
    container.appendChild(bookDiv);
  }
}
showBooks(myLibrary);

// Check for the validity by custom validation API
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pagesNum");

function checkValidity(targetElm) {
  const err = document.querySelector(`#${targetElm.id} + span.error`);
 
  if (targetElm.validity.valueMissing) {
    err.textContent = "type something";
  } else if (targetElm.validity.typeMismatch) {
    err.textContent = "type is not match";
  } else {
    err.textContent = "";
  }
}
title.addEventListener("input", checkValidity.bind(null, title));
author.addEventListener("input", checkValidity.bind(null, author));
pages.addEventListener("input", checkValidity.bind(null, pages));

// Add logic to submit the form if it is valid otherwise give an error message
const formElm = document.querySelector("#myForm");
formElm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (title.validity.valid && author.validity.valid && pages.validity.valid) {
    formElm.classList.remove("show-form")
    const formElements = document.querySelector("#myForm").elements;
    const book = new Book(
      formElements[0].value,
      formElements[1].value,
      formElements[2].value,
      formElements[3].value
    );
    formElements[0].value = "";
    formElements[1].value = "";
    formElements[2].value = "";

    addBookToLibrary(book);
    localStorage.setItem('myLibraryStorage', JSON.stringify(myLibrary))
    showBooks(myLibrary);
  } else {
    checkValidity(title);
    checkValidity(author);
    checkValidity(pages);
  }
  
});

// Add cancel functionality to hide the form
const cancel = document.querySelector("#cancel");
cancel.addEventListener("click", ()=>{
  formElm.classList.remove("show-form")
})