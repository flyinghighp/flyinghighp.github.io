// Object Demo (Books)
// Priyansh Jhanji
// 12th March 2025

// 1.Add two more book objects (each in a var)
//   and add to the shelf... (connected to my)
//   book.

// 2. Use a loop and an array to generate 20+ 
//    skinny books
//    (can be all named the same if needed)

let myBook;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //Make 20 books in a row
  let x = 50;
  let covers = ["softcoover", "hardcover", "leatherbound"];


  for (let i = 0; i < 20; i++) {
    let choice = int(random(3));
    bookshelf.push(new Book("A", "Mr.Booth",
      11111111111, covers[choice], 200, x));
      x +=20;
  }
  myBook = new Book("CS30 Text", "Mr Scott",
    1234567891011, "leatherbound",
    515, height / 2, width * 0.3, 150);

  myBook.printOut();
}

function draw() {
  background(220); // clears the screen each frame
  myBook.display();
}

// Nice to organize class at the bottom...
class Book {
  //1. constructor
  constructor(title, author, isbn, cover, pages, y, x, bookheight) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.cover = cover;
    this.pages = pages;
    this.y = y;
    this.x = x;
    this.bookheight = bookheight;
  }

  //2. class methods
  display() {
    //render our book object on the canvas
    rectMode(CENTER); textAlign(CENTER);
    textSize(20);

    switch (this.cover) {
      case "softcover":
        fill(250, 200, 150); break;
      case "hardcover":
        fill(120, 255, 255); break;
      case "leatherbound":
        fill(150, 100, 15); break;
    }

    rect(this.x, this.y, this.pages / 10, 150, this.bookheight);
    fill(255);
    text(this.title[0], this.x, this.y - 50);
  }
  printOut() {
    //print out the data in a nice format
    print(this.title + ",by" + this.author);
    print("Length" + this.pages);
    print("ISBN:" + this.isbn);

  }


}