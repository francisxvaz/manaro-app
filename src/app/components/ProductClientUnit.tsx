import { Button } from "@/components/ui/button";
import { IProduct } from "../models/Product";

interface ProductClientUnitProps {
  product: IProduct;
  onSelectAction: () => void;
  onRemoveAction: () => void;
  inCart: boolean;
}

export default function ProductClientUnit({product, onSelectAction, inCart, onRemoveAction}: ProductClientUnitProps) {

  return (
    <div className={`shadow-md rounded-lg overflow-hidden transition-shadow duration-300 flex flex-col items-center
      ${inCart ? 'bg-green-100 hover:shadow-md' : 'bg-white hover:shadow-xl'}`}>
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
            rel="noopener noreferrer"
          >
            <span className="text-indigo-600">${product['Webshop price'].toFixed(2)}</span>
          </a>
          {!inCart && (
            <Button className="cursor-pointer" onClick={onSelectAction}>Add</Button>
          )}
          {inCart && (
            <Button className="cursor-pointer" onClick={onRemoveAction}>Remove</Button>
          )}
        </div>
      </div>
    </div>
  );
}
