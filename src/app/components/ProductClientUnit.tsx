import { IProduct } from "../models/Product";

interface ProductClientUnitProps {
  product: IProduct;
  onAction: () => void;
}
export default function ProductClientUnit({product, onAction}: ProductClientUnitProps) {

return <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
            <img
              src={product['Image 1']}
              alt={product.Title}
              className="w-full h-64 object-contain p-4"
              loading="lazy"
            />
            <div className="p-4 w-full">
              <h2 className="text-xl font-semibold mb-2">{product.Title}</h2>
              <p className="text-sm text-gray-600 mb-2 line-clamp-3">{product.Description}</p>
              <div className="flex justify-between text-gray-700 font-medium">
                <span>Stock: {product.Stock}</span>
                <a
                  key={product._id as string}
                  href={product.Link}
                  target="_blank"
                  rel="noopener noreferrer"><span className="text-indigo-600">${product['Webshop price'].toFixed(2)}</span></a>
                  <button onClick={onAction}>select</button>

              </div>
            </div>
          </div>
}