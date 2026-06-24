import { BookCard, type Book } from "./BookCard";

type BookListProps = {
  books: Book[];
};

export function BookList({ books }: BookListProps) {
  return (
    <div className="books-grid">
      {books.map((book) => (
        <BookCard key={book.title} book={book} href={book.link} />
      ))}
    </div>
  );
}
