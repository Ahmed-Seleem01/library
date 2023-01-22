// Array to store books 
let myLibrary = [];

function Book(author='', title='', pagesNum='', read='not read yet') {
  this.author = author;
  this.title = title;
  this.pagesNum = pagesNum;
  this.read = read;
}