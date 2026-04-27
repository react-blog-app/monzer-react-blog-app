import { BrowserRouter, Routes, Route } from "react-router-dom";
import Posts from "./pages/Posts";
import PostDetails from "./pages/PostDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
