import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import Product from '@/app/models/Product';

export async function GET(request: Request) {
    await dbConnect();
    try {
        const categories = await Product.aggregate([
            {
                $project: {
                    top_level_category: {
                        $trim: {
                            input: {
                                $arrayElemAt: [
                                    { $split: ["$Category", ">"] },
                                    0
                                ]
                            }
                        }
                    }
                }
            },
            {
                $group: {
                    _id: "$top_level_category"
                }
            }
        ]);

        const categoryNames = categories.map(c => c._id);

        return NextResponse.json({
            success: true,
            message: "Categories fetched successfully",
            categories: {
                categoryNames
            }
            ,
            headers: {
                // Cache for 3600 seconds (1 hour) publicly on browsers and CDNs
                'Cache-Control': 'public, max-age=3600, stale-while-revalidate=60'
            }
        });
    }
    catch (error) {
        return NextResponse.json({
            success: false,
            message: "Failed to fetch categories",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }

}
