import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import Product from '@/app/models/Product';

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);

    // Pagination params
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    // Sorting params (e.g. 'title_asc', 'b2bprice_desc'), defaults to SKU ascending
    const sortParam = searchParams.get('sortby') || 'sku_asc';
    const [sortField, sortDirection] = sortParam.split('_');
    const sortOrder = sortDirection === 'desc' ? -1 : 1;

    // Search param - full text search on title (case insensitive)
    const searchTerm = searchParams.get('search') || '';
    const searchFilter = searchTerm
      ? { Title: { $regex: searchTerm, $options: 'i' } }
      : {};

    // Fetch total count with search filter
    const total = await Product.countDocuments(searchFilter);

    // Fetch paginated, sorted, searched products
    const products = await Product.find(searchFilter)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
