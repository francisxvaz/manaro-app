// ProductClientList.tsx (client component)
'use client';
import { useState } from 'react';
import ProductClientUnit from './ProductClientUnit';
import { useCart } from './CartContext';
import { IProduct } from '../models/Product';

interface ProductClientListProps {
  products: IProduct[];
}


export default function ProductClientList({ products }: ProductClientListProps) {
    const [selectedProductEan, setSelectedProductEan] = useState("");
    const { addToCart  } = useCart();
    function handleProductAction(ean: string) {
        setSelectedProductEan(ean);
        console.log(selectedProductEan)
        addToCart(selectedProductEan)
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-center">
            {products.map(product => (
                <ProductClientUnit
                    product={product}
                    key={product.SKU}
                    onAction={() => handleProductAction(product.EAN)}
                />

            ))}
            
        </div>
    );
}


