// Array to store books
const myLibrary = [];

// Class function to create book objects
class Book {
  constructor(title = "", author = "", pagesNum = "", read = "Not read yet") {
    this.author = author;
    this.title = title;
    this.pagesNum = pagesNum;
    this.read = read;
  }

  // Change read status
  readStatus(e) {
    // console.log(this)
    if (this.read === "Not read yet") {
      this.read = "Read";
      e.target.style.backgroundColor = 'green';
    } else {
      this.read = "Not read yet";
      e.target.style.backgroundColor = 'red';
    }
    return this.read;
  }
}

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
  showBooks(myLibrary);
}

// Change read status
function readCondition(e) {
  const parentElm = e.target.parentElement.parentElement;
  const elmIndex = parentElm.getAttribute("data-index");
  e.target.textContent = myLibrary[elmIndex].readStatus(e);
  
}

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

function showBooks(arr) {
  const container = document.querySelector(".container");
  container.textContent = "";
  for (let i = 0; i < arr.length; i++) {
    const bookDiv = document.createElement("div");
    bookDiv.innerText = `Title: ${arr[i].title} 
                        Author: ${arr[i].author} 
                        Pages: ${arr[i].pagesNum}`;
    bookDiv.setAttribute("data-index", i);
    const btnContainer = addButtons();
    btnContainer.querySelector(".read").textContent = arr[i].read;
    bookDiv.appendChild(btnContainer);
    container.appendChild(bookDiv);
  }
}

// Check for the validity by custom validation API
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pagesNum");

function checkValidity(targetElm) {
  const err = document.querySelector(`#${targetElm.id} + span.error`);
  // console.log(targetElm)
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

const formElm = document.querySelector("#myForm");
formElm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (title.validity.valid && author.validity.valid && pages.validity.valid) {
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

    // console.log(formElements[3].value);
    addBookToLibrary(book);
    showBooks(myLibrary);
  } else {
    checkValidity(title);
    checkValidity(author);
    checkValidity(pages);
  }

  // console.log(myLibrary);
});
