export default function PostBody({ html }: { html: string }) {
  return (
    <div
      className="post__body"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
