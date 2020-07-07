import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../providers/PostProvider";
import Post from "./Post";
import debounce from "lodash.debounce";
import "../styles/SearchPosts.css";

export const SearchPosts = (props) => {
  const { posts, searchPosts, getAllPosts } = useContext(PostContext);
  const [terms, setTerms] = useState(null);

  const debouncedSearchPosts = debounce(searchPosts, 500);

  const handleChange = (e) => {
    debouncedSearchPosts(e.target.value);
  };

  useEffect(() => {
    if (!terms) {
      getAllPosts();
    } else {
      searchPosts(terms);
    }
  }, [terms]);

  return (
    <>
      <fieldset className="searchbar">
        <div className="form-group">
          <label htmlFor="searchTerms">Search:</label>
          <input
            onChange={handleChange}
            type="text"
            id="searchTerms"
            required
            autoFocus
            className="form-control"
          />
        </div>
      </fieldset>

      <div className="container">
        <div className="row justify-content-center">
          <div className="cards-column">
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
