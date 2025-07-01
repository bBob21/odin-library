const library = [];
const submitBtn = document.getElementById("submitBtn");
const formDialog = document.getElementById("dialog");
const showBtn = document.getElementById("showDialog");
const cancelBtn = document.getElementById("cancelBtn")

showBtn.addEventListener("click", () => {
    formDialog.showModal();
});

formDialog.addEventListener("close", () => {
    if (formDialog.returnValue === "submit"){
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const pages = parseInt(document.getElementById("pages").value);
        const read = document.getElementById("read").value === "true";

        addBookToLibrary(author, title, pages, read);
    }
})

cancelBtn.addEventListener("click", () =>{
    formDialog.returnValue = "cancel";
    formDialog.close()
})

function Book(id, title, author, pages, read){
    if (!new.target){
        throw Error("Use the 'new' operator to call this constructor");
    }
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read){
    id = crypto.randomUUID();
    let book = new Book(id, title, author, pages, read);
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

        Object.values(book).forEach(val => {
            let attrElement = document.createElement('td');
            attrElement.textContent = val;
            bookElement.appendChild(attrElement);
        })
        table.appendChild(bookElement);
    }
}

addBookToLibrary("1book","writin",213,false)
addBookToLibrary("bo2ok","auyth",93,true)
displayBooksFromLibrary()