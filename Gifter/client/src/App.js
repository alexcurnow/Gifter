import React from "react";
import "./App.css";
import { PostProvider } from "./providers/PostProvider";
import { NewPostForm } from "./components/PostForm";
import { SearchPosts } from "./components/SearchPosts";

function App() {
  return (
    <div className="App">
      <PostProvider>
        <NewPostForm />
        <SearchPosts />
      </PostProvider>
    </div>
  );
}

export default App;