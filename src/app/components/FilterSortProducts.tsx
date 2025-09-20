'use client'

import { IProduct } from "../models/Product";
import ProductSortDropdown from "./ProductSortDropdown"


function handleSort(value: string)
{
    console.log(value);
}

export function FilterSortProducts()
{
    return(<ProductSortDropdown onSortChange={handleSort}/>)
}