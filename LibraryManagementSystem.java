import java.util.Scanner;

public class LibraryManagementSystem {

    static Scanner sc = new Scanner(System.in);

    static Book[] books = new Book[100];
    static int count = 0;

    // Add a new book
    static void addBook() {
        System.out.print("Enter Book ID: ");
        int id = Integer.parseInt(sc.nextLine());

        System.out.print("Enter Book Name: ");
        String name = sc.nextLine();

        System.out.print("Enter Author Name: ");
        String author = sc.nextLine();

        books[count] = new Book(id, name, author);
        count++;

        System.out.println("Book added successfully!");
    }

    // Display all books
    static void viewBooks() {
        if (count == 0) {
            System.out.println("No books available.");
        } else {
            for (int i = 0; i < count; i++) {
                books[i].display();
            }
        }
    }

    // Search for a book
    static void searchBook() {
        System.out.print("Enter Book ID: ");
        int id = Integer.parseInt(sc.nextLine());

        for (int i = 0; i < count; i++) {
            if (books[i].id == id) {
                books[i].display();
                return;
            }
        }

        System.out.println("Book not found.");
    }

    // Issue a book
    static void issueBook() {
        System.out.print("Enter Book ID: ");
        int id = Integer.parseInt(sc.nextLine());

        for (int i = 0; i < count; i++) {
            if (books[i].id == id) {
                if (!books[i].issued) {
                    books[i].issued = true;
                    System.out.println("Book issued successfully!");
                } else {
                    System.out.println("Book is already issued.");
                }
                return;
            }
        }

        System.out.println("Book not found.");
    }

    // Return a book
    static void returnBook() {
        System.out.print("Enter Book ID: ");
        int id = Integer.parseInt(sc.nextLine());

        for (int i = 0; i < count; i++) {
            if (books[i].id == id) {
                if (books[i].issued) {
                    books[i].issued = false;
                    System.out.println("Book returned successfully!");
                } else {
                    System.out.println("Book was not issued.");
                }
                return;
            }
        }

        System.out.println("Book not found.");
    }

    // Delete a book (an issued book must be returned first)
    static void deleteBook() {
        System.out.print("Enter Book ID: ");
        int id = Integer.parseInt(sc.nextLine());

        for (int i = 0; i < count; i++) {
            if (books[i].id == id) {
                if (books[i].issued) {
                    System.out.println("Return the book before deleting it.");
                    return;
                }

                // Shift the remaining books one position to the left
                for (int j = i; j < count - 1; j++) {
                    books[j] = books[j + 1];
                }
                books[count - 1] = null;
                count--;

                System.out.println("Book deleted successfully!");
                return;
            }
        }

        System.out.println("Book not found.");
    }

    // Main method
    public static void main(String[] args) {

        int choice;

        do {
            System.out.println("\n===== LIBRARY MANAGEMENT SYSTEM =====");
            System.out.println("1. Add Book");
            System.out.println("2. View Books");
            System.out.println("3. Search Book");
            System.out.println("4. Issue Book");
            System.out.println("5. Return Book");
            System.out.println("6. Delete Book");
            System.out.println("7. Exit");

            System.out.print("Enter your choice: ");
            choice = Integer.parseInt(sc.nextLine());

            switch (choice) {
                case 1:
                    addBook();
                    break;

                case 2:
                    viewBooks();
                    break;

                case 3:
                    searchBook();
                    break;

                case 4:
                    issueBook();
                    break;

                case 5:
                    returnBook();
                    break;

                case 6:
                    deleteBook();
                    break;

                case 7:
                    System.out.println("Thank you!");
                    break;

                default:
                    System.out.println("Invalid choice.");
            }

        } while (choice != 7);
    }
}

// Book class
class Book {

    int id;
    String name;
    String author;
    boolean issued = false;

    // Constructor
    Book(int id, String name, String author) {
        this.id = id;
        this.name = name;
        this.author = author;
    }

    // Display book details
    void display() {
        System.out.println("\nBook ID: " + id);
        System.out.println("Book Name: " + name);
        System.out.println("Author: " + author);
        System.out.println("Status: " +
            (issued ? "Issued" : "Available"));
    }
}
