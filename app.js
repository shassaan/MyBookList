class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

    
}


class UI{
    static diplayBooksOnUI(){
        const allBooks = JSON.parse(window.localStorage.getItem('books'));

        const books = allBooks;
        let list = document.querySelector('#book-list');
        list.innerHTML = `<tr>
            <th>Title</th>
            <th>Author</th>
            <th>Isbn</th>
            <th>Action</th>
        </tr>`;
        
       if(books !== null){
            books.forEach((book)=>{
                let row = document.createElement('tr');
                row.innerHTML = `
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a href="#" class="btn btn-danger delete">X</a></td>
                `;
                list.appendChild(row);
            })
        }
    }
    static addBook(book) {
        let list = document.querySelector('#book-list');
        let row = document.createElement("tr");
        row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td><a href="#" class="btn btn-danger delete">X</a></td>
            `;
            list.appendChild(row);

            let books = JSON.parse(window.localStorage.getItem("books"));
            if(books === null){
                books = [];
            }

            books.push(book);
            window.localStorage.setItem("books",JSON.stringify(books));

    }

    static showAlert(message,className){
        let div = document.createElement('div');

        div.className = `alert alert-${className}`;

        let container = document.querySelector(".container");
        let form = document.querySelector('form');

        div.textContent = message;


        container.insertBefore(div,form);

        setTimeout(()=>{
            document.querySelector(".alert").remove();;
        },1000);
    }
    
    
    static removeBook(el){

        if(el.classList.contains("delete")){

            el.parentElement.parentElement.remove();
        }
    }

    static removeFromStore(isbn){
        let books  = JSON.parse(window.localStorage.getItem('books'));

        books.forEach((value,index) => {
            if(value.isbn === isbn){
                books.splice(index,1);
                UI.showAlert("A Book Deleted","success");
                UI.clearFields();
            }
        });

        window.localStorage.setItem("books",JSON.stringify(books));
       
    }


    static clearFields() {

        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}






document.addEventListener('DOMContentLoaded' ,UI.diplayBooksOnUI())


document.addEventListener('submit',(e)=>{
    e.preventDefault();



    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let isbn = document.querySelector('#isbn').value;
    

    if(title === '' || author === '' || (isbn === '' && Number.isSafeInteger(isbn))){
        UI.showAlert("Please Provide all Data","danger");
    }else{
        let book =  new Book(title,author,isbn);
    UI.addBook(book);
    UI.showAlert("A Book Added","success");
    UI.clearFields();
    }
});


document.querySelector('#book-list').addEventListener('click',(e) => {
    console.log(e.target);
    UI.removeBook(e.target);
    UI.removeFromStore(e.target.parentElement.previousElementSibling.textContent);
   
})