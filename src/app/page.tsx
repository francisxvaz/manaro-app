// app/page.tsx (or pages/index.tsx if using Pages Router)
import Image from "next/image";
import dbConnect from '@/app/lib/dbConnect';
import Product from '@/app/models/Product';
import { IProduct } from './models/Product';

async function getTopProducts(): Promise<{ products: IProduct[] }> {
  await dbConnect();
  try {
    const randomProducts = await Product.aggregate([{ $sample: { size: 3 } }]);
    return { products: randomProducts };
  } catch (ex) {
    console.error("Error fetching products", ex);
    return { products: [] };
  }
}
export const dynamic = "force-dynamic";

export default async function Home() {
  const { products } = await getTopProducts();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <section
        id="home"
        className="flex flex-col-reverse md:flex-row items-center max-w-7xl mx-auto p-8 md:py-20 gap-8"
      >
        <div className="flex-1">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Welcome to Our Store
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Discover the best products perfectly crafted for you.
          </p>
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-indigo-700 transition">
            Shop Now
          </button>
        </div>
        <div className="flex-1">
          <Image
            src="https://vdxl.im/8721012057043_m_en_hd_1.jpg"
            alt="Hero Image"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="max-w-7xl mx-auto p-8 md:py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          Our Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {products.map((product) => (
            <div
              key={product.SKU.toString()}
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition"
            >
              <Image
                src={product["Image 1"]}
                alt={product.Title}
                width={300}
                height={200}
                className="mx-auto rounded-md"
              />
              <h3 className="mt-6 text-xl font-semibold text-gray-800">
                {product.Title}
              </h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-6">
                {product.Description}
              </p>
              <button className="mt-4 bg-indigo-500 text-white px-6 py-2 rounded-md hover:bg-indigo-600 transition">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
