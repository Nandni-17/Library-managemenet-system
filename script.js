/*
  Library Management System - JavaScript version
  This is the website version of the Java program (LibraryManagementSystem.java).

  Java            ->  JavaScript
  ------------------------------------------
  Book class      ->  object { id, name, author, issued }
  Book[] books    ->  books array
  addBook()       ->  addBook()
  viewBooks()     ->  render()
  searchBook()    ->  searchBook()
  issueBook()     ->  issueBook()
  returnBook()    ->  returnBook()
  (new feature)   ->  deleteBook()
*/

// Array that stores all the books (like Book[] books in Java)
const books = [];

// Holds the searched ID. null means "show all books"
let filterId = null;

const msg = document.getElementById('message');

// Show a success (green) or error (red) message for 3 seconds
function showMessage(text, ok = true) {
  msg.textContent = text;
  msg.className = ok ? 'ok' : 'err';
  setTimeout(() => { msg.className = ''; }, 3000);
}

// Add a new book
function addBook() {
  const id = parseInt(document.getElementById('bookId').value);
  const name = document.getElementById('bookName').value.trim();
  const author = document.getElementById('bookAuthor').value.trim();

  // Validation: all fields are required
  if (isNaN(id) || !name || !author) {
    showMessage('Please fill in all fields.', false);
    return;
  }

  // Validation: Book ID must be unique
  if (books.some(b => b.id === id)) {
    showMessage('A book with this ID already exists.', false);
    return;
  }

  books.push({ id: id, name: name, author: author, issued: false });

  // Clear the input boxes
  document.getElementById('bookId').value = '';
  document.getElementById('bookName').value = '';
  document.getElementById('bookAuthor').value = '';

  showMessage('Book added successfully!');
  render();
}

// Search for a book by ID
function searchBook() {
  const id = parseInt(document.getElementById('searchId').value);

  if (isNaN(id)) {
    showMessage('Enter a valid Book ID to search.', false);
    return;
  }

  filterId = id;
  render();

  if (!books.some(b => b.id === id)) {
    showMessage('Book not found.', false);
  }
}

// Remove the search filter and show all books again
function clearSearch() {
  filterId = null;
  document.getElementById('searchId').value = '';
  render();
}

// Issue a book
function issueBook(id) {
  const book = books.find(b => b.id === id);

  if (book.issued) {
    showMessage('Book is already issued.', false);
    return;
  }

  book.issued = true;
  showMessage('Book issued successfully!');
  render();
}

// Return a book
function returnBook(id) {
  const book = books.find(b => b.id === id);

  if (!book.issued) {
    showMessage('Book was not issued.', false);
    return;
  }

  book.issued = false;
  showMessage('Book returned successfully!');
  render();
}

// Delete a book (an issued book must be returned first)
function deleteBook(id) {
  const index = books.findIndex(b => b.id === id);

  if (index === -1) {
    showMessage('Book not found.', false);
    return;
  }

  if (books[index].issued) {
    showMessage('Return the book before deleting it.', false);
    return;
  }

  books.splice(index, 1);
  showMessage('Book deleted successfully!');
  render();
}

// Display all books in the table (like viewBooks() in Java)
function render() {
  const list = document.getElementById('bookList');
  const shown = filterId === null ? books : books.filter(b => b.id === filterId);

  if (shown.length === 0) {
    list.innerHTML = '<tr><td colspan="5" class="empty">No books available.</td></tr>';
    return;
  }

  list.innerHTML = shown.map(b => `
    <tr>
      <td>${b.id}</td>
      <td>${escapeHtml(b.name)}</td>
      <td>${escapeHtml(b.author)}</td>
      <td>
        <span class="badge ${b.issued ? 'issued' : 'available'}">
          ${b.issued ? 'Issued' : 'Available'}
        </span>
      </td>
      <td>
        ${b.issued
          ? `<button class="secondary" onclick="returnBook(${b.id})">Return</button>`
          : `<button onclick="issueBook(${b.id})">Issue</button>`}
        <button class="danger" onclick="deleteBook(${b.id})">Delete</button>
      </td>
    </tr>
  `).join('');
}

// Prevents special characters in names from breaking the page
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

// Show the empty table when the page first loads
render();
