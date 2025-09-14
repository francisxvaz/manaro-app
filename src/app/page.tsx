// app/products/page.tsx
import React from 'react';
import { IProduct } from './models/Product';
import ProductClientList from './components/ProductClientList';

interface PageProps {
  searchParams?: {
    page?: string;
    limit?: string;
    [key: string]: string | undefined;
  };
}

async function getProducts(page = 1, limit = 4): Promise<IProduct[]> {
  const API_URL_BASE = process.env.NEXT_PUBLIC_API_URL!;
  const res = await fetch(`${API_URL_BASE}/api/products?page=${page}&limit=${limit}`, {
    // Optional: for ISR revalidation (cache 60 seconds)
    next: { revalidate: 60000 },
  });
  const data = await res.json();
  return data; 
}

export const dynamic = 'force-dynamic';

export default async function ProductsPage({ searchParams }: PageProps) {
  const page = parseInt(searchParams?.page || '1', 10);
  const limit = parseInt(searchParams?.limit || '10', 10);

  const { products, total, totalPages } = await getProducts(page, limit);


  const sortedProducts = products.toSorted((a, b) => a['Webshop price'] - b['Webshop price']);
  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Manaro.com.au</h1>
      <ProductClientList  products={sortedProducts}/>  
    </main>
  );
}
