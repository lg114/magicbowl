import { useLang } from "./LanguageContext";

export type BookStatus = "Reading" | "Finished" | "Wishlist";

export type Book = {
  title: string;
  titleCn?: string;
  author: string;
  authorCn?: string;
  status: BookStatus;
  image?: string;
  note?: string;
  noteCn?: string;
  link?: string;
  linkCn?: string;
};

type BookCardProps = {
  book: Book;
};

const statusColors: Record<BookStatus, string> = {
  Reading: "#8fbc8f",
  Finished: "#87bcde",
  Wishlist: "#d4a76a",
};

export function BookCard({ book }: BookCardProps) {
  const { lang } = useLang();
  const href = lang === "zh" ? book.linkCn : book.link;
  const title = lang === "zh" && book.titleCn ? book.titleCn : book.title;
  const author = lang === "zh" && book.authorCn ? book.authorCn : book.author;
  const note = lang === "zh" && book.noteCn ? book.noteCn : book.note;

  return (
    <article className="book-card">
      <div className="book-card-header">
        <div className="book-card-meta">
          <span className="book-card-label">Books</span>
          <span className="book-card-dot">·</span>
          <span
            className="book-card-status"
            style={{ color: statusColors[book.status] }}
          >
            {book.status}
          </span>
        </div>
        {href ? (
          <a
            className="book-card-arrow"
            href={href}
            target="_blank"
            rel="noreferrer"
          >
            ↗
          </a>
        ) : (
          <span className="book-card-arrow">↗</span>
        )}
      </div>

      {book.image && (
        <div className="book-card-cover">
          <img src={book.image} alt={`${title} cover`} />
        </div>
      )}

      <div className="book-card-info">
        <h3 className="book-card-title">{title}</h3>
        <p className="book-card-author">{author}</p>
        {note && <p className="book-card-note">{note}</p>}
      </div>
    </article>
  );
}
