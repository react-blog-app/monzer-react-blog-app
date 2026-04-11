import { useState } from "react";

export default function CommentForm({ postId, setComments }) {
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !body.trim()) {
      setError("Both name and comment are required.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, body })
        }
      );

      if (!res.ok) throw new Error("Failed to post comment");

      const newComment = await res.json();

      setComments((prev) => [...prev, newComment]);
      setName("");
      setBody("");
    } catch (err) {
      console.error(err);
      setError("Error posting comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <h4>Add a Comment</h4>

      {error && <p className="error">{error}</p>}

      <label>
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
      </label>

      <label>
        Comment
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Your comment"
        />
      </label>

      <button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Comment"}
      </button>
    </form>
  );
}
