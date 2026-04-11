export default function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return <p>No comments yet. Be the first to comment!</p>;
  }

  return (
    <div className="comments-list">
      {comments.map((c) => (
        <div key={c.id ?? `${c.name}-${c.body}`} className="comment">
          <h4>{c.name}</h4>
          <p>{c.body}</p>
        </div>
      ))}
    </div>
  );
}
