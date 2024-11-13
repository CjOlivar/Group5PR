// Function to add a new book
function addBook() {
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const genre = document.getElementById('bookGenre').value;
    const status = document.getElementById('bookStatus').value;

    const newBook = `
        <li>
            <p>Title: ${title}</p>
            <p>Author: ${author}</p>
            <p>Genre: ${genre}</p>
            <p>Status: ${status}</p>
            <button onclick="deleteBook(this)">Delete</button>
            <button onclick="editBook(this)">Edit</button>
        </li>
    `;

    document.getElementById('bookList').insertAdjacentHTML('beforeend', newBook);
}

// Function to delete a book
function deleteBook(button) {
    const bookItem = button.parentElement;
    bookItem.remove();
}

// Function to edit a book (simplified)
function editBook(button) {
    const bookItem = button.parentElement;
    const title = prompt('Edit Title', bookItem.querySelector('p:nth-child(1)').textContent.replace('Title: ', ''));
    const author = prompt('Edit Author', bookItem.querySelector('p:nth-child(2)').textContent.replace('Author: ', ''));
    
    if (title && author) {
        bookItem.querySelector('p:nth-child(1)').textContent = 'Title: ' + title;
        bookItem.querySelector('p:nth-child(2)').textContent = 'Author: ' + author;
    }
}


    // Load books from local storage
    function loadBooks() {
        const storedBooks = localStorage.getItem('books');
        return storedBooks ? JSON.parse(storedBooks) : [];
    }

    // Save books to local storage
    function saveBooks(books) {
        localStorage.setItem('books', JSON.stringify(books));
    }

    // Function to render the book list and stock count
    function renderBookList() {
        const books = loadBooks();
        const bookList = document.getElementById('book-list');
        bookList.innerHTML = ''; // Clear existing content

        books.forEach(book => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${book.image}" alt="Cover" style="width: 50px; height: 75px;"></td>
                <td><input type="text" value="${book.title}" id="title-${book.id}"></td>
                <td><textarea id="description-${book.id}">${book.description}</textarea></td>
                <td><input type="number" value="${book.stock}" id="stock-${book.id}" min="0"></td>
                <td>
                    <button class="update-button" onclick="updateBook(${book.id})">Update</button>
                    <button class="delete-button" onclick="deleteBook(${book.id})">Delete</button>
                </td>
            `;
            bookList.appendChild(row);
        });

        // Update the total stock count
        updateTotalStock();
    }

    // Function to update total stock count
    function updateTotalStock() {
        const books = loadBooks();
        const totalStock = books.reduce((total, book) => total + book.stock, 0);
        document.getElementById('stock-count').textContent = totalStock;
    }

    // Function to update an existing book
    function updateBook(bookId) {
        const updatedTitle = document.getElementById(`title-${bookId}`).value;
        const updatedDescription = document.getElementById(`description-${bookId}`).value;
        const updatedStock = parseInt(document.getElementById(`stock-${bookId}`).value, 10);

        const books = loadBooks();
        const book = books.find(b => b.id === bookId);

        if (book) {
            book.title = updatedTitle;
            book.description = updatedDescription;
            book.stock = updatedStock;
            saveBooks(books); // Save changes to local storage
            renderBookList(); // Re-render the list to show the updated book
        }
    }

    // Function to add a new book
    function addBook() {
        const newTitle = document.getElementById('new-title').value;
        const newDescription = document.getElementById('new-description').value;
        const newImage = document.getElementById('new-image').files[0]; // Get the selected file
        const newStock = parseInt(document.getElementById('new-stock').value, 10);

        if (!newTitle || !newDescription || !newImage || isNaN(newStock) || newStock < 0) {
            alert("Please fill all the fields correctly.");
            return;
        }

        // Create a new FileReader to convert the image to a data URL
        const reader = new FileReader();

        reader.onload = function(e) {
            const newBook = { 
                id: Date.now(), 
                title: newTitle, 
                description: newDescription, 
                image: e.target.result, // Store the image data URL
                stock: newStock 
            };

            const books = loadBooks();
            books.push(newBook); // Add the new book to the books array
            saveBooks(books); // Save to local storage

            renderBookList(); // Re-render the list to include the new book

            // Clear input fields
            document.getElementById('new-title').value = '';
            document.getElementById('new-description').value = '';
            document.getElementById('new-image').value = '';
            document.getElementById('new-stock').value = '';
            document.getElementById('image-preview').style.display = 'none'; // Hide the preview image
        };

        reader.readAsDataURL(newImage); // Read the image as a data URL
    }

    // Function to delete a book
    function deleteBook(bookId) {
        const books = loadBooks();
        const updatedBooks = books.filter(book => book.id !== bookId);
        saveBooks(updatedBooks); // Save changes to local storage
        renderBookList(); // Re-render the list after deletion
    }

    // Render the initial book list when the page loads
    renderBookList();
