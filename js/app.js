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
