console.log("This is a Sky Library javascript ");



class Book {
    constructor(bookname, bookauthor, booktype) {
        this.name = bookname;
        this.author = bookauthor;
        this.type = booktype;


    }

    insertlocalstorage(book) {
        let bookObj;

        let bookstore = localStorage.getItem("bookstore");
        if (bookstore == null) {
            bookObj = [];
        }
        else {
            bookObj = JSON.parse(bookstore);
        } 
        bookObj.push(book);
        localStorage.setItem("bookstore", JSON.stringify(bookObj));

        

    }

}

class Display {
    add() {


        let bookObj;

        let bookstore = localStorage.getItem("bookstore");
        if (bookstore == null) {
            bookObj = [];
        }
        else {
            bookObj = JSON.parse(bookstore);
        }


        let html = "";

        bookObj.forEach(function (book,index) {
            html += `<tr>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.type}</td>
            <td><button  id="${index}" onclick="display.deleteBook(this.id)" class="btn btn-success my-2 my-sm-0" type="submit">Delete</button></td>

        </tr>`;



        });

        let tableBody = document.getElementById('tableBody');

        if (bookObj.length != 0) {
            tableBody.innerHTML = html;
        }
        else {
            tableBody.innerHTML = `<h2><b>There is no book in the library</b></h2>`;
        }
    }

    clear() {

        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();

    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        }
        else {
            return true;
        }
    }


    deleteBook(index){
        
        let bookObj;

        let bookstore = localStorage.getItem("bookstore");
        if (bookstore == null) {
            bookObj = [];
        }
        else {
            bookObj = JSON.parse(bookstore);
        }
        bookObj.splice(index,1);
        localStorage.setItem("bookstore",JSON.stringify(bookObj));
        display.add();

    }

    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if (type === 'success') {
            boldText = 'Success';
        }
        else {
            boldText = 'Error!';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;

        setTimeout(function () {
            message.innerHTML = ''
        }, 5000);
    }
}


// Add Submit event listner to the libraryform

let libraryform = document.getElementById('libraryForm');

let display = new Display();
display.add();


libraryform.addEventListener("submit", function (e) {
    e.preventDefault();

    let bookname = document.getElementById('bookName').value;
    let bookauthor = document.getElementById('author').value;

    let booktype;

    let fiction = document.getElementById('fiction');
    let computer = document.getElementById('programming');
    let philosophy = document.getElementById('philosophy');

    if (fiction.checked) {
        booktype = fiction.value;
    }


    if (computer.checked) {
        booktype = computer.value;
    }


    if (philosophy.checked) {
        booktype = philosophy.value;
    }

    let book = new Book(bookname, bookauthor, booktype);


   



    if (display.validate(book)) {

        let bookitemlocalstorage = new Book();
        bookitemlocalstorage.insertlocalstorage(book);

        display.add();
        display.clear();
        display.show('success', 'your book been successfully added')
    }

    else {

        display.show('danger', 'sorry you cannot add this book');
    }

    e.preventDefault();


});



// Code written by Harry BHai
/*
console.log('This is ES6 version of Project 2');
class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display {
    add(book) {
        console.log("Adding to UI");
        let tableBody = document.getElementById('tableBody');
        let uiString = `<tr>
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.type}</td>
                        </tr>`;
        tableBody.innerHTML += uiString;
    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false
        }
        else {
            return true;
        }
    }

    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if(type==='success'){
            boldText = 'Success';
        }
        else{
            boldText = 'Error!';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 5000);
    
    }
}

// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('YOu have submitted library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    console.log(book);

    let display = new Display();

    if (display.validate(book)) {

        display.add(book);
        display.clear();
        display.show('success', 'Your book has been successfully added')
    }
    else {
        // Show error to the user
        display.show('danger', 'Sorry you cannot add this book');
    }

    e.preventDefault();
}

*/