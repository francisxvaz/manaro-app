// ProductClientList.tsx (client component)
'use client';
import ProductClientUnit from './ProductClientUnit';
import { useCart } from './CartContext';
import { IProduct } from '../models/Product';
import { Button } from '@/components/ui/button';

interface ProductClientListProps {
  products: IProduct[];
}


export default function ProductClientList({ products }: ProductClientListProps) {
    const { addToCart, clearCart, cartItems, removeFromCart  } = useCart();
    function AddProductToSelect(ean: string) {
        console.log('Adding EAN : ' + ean)
        addToCart(ean)
    }

    function RemoveProductFromSelect(ean: string) {
        console.log('Adding EAN : ' + ean)
        removeFromCart(ean)
    }

    function deleteLocalStorage(): void {
        clearCart()
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-center">
            
            {products.map(product => (
                <ProductClientUnit
                    product={product}
                    key={product.SKU}
                    onSelectAction={() => AddProductToSelect(product.EAN)}
                    inCart={cartItems.some(item => item.ean === product.EAN)}
                    onRemoveAction={() => RemoveProductFromSelect(product.EAN)}
                />

            ))}
            <Button onClick={deleteLocalStorage}>Clear Cart</Button>
        </div>
    );
}


