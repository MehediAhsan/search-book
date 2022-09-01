const loadBook = async(search) => {
    const url = `http://openlibrary.org/search.json?q=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    displayBook(data.docs);
}

const displayBook = (books) => {
    console.log(books)
    const booksContainer = document.getElementById('books-container');
    booksContainer.innerHTML = '';
    books.forEach(book => {
        const {title, author_name, publish_date, cover_i, author_key} = book;

        const bookDiv = document.createElement('div');
        bookDiv.classList.add('card', 'card-compact', 'bg-base-100', 'shadow-xl')
        bookDiv.innerHTML = `
        <figure class="bg-white"><img class="mt-2" src="https://covers.openlibrary.org/b/id/${cover_i}-M.jpg" alt="Shoes" /></figure>
        <div class="card-body bg-white text-orange-900">
        <h2 class="card-title">Book Title: ${title}</h2>
        <p class="py-1">Author: ${author_name[0]}</p>
        <p class="py-1">Publish Date: ${publish_date[0]}</p>
        <div class="flex items-end justify-end"><label onclick="loadAuthorDetails('${author_key[0]}')" for="my-modal-4" class="btn modal-button btn-primary">Details</label></div>
        </div>
        `;
        booksContainer.appendChild(bookDiv);
    });
}

// seach a book
const searchBook = () => {
    const bookField = document.getElementById('book-field');
    const bookValue = bookField.value;
    loadBook(bookValue);
} 

// author details
const loadAuthorDetails = async id => {
    const url = `https://openlibrary.org/authors/${id}.json`;
    const res = await fetch(url);
    const data = await res.json();
    displayAuthorDetails(data);
}

const displayAuthorDetails = author => {
    console.log(author);
    const {name, birth_date, bio} = author;
    const authorDetails = document.getElementById('author-details');
    authorDetails.innerHTML = `
    <h3 class="text-lg font-bold text-primary">Author Name: ${name}</h3>
    <p class="py-1">Birth Date: ${birth_date ? birth_date : 'No availble'}</p>
    <p class="py-1">Bio: ${bio ? bio : 'No available'}</p> 
    `
}


loadBook('Joanne Rowling');