window.addEventListener('load', () => {
    // Ensure the available count is hidden on page load
    const countDisplay = document.getElementById('available-count');
    countDisplay.style.display = 'none';

    // Retrieve the profile picture from localStorage
    const savedProfilePic = localStorage.getItem('profilePicture');
    const mainProfilePic = document.getElementById('mainProfilePic'); // Profile picture on the main page
    const dropdownProfilePic = document.getElementById('dropdownProfilePic'); // Profile picture in the dropdown
    const dropdownName = document.getElementById('dropdownName'); // Profile name in the dropdown

    // Check if profile picture is saved
    if (savedProfilePic) {
        mainProfilePic.src = savedProfilePic;
        dropdownProfilePic.src = savedProfilePic;
    }

    // Check if profile name is saved
    const savedName = localStorage.getItem('profileName');
    if (savedName) {
        dropdownName.textContent = savedName;
    }
});

function scrollBooks(direction) {
    const container = document.querySelector('.book-container');
    const scrollAmount = 300; // Adjust as needed
    container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

function filterBooks(genre) {
    const allBooks = document.querySelectorAll('.book-item');
    let availableCount = 0;
    let trendingCount = 0;
    let mostCount = 0;

    allBooks.forEach(book => {
        const isInGenre = book.classList.contains(genre) || genre === 'all';
        const isAvailable = book.querySelector('.book-status').textContent === 'Available';
        const isTrending = book.classList.contains('trending');
        const isMost = book.classList.contains('most');

        if (genre === 'all') {
            book.style.display = 'flex';
        } else {
            if (isInGenre && isAvailable) {
                book.style.display = 'flex';
                availableCount++;
            } else {
                book.style.display = 'none';
            }
        }

        // Count for genre-based buttons
        if (isTrending && isAvailable) {
            trendingCount++;
        }
        if (isMost && isAvailable) {
            mostCount++;
        }
    });

    // Update the available books count for each genre button
    if (genre !== 'all') {
        if (genre === 'trending') {
            document.getElementById('trending-count').textContent = `(${trendingCount})`;
        } else if (genre === 'most') {
            document.getElementById('most-count').textContent = `(${mostCount})`;
        }
    }

    // Update the available books count display for the specific genre
    const countDisplay = document.getElementById('available-count');
    if (genre === 'all') {
        countDisplay.style.display = 'none';
    } else {
        countDisplay.style.display = 'block';
        countDisplay.textContent = `Available Books: ${availableCount}`;
    }
}

    // Show available books count only for specific genres
    const countDisplay = document.getElementById('available-count');
    if (genre === 'all') {
        // Hide the available count when 'All' is selected
        countDisplay.style.display = 'none';
    } else {
        // Show the available count for specific genres
        countDisplay.style.display = 'block';
        countDisplay.textContent = `Available Books: ${availableCount}`;
    }

function search_books() {
    let input = document.getElementById('searchbar').value.toLowerCase();
    let items = document.getElementsByClassName('book-item');

    for (let i = 0; i < items.length; i++) {
        let title = items[i].getElementsByClassName('book-title')[0].textContent.toLowerCase();
        
        if (!title.includes(input)) {
            items[i].style.display = "none";
        } else {
            items[i].style.display = "flex";
        }
    }
}

function logout() {
    alert('Logging out...');
    window.location.href = 'loginpage.html'; // Redirect to login page
}

        // Load books from local storage
        function loadBooks() {
            const storedBooks = localStorage.getItem('books');
            return storedBooks ? JSON.parse(storedBooks) : [];
        }

        // Function to render the list of books
        function renderBookList() {
            const books = loadBooks();
            const bookList = document.getElementById('book-list');
            bookList.innerHTML = ''; // Clear existing content

            if (books.length === 0) {
                bookList.innerHTML = "<p>No books available.</p>";
                return;
            }

            books.forEach(book => {
                const bookItem = document.createElement('div');
                bookItem.classList.add('book-item');
                bookItem.innerHTML = `
                    <div class="book-cover">
                        <img src="${book.image}" alt="${book.title}" style="width: 100px; height: 150px;">
                    </div>
                    <div class="book-info">
                        <h3>${book.title}</h3>
                        <p>${book.description}</p>
                        <p><strong>Stock: </strong>${book.stock}</p>
                    </div>
                `;
                bookList.appendChild(bookItem);
            });
        }

        // Call the renderBookList function when the page loads
        window.onload = function() {
            renderBookList();
        };