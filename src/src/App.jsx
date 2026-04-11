import { Routes, Route, Link } from "react-router-dom";
import BlogPostsPage from "./pages/BlogPostsPage.jsx";
import SinglePostPage from "./pages/SinglePostPage.jsx";

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>React Blog - Lab 8</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/posts">Blog Posts</Link>
        </nav>
      </header>

      <main className="main">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h2>Welcome</h2>
                <p>Use the navigation to view blog posts.</p>
              </div>
            }
          />
          <Route path="/posts" element={<BlogPostsPage />} />
          <Route path="/posts/:postId" element={<SinglePostPage />} />
        </Routes>
      </main>
    </div>
  );
}
