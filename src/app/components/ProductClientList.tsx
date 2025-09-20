// ProductClientList.tsx (client component)
'use client';
import ProductClientUnit from './ProductClientUnit';
import { useCart } from './CartContext';
import { IProduct } from '../models/Product';
import { Recycle, Download } from "lucide-react";
import { toast } from "sonner";
import ScrollToBottomButton from './ScrollToBottom';
import ProductSortDropdown from './ProductSortDropdown';

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
        toast.error('Your are about to clear the storage', {
            action: {
                label: 'Clear',
                onClick: () => clearCart()
            },
        })

    }

    function onSortChange(value:string)
    {
        console.log(value)
    }

    async function exportCSV(eanArray: string[]) {
        if (eanArray.length <= 0) {
            toast.error("No Products!", {
                description: `No items to export.`,
            });
            return;
        }

        toast.success(`You sure you want to export ${cartItems.length} to csv?`, {
            action: {
                label: 'Export',
                onClick: async () => {
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
                        toast.success("Export completed successfully!", {
                            description: `${eanArray.length} items exported.`,
                        });
                        clearCart();
                    } else {
                        console.error("CSV export failed");
                    }
                }
            },
        })


    }

    return (
        <>
        
            <div>
                <div className="flex justify-end items-center gap-2 py-2 pr-4">
                    <Recycle className='cursor-pointer text-red-600' onClick={deleteLocalStorage} />
                    <Download
                        className="w-5 h-5 text-green-500 cursor-pointer transition-colors hover:text-green-700"
                        onClick={() => exportCSV(eanArray)}
                    />
                    <span className="font-semibold text-gray-800">({eanArray.length})</span>
                </div>
                <ScrollToBottomButton />

            </div>
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

            </div>
            
        </>
    );
}


