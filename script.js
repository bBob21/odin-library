const library = [];
const abFormDialog = document.getElementById("addBookDialog");
const abShowBtn = document.getElementById("showAddBookDialog");
const abCancelBtn = document.getElementById("abCancelBtn")

abShowBtn.addEventListener("click", () => {
    abFormDialog.showModal();
});

abFormDialog.addEventListener("close", () => {
    if (abFormDialog.returnValue === "submit"){
        const title = document.getElementById("abTitle").value;
        const author = document.getElementById("abAuthor").value;
        const pages = parseInt(document.getElementById("abPages").value);

        addBookToLibrary(author, title, pages, read);
    }
})

abCancelBtn.addEventListener("click", () =>{
    abFormDialog.returnValue = "cancel";
    abFormDialog.close()
})

function Book(id, title, author, pages){
    if (!new.target){
        throw Error("Use the 'new' operator to call this constructor");
    }
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
}

Book.prototype.toggleRead = function () {
    this.read = !this.read
}

function addBookToLibrary(title, author, pages){
    id = crypto.randomUUID();
    let book = new Book(id, title, author, pages);
    library.push(book);
    displayBooksFromLibrary();
}

function displayBooksFromLibrary(){
    const table = document.getElementById("tableBody");
    table.innerHTML = "";
    for (let book of library){
        let bookElement = document.createElement('tr')
        bookElement.classList.add('bookRow')
        bookElement.id = book.id

        // loop through attributes of Book
        Object.values(book).forEach(val => {
            let attrElement = document.createElement('td');
            attrElement.textContent = val;
            bookElement.appendChild(attrElement);
        })
        let btnContainer = document.createElement('td');
        btnContainer.classList.add("btnContainer");
        let editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add("editBtn");
        editBtn.addEventListener("click", () => {
            editBookDialog(book);
        })
        let readBtn = document.createElement('button');
        readBtn.classList.add("readBtn");
        readBtn.textContent = "Toggle Read";
        readBtn.addEventListener("click", () => {
            book.toggleRead();
            displayBooksFromLibrary();
        })

        btnContainer.appendChild(readBtn);
        btnContainer.appendChild(editBtn);
        bookElement.appendChild(btnContainer);

        table.appendChild(bookElement);
    }
}

function editBookDialog(book){
    const id = document.getElementById("ebID");
    const title = document.getElementById("ebTitle");
    const author = document.getElementById("ebAuthor");
    const pages = document.getElementById("ebPages");
    id.value = book.id;
    title.value = book.title;
    author.value = book.author;
    pages.value = book.pages;

    const ebFormDialog = document.getElementById("editBookDialog");
    const ebCancelBtn = document.getElementById("ebCancelBtn");
    const ebDeleteBtn = document.getElementById("ebDeleteBtn");
    ebFormDialog.showModal();
    ebFormDialog.addEventListener("close", () => {
        if (ebFormDialog.returnValue === "delete"){
            deleteBook(id.value);
        }
        else if (ebFormDialog.returnValue === "edit"){
            editBook(id.value, title.value, author.value, pages.value);
        }
        displayBooksFromLibrary();
    })
    
    ebCancelBtn.addEventListener("click", () => {
        ebFormDialog.returnValue = "cancel";
        ebFormDialog.close();
    })
    ebDeleteBtn.addEventListener("click", () => {
        ebFormDialog.returnValue = "delete";
        ebFormDialog.close();
    })
}

function deleteBook(id){
    for (let i = 0; i < library.length; i++){
        if (id === library[i].id){
            library.splice(i,1);
        }
    }
}

function editBook(id, title, author, pages){
    for (let book of library){
        if (book.id === id){
            book.title = title;
            book.author = author;
            book.pages = pages;
        } 
    }
}

addBookToLibrary("1984","George Orwell",328,true)
addBookToLibrary("To Kill a Mockingbird","Harper Lee",384,false)
addBookToLibrary("Heart of Darkness","Joseph Conrad",120,true)
displayBooksFromLibrary()