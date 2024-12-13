"use client";

import { useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

interface ProductTableProps {
  initialProducts: Product[];
}

export default function ProductTable({ initialProducts }: ProductTableProps) {
  const [products, setProducts] = useState(initialProducts);
  const [apiKey, setApiKey] = useState<string>(""); // Input for dynamic key

  const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(event.target.value);
  };

  return (
    <div>
      <label>
        Enter API Key to Display Values:
        <input
          type="text"
          value={apiKey}
          onChange={handleKeyChange}
          placeholder="e.g., price, category"
        />
      </label>
      <table style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
