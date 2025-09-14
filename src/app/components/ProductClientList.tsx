// ProductClientList.tsx (client component)
'use client';
import { useState } from 'react';
import ProductClientUnit from './ProductClientUnit';
import { useCart } from './CartContext';
import { IProduct } from '../models/Product';
import { Button } from '@/components/ui/button';

interface ProductClientListProps {
  products: IProduct[];
}


export default function ProductClientList({ products }: ProductClientListProps) {
    const { addToCart, clearCart  } = useCart();
    function handleProductAction(ean: string) {
        console.log('Adding EAN : ' + ean)
        addToCart(ean)
    }

    function deleteLocalStorage(): void {
        clearCart()
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-center">
            <Button onClick={deleteLocalStorage}>Clear Cart</Button>
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


