import Data from "../../view/apiData/apiData";
export default async function ServerComponent() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/", {
    cache: "no-store",
  });
  const posts = await response.json();

  return (
    <div>
      <h1>SSR with Hooks (App Router)</h1>
      <Data initialPosts={posts} />
    </div>
  );
}
