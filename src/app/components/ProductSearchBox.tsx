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

  // Keep track of previous search to avoid unnecessary routing
  const previousSearchRef = useRef<string | null>(searchParams.get('search'));

  // Sync input and debouncedInput whenever URL searchParam changes externally
  useEffect(() => {
    const currentSearch = searchParams.get('search') ?? '';
    // Only update if URL search changes and differs from current input state
    if (currentSearch !== input) {
      setInput(currentSearch);
      setDebouncedInput(currentSearch);
      previousSearchRef.current = currentSearch;
    }
  }, [searchParams]);

  // Debounce input changes before triggering URL update
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedInput(input), 300);
    return () => clearTimeout(timeout);
  }, [input]);

  // Update URL query when debouncedInput changes
  useEffect(() => {
    if (debouncedInput.length >= 3 || debouncedInput.length === 0) {
      const params = new URLSearchParams(searchParams.toString());

      if (debouncedInput.length > 0) {
        params.set('search', debouncedInput);
      } else {
        params.delete('search');
      }

      // Reset page=1 when search changes
      if (previousSearchRef.current !== debouncedInput) {
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
