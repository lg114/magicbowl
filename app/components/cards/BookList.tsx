import { BookCard } from "./BookCard";
import type { Book } from "../../types/book";

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
