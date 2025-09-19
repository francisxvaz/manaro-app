// app/products/page.tsx
import React from 'react';
import { IProduct } from './models/Product';
import ProductClientList from './components/ProductClientList';
import Pagination from './components/Pagination';
import ScrollToBottomButton from './components/ScrollToBottom';

interface PageProps {
  searchParams?: {
    page?: string;
    limit?: string;
    [key: string]: string | undefined;
  };
}

interface GetProductsResult {
  products: IProduct[];
  total: number;
  totalPages: number;
}

async function getProducts(page = 1, limit = 4): Promise<GetProductsResult> {
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
  const limit = parseInt(searchParams?.limit || '50', 10);

  const { products, total, totalPages } = await getProducts(page, limit);


  const sortedProducts = products.toSorted((a, b) => a['Webshop price'] - b['Webshop price']);
  return (
    <main className="max-w-7xl mx-auto p-6">
      <ProductClientList  products={sortedProducts}/>  
      <Pagination totalPages={totalPages} currentPage={page} />
    </main>
  );
}
