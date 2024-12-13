"use client";

import { usePosts } from "@/hooks/usePosts";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface ExampleClientProps {
  initialPosts: Post[];
}

export default function Client({ initialPosts }: ExampleClientProps) {
  const { posts, setPosts } = usePosts(initialPosts);

  return (
    <div>
      <h2>Client</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
