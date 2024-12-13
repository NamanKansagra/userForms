import Client from "./Client";

async function fetchPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
}

export default async function clientFunc() {
  const posts = await fetchPosts();

  return (
    <div>
      <h1>Server Component with Custom Hook in Client Component</h1>
      <Client initialPosts={posts} />
    </div>
  );
}
