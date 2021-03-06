import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { PostComment } from "./PostComment";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  return (
    <Card className="m-4">
      <p className="text-left px-2">Posted by: </p>
      <Link to={`/users/${post.userProfileId}`}>{post.userProfile.name}</Link>
      <CardImg top src={post.imageUrl} alt={post.title} />
      <CardBody>
        <Link to={`/posts/${post.id}`}>
          <strong>{post.title}</strong>
        </Link>

        <p>{post.caption}</p>
        <PostComment key={post.id} post={post} />
      </CardBody>
    </Card>
  );
};

export default Post;
