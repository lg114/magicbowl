export type BookStatus = "Reading" | "Finished" | "Wishlist";

export type Book = {
  title: string;
  titleCn?: string;
  slug?: string;
  author: string;
  authorCn?: string;
  status: BookStatus;
  image?: string;
  note?: string;
  noteCn?: string;
  link?: string;
  linkCn?: string;
};
