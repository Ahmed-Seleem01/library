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

function createBtn(name) {
  const btn = document.createElement("button");
  btn.textContent = name;
  btn.setAttribute("class", name.toLowerCase());
  return btn;
}

function removeElms(e) {
    const parentElm = e.target.parentElement.parentElement;
    const elmIndex = parentElm.getAttribute('data-index');
    myLibrary.splice(elmIndex, 1);
    showBooks(myLibrary);
}

function readCondition(e){
    const parentElm = e.target.parentElement.parentElement;
    const elmIndex = parentElm.getAttribute('data-index');
    myLibrary[elmIndex].readStatus();
}

function addButtons(){
  const removeBtn = createBtn("Remove");
  const readBtn = createBtn("Read");
  removeBtn.addEventListener('click', removeElms);
  readBtn.addEventListener('click', readCondition)
  const btnContainer = document.createElement("div");
  btnContainer.appendChild(removeBtn);
  btnContainer.appendChild(readBtn);
  return btnContainer;
}

function showBooks(arr) {
  const container = document.querySelector(".container");
  container.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    const bookDiv = document.createElement("div");
    bookDiv.innerText = `Book: ${arr[i].title} 
    Author: ${arr[i].author} 
    Pages: ${arr[i].pagesNum}`;
    bookDiv.setAttribute("data-index", i);
    const btnContainer = addButtons();
    bookDiv.appendChild(btnContainer);
    container.appendChild(bookDiv);
  }
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
  showBooks(myLibrary);
  console.log(myLibrary);
});

