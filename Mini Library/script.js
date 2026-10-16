
// Store the books in an array
let books = [
    {
        title: "Wings of Fire",
        author: "A. P. J. Abdul Kalam",
        available: 2,
        borrowed: 0
    },
    {
        title: "The Alchemist",
        author: "Paulo Coelho",
        available: 1,
        borrowed: 0
    },
    {
        title: "Ikigai",
        author: "Hector Garcia",
        available: 4,
        borrowed: 0
    }
];

// Find a book by its title
function findBook(title) {
    for (let book of books) {
        if (book.title.toLowerCase() === title.toLowerCase()) {
            return book;
        }
    }

    return null;
}

// Add a new book or increase existing copies
function addBook(title, author, copies) {
    const existingBook = findBook(title);

    if (existingBook) {
        existingBook.available += copies;
    } else {
        books.push({
            title: title,
            author: author,
            available: copies,
            borrowed: 0
        });
    }

    draw();
}

// Borrow one copy of a book
function borrowBook(title) {
    const book = findBook(title);

    if (book && book.available > 0) {
        book.available--;
        book.borrowed++;
        showMessage("Book borrowed successfully.");
    } else {
        showMessage("No copies are available.");
    }

    draw();
}

// Return one borrowed copy
function returnBook(title) {
    const book = findBook(title);

    if (book && book.borrowed > 0) {
        book.borrowed--;
        book.available++;
        showMessage("Book returned successfully.");
    } else {
        showMessage("No borrowed copy to return.");
    }

    draw();
}

// Display a message on the page
function showMessage(message) {
    document.getElementById("message").textContent = message;
}

// Update the webpage with the current books
function draw() {
    const shelf = document.getElementById("shelf");

    // Clear the previous book cards
    shelf.replaceChildren();

    let totalCopies = 0;

    for (let book of books) {
        totalCopies += book.available + book.borrowed;

        const card = document.createElement("div");
        card.className = "book";

        const heading = document.createElement("h3");
        heading.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = "Author: " + book.author;

        const count = document.createElement("p");
        count.textContent =
            "Available: " + book.available +
            " | Borrowed: " + book.borrowed;

        const borrowButton = document.createElement("button");
        borrowButton.textContent = "Borrow";

        borrowButton.addEventListener("click", function () {
            borrowBook(book.title);
        });

        const returnButton = document.createElement("button");
        returnButton.textContent = "Return";

        returnButton.addEventListener("click", function () {
            returnBook(book.title);
        });

        card.appendChild(heading);
        card.appendChild(author);
        card.appendChild(count);
        card.appendChild(borrowButton);
        card.appendChild(returnButton);

        shelf.appendChild(card);
    }

    document.getElementById("titleCount").textContent = books.length;
    document.getElementById("copyCount").textContent = totalCopies;
}

// Handle the Add Book form
document.getElementById("bookForm").addEventListener(
    "submit",
    function (event) {
        event.preventDefault();

        const title = document.getElementById("title").value.trim();
        const author = document.getElementById("author").value.trim();
        const copies = Number(
            document.getElementById("copies").value
        );

        if (title === "" || author === "") {
            showMessage("Please enter the title and author.");
            return;
        }

        if (!Number.isInteger(copies) || copies < 1) {
            showMessage("Enter a whole number of copies greater than zero.");
            return;
        }

        const existingBook = findBook(title);

        if (
            existingBook &&
            existingBook.author.toLowerCase() !== author.toLowerCase()
        ) {
            showMessage(
                "This title already exists with a different author."
            );
            return;
        }

        addBook(title, author, copies);

        document.getElementById("bookForm").reset();
        document.getElementById("copies").value = 1;

        showMessage("Book added successfully.");
    }
);

// Display the initial books when the page opens
draw();
