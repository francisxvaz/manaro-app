
import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import Product from '@/app/models/Product';

export async function GET(request: Request) {
  await dbConnect();

  try {
    // Get query parameters page and limit from the request URL
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    // Fetch the paginated products from MongoDB
    const products = await Product.find({})
      .skip(skip)
      .limit(limit);

    // Get the total count of products
    const total = await Product.countDocuments();

    // Return paginated results with metadata
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

