import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import Product from '@/app/models/Product';

export async function GET(request: Request) {
  await dbConnect();
  try {
    const randomProducts = await Product.aggregate([{ $sample: { size: 5 } }]);
    return NextResponse.json({ products: randomProducts });
  }
  catch (ex) {

  }
}
