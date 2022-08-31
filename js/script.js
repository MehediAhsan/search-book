const loadBook = async(search) => {
    const url = `http://openlibrary.org/search.json?q=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    displayBook(data.docs);
}

const displayBook = (books) => {
    const booksContainer = document.getElementById('books-container');
    books.forEach(book => {
        const {title, author_name, publish_date, cover_i} = book;
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('card', 'card-compact', 'bg-base-100', 'shadow-xl')
        bookDiv.innerHTML = `
        <figure class="bg-white"><img class="mt-2" src="https://covers.openlibrary.org/b/id/${cover_i}-M.jpg" alt="Shoes" /></figure>
        <div class="card-body bg-white text-orange-900">
        <h2 class="card-title">Book Title: ${title}</h2>
        <p class="py-1">Author: ${author_name[0]}</p>
        <p class="py-1">Publish Date: ${publish_date[0]}</p>
        </div>
        `;
        booksContainer.appendChild(bookDiv);
    });
}



const searchBook = () => {
    const bookField = document.getElementById('book-field');
    const bookValue = bookField.value;
    loadBook(bookValue);
} 