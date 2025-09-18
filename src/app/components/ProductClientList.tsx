// ProductClientList.tsx (client component)
'use client';
import ProductClientUnit from './ProductClientUnit';
import { useCart } from './CartContext';
import { IProduct } from '../models/Product';
import { Button } from '@/components/ui/button';
import ExportButton from './ExportCsvButton';

interface ProductClientListProps {
    products: IProduct[];
}


export default function ProductClientList({ products }: ProductClientListProps) {
    const { addToCart, clearCart, cartItems, removeFromCart } = useCart();
    const eanArray = cartItems.map(item => item.ean);
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

    async function exportCSV(eanArray: string[]) {
        const response = await fetch("/api/exportProducts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ eanArray }),
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "products.csv");
            document.body.appendChild(link);
            link.click();
            link.remove();
            //JSON.stringify('RESPONSE' + response)
        } else {
            console.error("CSV export failed");
        }
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

            <Button onClick={() => exportCSV(eanArray)}>
                Export CSV
            </Button>
        </div>
    );
}


