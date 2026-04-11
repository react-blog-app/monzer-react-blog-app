import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CommentList from "../components/CommentList.jsx";
import CommentForm from "../components/CommentForm.jsx";

export default function SinglePostPage() {
  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch post
        const postRes = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        if (!postRes.ok) throw new Error("Failed to load post");
        const postData = await postRes.json();
        setPost(postData);
        setLoadingPost(false);

        // Fetch user
        const userRes = await fetch(
          `https://jsonplaceholder.typicode.com/users/${postData.userId}`
        );
        if (!userRes.ok) throw new Error("Failed to load user");
        const userData = await userRes.json();
        setUser(userData);

        // Fetch comments
        const commentsRes = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
        );
        if (!commentsRes.ok) throw new Error("Failed to load comments");
        const commentsData = await commentsRes.json();
        setComments(commentsData);
        setLoadingComments(false);
      } catch (err) {
        console.error(err);
        setError("Error loading post details. Please try again later.");
        setLoadingPost(false);
        setLoadingComments(false);
      }
    }

    fetchData();
  }, [postId]);

  if (loadingPost) return <p>Loading post...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <section className="single-post">
      <article className="post-detail">
        <h2>{post.title}</h2>
        <p>{post.body}</p>

        {user && (
          <div className="author-box">
            <h3>Author</h3>
            <p>
              <strong>{user.name}</strong> ({user.email})
            </p>
          </div>
        )}
      </article>

      <section className="comments-section">
        <h3>Comments</h3>
        {loadingComments ? (
          <p>Loading comments...</p>
        ) : (
          <CommentList comments={comments} />
        )}

        <CommentForm postId={postId} setComments={setComments} />
      </section>
    </section>
  );
}
