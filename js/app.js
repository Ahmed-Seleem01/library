// Array to store books
const myLibrary = [];

function Book(author = "", title = "", pagesNum = "", read = "not read yet") {
  this.author = author;
  this.title = title;
  this.pagesNum = pagesNum;
  this.read = read;
}

Book.prototype.readStatus = function () {
  if (this.read === "not read yet") {
    this.read = "read";
  } else {
    this.read = "not read yet";
  }
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const submitBtn = document.querySelector("#submitBtn");
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const formElements = document.querySelector("#myForm").elements;
  const book = new Book(
    formElements[0].value,
    formElements[1].value,
    formElements[2].value,
    formElements[3].value
  );
  addBookToLibrary(book);
  // createArrBooks(myLibrary);
  // showBooks(myLibrary);
  console.log(myLibrary);
});

function showBooks(arr) {
  const container = document.querySelector(".container");
  container.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    const bookDiv = document.createElement("div");
    bookDiv.innerText = `Book: ${arr[i].title} 
    Author: ${arr[i].author} 
    Pages: ${arr[i].pagesNum}`;
    bookDiv.setAttribute("data-index", i);
    container.appendChild(bookDiv);
  }
}