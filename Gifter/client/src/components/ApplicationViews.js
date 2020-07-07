import React from "react";
import { Switch, Route } from "react-router-dom";
import { NewPostForm } from "./PostForm";
import { SearchPosts } from "./SearchPosts";
import PostDetails from "./PostDetails";
import { UserPosts } from "./UserPosts";

const ApplicationViews = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <SearchPosts />
      </Route>

      <Route path="/posts/add">
        <NewPostForm />
      </Route>

      <Route path="/posts/:id">
        <PostDetails />
      </Route>

      <Route path="/users/:id">
        <UserPosts />
      </Route>
    </Switch>
  );
};

export default ApplicationViews;
