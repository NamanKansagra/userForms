"use client";

import { useState, useEffect } from "react";

export default function ClientComponent({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts);

  useEffect(() => {
    console.log("Client-side posts:", posts);
  }, [posts]);

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <strong>{post.title}</strong>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}
