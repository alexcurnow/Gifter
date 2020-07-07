import React, { useEffect, useContext, useState } from "react";
import { PostContext } from "../providers/PostProvider";
import { useParams } from "react-router-dom";
import Post from "./Post";

export const UserPosts = () => {
  const [posts, setPosts] = useState();
  const { getPostsByUser } = useContext(PostContext);
  const { id } = useParams();

  useEffect(() => {
    getPostsByUser(id).then(setPosts);
  }, []);

  if (!posts) {
    return null;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};
