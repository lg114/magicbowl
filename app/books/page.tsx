import { type Book } from "../components/BookCard";
import { BookList } from "../components/BookList";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PageTitle } from "../components/PageTitle";

const books: Book[] = [
  {
    title: "Siddhartha",
    titleCn: "悉达多",
    author: "Hermann Hesse",
    authorCn: "赫尔曼·黑塞",
    status: "Finished",
    image: "/covers/s29396368.jpg",
    note: "A spiritual journey of self-discovery through the life of a young man in ancient India.",
    noteCn: "一个年轻人在古印度的自我发现与精神之旅。",
    link: "https://www.goodreads.com/book/show/52036.Siddhartha",
    linkCn: "https://book.douban.com/subject/26980487/",
  },
  {
    title: "Life and Death Are Wearing Me Out",
    titleCn: "生死疲劳",
    author: "Mo Yan",
    authorCn: "莫言",
    status: "Finished",
    image: "/covers/s35289336.jpg",
    note: "A landowner's six reincarnations witness half a century of rural China through the eyes of animals.",
    noteCn: "一个地主经历六道轮回，以动物视角见证中国农村半个世纪的变迁。",
    link: "https://www.goodreads.com/book/show/19172190",
    linkCn: "https://book.douban.com/subject/35587028/",
  },
];

export const metadata = {
  title: "Books — magicbowl",
  description: "Gc's reading list and book notes.",
};

export default function BooksPage() {
  return (
    <main className="page-shell">
      <div className="canvas">
        <Header activeItem="Books" />

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
