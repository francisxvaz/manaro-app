'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface ProductSearchBoxProps {
  initialValue: string;
}

export function ProductSearchBox({ initialValue }: ProductSearchBoxProps) {
  const [input, setInput] = useState(initialValue ?? '');
  const [debouncedInput, setDebouncedInput] = useState(initialValue ?? '');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const previousSearchRef = useRef<string | null>(searchParams.get('search'));

  // Debounce input updates
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedInput(input), 300);
    return () => clearTimeout(timeout);
  }, [input]);

  // Update URL on debounced input change if >= 3 chars or cleared
  useEffect(() => {
    if (debouncedInput.length >= 3 || debouncedInput.length === 0) {
      const params = new URLSearchParams(searchParams.toString());
      const previousSearch = previousSearchRef.current;

      if (debouncedInput.length > 0) {
        params.set('search', debouncedInput);
      } else {
        params.delete('search');
      }

      // Reset page to 1 only if search query changed
      if (previousSearch !== debouncedInput) {
        params.set('page', '1');
      }

      previousSearchRef.current = debouncedInput;

      router.replace(`${pathname}?${params.toString()}`, undefined);
    }
  }, [debouncedInput, router, pathname, searchParams]);

  return (
    <input
      type="text"
      placeholder="Search products by title (min 3 chars)..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      className="border rounded px-2 py-1 w-full mb-4"
      autoComplete="off"
    />
  );
}
