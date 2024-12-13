"use client";

import { useState, useEffect } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

export function usePosts(initialPosts: Post[]) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  useEffect(() => {
    console.log("Posts have been set:", posts);
  }, [posts]);

  return { posts, setPosts };
}
