// async function getData() {
//   const response = await fetch("https://jsonplaceholder.typicode.com/posts/");
//   if (!response.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   return response.json();
// }

// export default async function UserPage() {
//   const posts = await getData();

//   return (
//     <div>
//       <h1>SSR</h1>
//       {posts && posts.length > 0 ? (
//         <ul>
//           {posts
//             .slice(0, 7)
//             .map((post: { id: React.Key; title: string; body: string }) => (
//               <li key={post.id}>
//                 <strong>{post.title}</strong>
//                 <p>{post.body}</p>
//               </li>
//             ))}
//         </ul>
//       ) : (
//         <p>No posts available</p>
//       )}
//     </div>
//   );
// }

//"use client";

// import { useState } from "react";

// export default function Counter() {
//   const [count, setCount] = useState<number>(0);

//   return (
//     <button
//       className="border-2 border-violet-400 px-4"
//       onClick={() => setCount(count + 1)}
//     >
//       Count: {count}
//     </button>
//   );
// }

// export default async function HomePage() {
//   const data = await fetch("https://jsonplaceholder.typicode.com/posts/");
//   const res = await data.json();

//   return res
//     .slice(0, 7)
//     .map((post: { id: number; title: string; body: string }) => (
//       <div key={post.id}>
//         <h1>{post.title}</h1>
//         <p>{post.body}</p>
//       </div>
//     ));
// }
// export const revalidate = 10;

// export default async function Page() {
//   const data = await fetch("https://jsonplaceholder.typicode.com/posts/");
//   const res = await data.json();

//   return (
//     <div>
//       {res
//         .slice(0, 7)
//         .map((post: { id: number; title: string; body: string }) => (
//           <>
//             <h1>
//               <li className="list-decimal" key={post.id}>
//                 {post.title}
//               </li>
//             </h1>
//             <li>{post.body}</li>
//           </>
//         ))}
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";

export default function ClientFetch() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
