const loadBook = async(search, dataLimit) => {
    const url = `http://openlibrary.org/search.json?q=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    displayBook(data.docs, dataLimit);
}

const displayBook = (books,dataLimit) => {
    console.log(books)
    const booksContainer = document.getElementById('books-container');
    booksContainer.innerHTML = '';

    // show all data
    const showAll = document.getElementById('show-all');
    if(dataLimit && books.length > 10){
        books = books.slice(0,10);
        showAll.classList.remove('hidden');
    }
    else{
        showAll.classList.add('hidden');
    }

    // display no book found
    const noBook = document.getElementById('no-book');
    if(books.length === 0){
        noBook.classList.remove('hidden');
    }
    else{
        noBook.classList.add('hidden');
    }
    // stop spinner
    toggleSpinner(false);
    books.forEach(book => {
        const {title, author_name, publish_date, cover_i, author_key} = book;
        const imgUrl = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;

        const bookDiv = document.createElement('div');
        bookDiv.classList.add('card', 'card-compact', 'bg-base-100', 'shadow-xl')
        bookDiv.innerHTML = `
        <figure class="bg-white">
        <img class="mt-2 w-52 h-44" src="${cover_i ? imgUrl : 'https://us.123rf.com/450wm/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016/167492439-no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-comin.jpg?ver=6'}" alt="Shoes" />
        </figure>
        <div class="card-body bg-white text-orange-900">
        <h2 class="card-title">Book Title: ${title ? title.slice(0,10): 'Not available'}</h2>
        <p class="py-1">Author: ${author_name ? author_name[0] : 'Not available'}</p>
        <p class="py-1">Publish Date: ${publish_date ? publish_date[0] : 'Not available'}</p>
        <div class="flex items-end justify-end"><label onclick="loadAuthorDetails('${author_key[0]}')" for="my-modal-4" class="btn modal-button btn-primary">Details</label></div>
        </div>
        `;
        booksContainer.appendChild(bookDiv);
    });
    
}


const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const bookField = document.getElementById('book-field');
    const bookValue = bookField.value;
    loadBook(bookValue,dataLimit);
}

// seach a book
const searchBook = () => {
    //start loading
    processSearch(10);
}

// search by using key press enter
document.getElementById('book-field').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        processSearch(10);
    }
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('hidden');
        document.getElementById('display').style.display = 'none';
    }
    else{
        loaderSection.classList.add('hidden');
        document.getElementById('display').style.display = 'block';
    }
}

document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
    // stop spinner
    toggleSpinner(false);
})

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