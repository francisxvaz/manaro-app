"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // Adjust import path as needed
import { Button } from "@/components/ui/button";


interface ProductSortDropdownProps
{
    onSortChange: (value:string) => void
}

const ProductSortDropdown = ({ onSortChange }: ProductSortDropdownProps) => {
  const [selected, setSelected] = useState("Title");

  const handleSelect = (value: string) => {
    setSelected(value);
    onSortChange(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Sort by: {selected}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onSelect={() => handleSelect("Title")}>
          Title
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleSelect("B2B price")}>
          B2B Price
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductSortDropdown;
