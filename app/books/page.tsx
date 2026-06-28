import { BookList } from "../components/cards/BookList";
import { DocumentTitle } from "../components/blog/DocumentTitle";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { PageTitle } from "../components/ui/PageTitle";
import { books } from "../lib/books";

export async function generateMetadata() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value === "zh" ? "zh" : "en";
  const title = lang === "zh" ? "书单" : "Books";
  const description = lang === "zh" ? "Gc 的阅读清单和读书笔记。" : "Gc's reading list and book notes.";
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default function BooksPage() {
  return (
    <main className="page-shell">
      <div className="canvas">
        <DocumentTitle title="Books" titleCn="书单" />
        <Header />

        <PageTitle
          title="Books"
          titleCn="书单"
          sub="What I've been reading, and what's next."
          subCn="我读过的，和接下来要读的。"
        />

        <BookList books={books} />

        <Footer />
      </div>
    </main>
  );
}
