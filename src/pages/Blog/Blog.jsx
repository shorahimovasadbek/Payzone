import React from "react";
import { useSelector } from "react-redux";

const Blog = () => {
  const { fakeData } = useSelector((store) => store.fake);
  return (
    <div>
      <h1>Blog</h1>
      <h2>{fakeData}</h2>
    </div>
  );
};

export default Blog;
