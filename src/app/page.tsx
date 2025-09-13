// app/products/page.tsx
import React from 'react';

interface Product {
  _id: string;
  Link: string;
  SKU: number;
  Title: string;
  Category: string;
  'Image 1': string;
  Description: string;
  Color: string;
  Weight: number;
  Stock: number;
  'Webshop price': number;
}

async function getProducts(): Promise<Product[]> {
  const API_URL_BASE = process.env.NEXT_PUBLIC_API_URL!;

  // Fetch first 10 products from your API
  const res = await fetch(`${API_URL_BASE}/api/products`, {
    // Optional: for ISR revalidation (cache 60 seconds)
    next: { revalidate: 60000 },
  });
  const data = await res.json();
  return data; // Take first 10 products
}

export default async function ProductsPage() {
  const products = await getProducts();
  const sortedProducts = products.toSorted((a, b) => a['Webshop price'] - b['Webshop price']);

  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-center">

        {sortedProducts.map((product) => (
          <a
            key={product._id}
            href={product.Link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
          >
            <img
              src={product['Image 1']}
              alt={product.Title}
              className="w-full h-64 object-contain p-4"
              loading="lazy"
            />
            <div className="p-4 w-full">
              <h2 className="text-xl font-semibold mb-2">{product.Title}</h2>
              <p className="text-sm text-gray-600 mb-2 line-clamp-3">{product.Description}</p>
              <div className="flex justify-between text-gray-700 font-medium">
                <span>Stock: {product.Stock}</span>
                <span className="text-indigo-600">${product['Webshop price'].toFixed(2)}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
