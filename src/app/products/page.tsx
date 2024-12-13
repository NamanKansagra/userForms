import ProductList from "./ProductList";
// import ProductTable from "./ProductTable";

async function fetchProducts() {
  const response = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <div>
      <h1>Product Table</h1>
      <ProductList initialProducts={products} />
    </div>
  );
}
