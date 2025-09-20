'use client'

import { IProduct } from "../models/Product";
import ProductSortDropdown from "./ProductSortDropdown"

interface GetProductsResult {
  products: IProduct[];
  total: number;
  totalPages: number;
}

async function getProducts(page = 1, limit = 4, sortby = "b2b price"): Promise<GetProductsResult> {
  const API_URL_BASE = process.env.NEXT_PUBLIC_API_URL!;
  const res = await fetch(`${API_URL_BASE}/api/products?sortby={sortby}page=${page}&limit=${limit}`, {
    next: { revalidate: 60000 },
  });
  const data = await res.json();
  return data; 
}

function handleSort(value: string)
{
    console.log(value);
}

export function FilterSortProducts()
{
    return(<ProductSortDropdown onSortChange={handleSort}/>)
}