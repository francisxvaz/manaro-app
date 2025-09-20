'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

interface ProductSearchBoxProps {
  initialValue: string;
}

export function ProductSearchBox({ initialValue }: ProductSearchBoxProps) {
  const [input, setInput] = useState(initialValue ?? '');
  const [debouncedInput, setDebouncedInput] = useState(initialValue ?? '');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Debounce input updates
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedInput(input), 300);
    return () => clearTimeout(timeout);
  }, [input]);

  // Update URL on debounced input change if >= 5 chars or cleared
  useEffect(() => {
    if (debouncedInput.length >= 3 || debouncedInput.length === 0) {
      const params = new URLSearchParams(searchParams);
      if (debouncedInput.length > 0) {
        params.set('search', debouncedInput);
      } else {
        params.delete('search');
      }
      const toastId = toast.loading(`loading products`)
      params.set('page', '1'); // Reset page on new search
      router.replace(`${pathname}?${params.toString()}`);

      setTimeout(() => {
        toast.dismiss(toastId);
        //toast.success(`Loaded products for search: ${debouncedInput}`);
      }, 1500); // Adjust time as needed
    }
  }, [debouncedInput, router, pathname, searchParams]);

  return (
    <input
      type="text"
      placeholder="Search products by title (min 5 chars)..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      className="border rounded px-2 py-1 w-full mb-4"
      autoComplete="off"
    />
  );
}
