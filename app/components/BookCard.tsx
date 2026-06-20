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
  Reading: "var(--status-reading)",
  Finished: "var(--status-finished)",
  Wishlist: "var(--status-wishlist)",
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
          <span className="book-card-label">{lang === "zh" ? "书单" : "Books"}</span>
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
            data-source={lang === "zh" ? "去豆瓣读书看看" : "View on Goodreads"}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        ) : (
          <span className="book-card-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </span>
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
