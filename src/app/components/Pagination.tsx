"use client";

import Link from "next/link";
import { toast } from "sonner";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
}

export default function ArrowOnlyPagination({ totalPages, currentPage }: PaginationProps) {
    const createPageLink = (page: number) => `/?page=${page}`;

    const handlePageClick = (page: number) => {
        const toastId = toast.loading(`Fetching data for page ${page}...`);
        setTimeout(() => {
            toast.dismiss(toastId);
        }, 2000);

    };

    return (
        <div className="flex justify-center space-x-4">
            <Link href={createPageLink(1)} onClick={() => handlePageClick(1)}>First</Link>
            <Link
                href={createPageLink(Math.max(1, currentPage - 1))}
                onClick={() => handlePageClick(currentPage - 1)}
            >
                Prev
            </Link>
            <Link
                href={createPageLink(Math.min(totalPages, currentPage + 1))}
                onClick={() => handlePageClick(currentPage + 1)}
            >
                Next
            </Link>
            <Link href={createPageLink(totalPages)} onClick={() => handlePageClick(totalPages)}>
                Last
            </Link>
        </div>
    );
}
