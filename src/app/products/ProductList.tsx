"use client";

import { useState } from "react";
import slugify from "slugify"; // Add slugify for generating slugs

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

interface ProductListProps {
  initialProducts: Product[];
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState(initialProducts);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = () => {
    const sortedProducts = [...products].sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
    setProducts(sortedProducts);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div>
      <button onClick={handleSort}>
        Sort by Price ({sortOrder === "asc" ? "Ascending" : "Descending"})
      </button>
      <ul className="flex flex-wrap justify-center gap-4">
        {products.map((product) => {
          // Generate slug from product title
          const slug = slugify(product.title, { lower: true });

          return (
            <li
              key={product.id}
              className="border-4 border-white-400 w-[500px]"
            >
              <img
                src={product.image}
                alt={product.title}
                width="100"
                className="m-auto"
              />
              <h3 className="border-4 border-transparent w-[300px] m-auto">
                <a href={`/products/${slug}`}>{product.title}</a>{" "}
                {/* Link to dynamic slug */}
              </h3>
              <p className="border-4 border-transparent w-[500px] m-auto p-1">
                {product.description}
              </p>
              <p className="text-center align-text-bottom">{product.price}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
