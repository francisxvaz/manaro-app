'use client'

import { useSearchParams } from 'next/navigation';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { toast } from "sonner";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
}

export function PaginationDemo({ totalPages, currentPage }: PaginationProps) {


    const createPageLink = (page: number) => {
        const searchParams = useSearchParams();
        const params = new URLSearchParams(searchParams.toString());

        // Update the page parameter
        params.set('page', String(page));

        // Return the full path with updated and existing query params
        return `/products?${params.toString()}`;
    };

    const handlePageClick = (page: number) => {
        toast.loading(`Fetching data for page ${page}...`);

    };

    return (
        <Pagination className="mt-10">
            <PaginationContent>
                <PaginationLink
                    href={createPageLink(1)}
                    onClick={() => handlePageClick(1)}
                    aria-label="First Page"
                    aria-disabled={currentPage === 1}
                    tabIndex={currentPage === 1 ? -1 : undefined}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
                >
                    « First
                </PaginationLink>

                <PaginationItem>
                    <PaginationPrevious
                        href={createPageLink(Math.max(1, currentPage - 1))}
                        onClick={() => handlePageClick(currentPage - 1)}
                        aria-disabled={currentPage === 1}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
                    />
                </PaginationItem>

                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href={createPageLink(Math.max(1, currentPage + 1))}
                        onClick={() => handlePageClick(currentPage + 1)}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
                    />
                </PaginationItem>
                <PaginationLink
                    href={createPageLink(totalPages)}
                    onClick={() => handlePageClick(totalPages)}
                    aria-label="Last Page"
                    aria-disabled={currentPage === totalPages}
                    tabIndex={currentPage === totalPages ? -1 : undefined}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
                >
                    Last »
                </PaginationLink>

            </PaginationContent>
        </Pagination>
    )
}
