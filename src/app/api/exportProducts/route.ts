import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import Product, { IProduct } from '@/app/models/Product';


export async function POST(request: Request) {
    try {
        const data = await request.json();
        console.log('Parsed data:', data);
        const { eanArray } = data;

        if (!Array.isArray(eanArray) || eanArray.length === 0) {
            return NextResponse.json({ error: "eanArray must be a non-empty array" }, { status: 400 });
        }

        await dbConnect();
        const products = await Product.find({ EAN: { $in: eanArray } }, { _id: 0 }).lean();
        const csv = convertToCSV(products);

        return new Response(csv, {
            status: 200,
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": 'attachment; filename="products.csv"',
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


function convertToCSV(products: IProduct[]) {
    if (products.length === 0) return "";
    const headers = Array.from(
        products.reduce((acc, product) => {
            Object.keys(product).forEach(key => acc.add(key));
            return acc;
        }, new Set())
    );
    const rows = products.map(product =>
        headers.map(header => JSON.stringify(product[header as keyof IProduct] ?? ""))
    );
    return [headers.join(","), ...rows.map(row => row.join(","))].join("\n");
}

