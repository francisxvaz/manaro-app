import ProductClientList from './components/ProductClientList';
import { PaginationDemo } from './components/Pagination-shad';
import { FilterSortProducts } from './components/FilterSortProducts';
import { ProductSearchBox } from './components/ProductSearchBox';
import { IProduct } from './models/Product';

interface PageProps {
  searchParams?: {
    page?: string;
    limit?: string;
    search?: string;
    sort_by?: string;
  };
}

interface GetProductsResult {
  products: IProduct[];
  total: number;
  totalPages: number;
}

async function getProducts(
  page = 1,
  limit = 52,
  search = '',
  sort_by = 'EAN_desc'
): Promise<GetProductsResult> {
  const API_URL_BASE = process.env.NEXT_PUBLIC_API_URL!;
  const res = await fetch(
    `${API_URL_BASE}/api/products?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}&sortby=${sort_by}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export const dynamic = 'force-dynamic';

export default async function ProductsPage({ searchParams }: PageProps) {
  const page = parseInt(searchParams?.page || '1', 10);
  const limit = parseInt(searchParams?.limit || '52', 10);
  const search = searchParams?.search || '';
  const sort_by = searchParams?.sort_by || 'EAN_desc';

  const { products, total, totalPages } = await getProducts(page, limit, search, sort_by);

  return (
    <main className="max-w-7xl mx-auto p-6 space-y-4">
      {/* Pass initial search value */}
      <ProductSearchBox initialValue={search} />
      <FilterSortProducts />
      <ProductClientList products={products} />
      <PaginationDemo totalPages={totalPages} currentPage={page} />
    </main>
  );
}
